import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../sections/Header'; 
import LayerInfo from '../../sections/LayerInfo';
import PathLegend from '../../components/modals/PathLegend';
import LayerModal from '../../components/modals/LayerModal';
import useOneFilter from '../../hooks/useOneFilter'; 
import useLayerPosts from '../../hooks/layers/useLayerPosts';
import useTagLegend from '../../hooks/paths/useTagLegend';
import useModal from '../../hooks/useModal';
import { LoadingPage } from '../../components/Loading';
import AddButton from '../../atoms/page/AddButton';
import Sidebar from './Sidebar';
import PageBody from './PageBody';

export default function Layer() { 
    let params = useParams();
    const { handleOneFilter, activeItem } = useOneFilter('date');
    const [activeView, setZoom] = useState('100%');

    const {tagpath, 
        coords, 
        handleHover,
        handleStopHover,
        tagRef, 
        tagDetails, 
        postExcerpts, 
        loadModal } = useTagLegend();

    const { getRoom, 
            handleGetPosts,
            room, 
            r_loading, 
            posts, 
            p_loading,
            handleDeletePost, 
            openPost } = useLayerPosts(params.room);

        useEffect(() => {  //get room and posts 
            getRoom(params.room);
        }, [params]);

        useEffect(() => {  //get room and posts 
            if(room) { handleGetPosts(room.id); }
        }, [room]);

    //room dlt modal
    const { modal, toggleModal, handleOutsideClick, modalRef } = useModal();

    if(r_loading && !room){
        return <LoadingPage/>
    }

    // console.log(room);
    return ( 
        <>
        {room &&
            <div className="page" onScroll={handleStopHover}>
                <Header nav={[ {name: room.label, url: params.room }]}/>
                <LayerInfo page={room} toggleModal={toggleModal}
                    />
                <div className="layer">
                    <Sidebar setZoomFilter={(e) => setZoom(e.currentTarget.dataset.id)}
                            handleOneFilter={handleOneFilter} activeItem={activeItem}
                            />
                    <div className="layer__body">
                        <PageBody activeView={activeView} 
                                posts={posts} 
                                p_loading={p_loading} 
                                openPost={openPost}
                                handleDeletePost={handleDeletePost} 
                                handleHover={handleHover} handleStopHover={handleStopHover}
                                coords={coords} tagpath={tagpath}
                                />
                        </div>
                        <AddButton room={room}/>
                    </div>
                <PathLegend ref={tagRef}
                            tagpath={tagpath} tagDetails={tagDetails} 
                            loadModal={loadModal} postExcerpts={postExcerpts}/>

                {modal &&  
                <LayerModal toggleModal={toggleModal} handleOutsideClick={handleOutsideClick} 
                        ref={modalRef} id={room.id}/>}
            </div> 
        }
    </>
    )
}

//pls refactor path legend out... 










/*
    const { t_loading, allTags, getAllTagsFromPosts } = useTags();

     useEffect(() => { 
            if(activeView === '5%') {
            getAllTagsFromPosts();
        }
        }, [activeView]);
*/
// {(!t_loading) && <PostList5 tags={allTags} activeView={activeView}/>}
