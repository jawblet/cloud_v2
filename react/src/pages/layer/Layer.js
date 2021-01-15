import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../sections/Header'; 
import LayerInfo from '../../sections/LayerInfo';
import PathLegend from '../../components/modals/PathLegend';
import LayerModal from '../../components/modals/LayerModal';
import useOneFilter from '../../hooks/useOneFilter'; 
import useModal from '../../hooks/useModal';
import { LoadingPage } from '../../components/Loading';
import AddButton from '../../atoms/page/AddButton';
import Sidebar from './Sidebar';
import PageBody from './PageBody';
import useTagLegend from '../../hooks/paths/useTagLegend';
import useGetLayer from '../../hooks/layers/useGetLayer';

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

    const { layer, loading, getLayer } = useGetLayer(params);
    
    useEffect(() => {
        getLayer(params.room);
    }, [params]);

    //room dlt modal
    const { modal, toggleModal, handleOutsideClick, modalRef } = useModal();
 
    if(loading){
        return <LoadingPage/>
    } 

    return ( 
        <>
        {layer &&
            <div className="page" onScroll={handleStopHover}>
                <Header nav={[ {name: layer.label, url: params.room }]}/>
                <LayerInfo page={layer} toggleModal={toggleModal}
                    />
                <div className="layer">
                    <Sidebar setZoomFilter={(e) => setZoom(e.currentTarget.dataset.id)}
                            handleOneFilter={handleOneFilter} activeItem={activeItem}
                            />
                    <div className="layer__body">
                        <PageBody activeView={activeView} 
                                layer={layer} 
                                handleHover={handleHover} 
                                handleStopHover={handleStopHover}
                                coords={coords} tagpath={tagpath}
                                />
                        </div>
                        <AddButton room={layer}/>
                    </div>
                <PathLegend ref={tagRef}
                            tagpath={tagpath} tagDetails={tagDetails} 
                            loadModal={loadModal} postExcerpts={postExcerpts}/>

                {modal &&  
                <LayerModal toggleModal={toggleModal} handleOutsideClick={handleOutsideClick} 
                        ref={modalRef} id={layer.id}/>}
            </div> 
        }
    </>
    )
}








//pls refactor path legend out... 

/*
posts={posts} 
                                p_loading={p_loading} 
                                openPost={openPost}
                                handleDeletePost={handleDeletePost} 

    const {  handleGetPosts,
            room, 
            r_loading, 
            posts, 
            p_loading,
            handleDeletePost, 
            openPost } = useLayerPosts(params.room);




        useEffect(() => {  //get room and posts 
            handleGetPosts();
            console.log('get');
        }, []); // param
        */ 
/*
    const { t_loading, allTags, getAllTagsFromPosts } = useTags();

     useEffect(() => { 
            if(activeView === '5%') {
            getAllTagsFromPosts();
        }
        }, [activeView]);
*/
// {(!t_loading) && <PostList5 tags={allTags} activeView={activeView}/>}
