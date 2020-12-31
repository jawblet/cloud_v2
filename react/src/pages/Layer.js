import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../sections/Header'; 
import LayerInfo from '../sections/LayerInfo';
import PostList100 from '../sections/posts/PostList100';
import PostList25 from '../sections/posts/PostList25';
import PostList5 from '../sections/posts/PostList5'; 
import PathLegend from '../components/modals/PathLegend';
import LayerModal from '../components/modals/LayerModal';
import Button from '../components/btns/Button';
import ListMenu from '../components/ListMenu';
import useOneFilter from '../hooks/useOneFilter'; 
import useLayerPosts from '../hooks/layers/useLayerPosts';
import useTags from '../hooks/paths/useTags';
import useTagLegend from '../hooks/paths/useTagLegend';
import useModal from '../hooks/useModal';
import { Loading } from '../components/Loading';
import { VscAdd } from 'react-icons/vsc';

export default function Layer() {
    //filters 
    const [activeView, setZoom] = useState('100%');
    const zoom = ['100%', '25%', '5%'];
    const sort = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    const {tagpath, coords, tagRef, handleHover,
        tagDetails, postExcerpts, loadModal, handleStopHover } = useTagLegend();

    //GET POSTS + TAGS BY LAYER 
    let params = useParams();
    const { getRoom, handleGetPosts,
            room, r_loading, 
            posts, p_loading,
            handleDeletePost, openPost } = useLayerPosts(params.room);

    const { t_loading, allTags, getAllTagsFromPosts } = useTags();

        useEffect(() => {  //get room // view change within a room
            getRoom(params.room);
        }, [params]);
       useEffect(() => {  //get posts on room load // 
        if(room) { handleGetPosts(room.id); }
       }, [room]);

        useEffect(() => { 
            if(activeView === '5%') {
            getAllTagsFromPosts();
        }
        }, [activeView]);

    //get change zoom 
    const setActiveView = (e) => { 
        const zoomValue = e.currentTarget.dataset.id;
        setZoom(zoomValue);
    }

    //room dlt modal
    const { modal, toggleModal, handleOutsideClick, modalRef } = useModal();

    return ( (!r_loading && room)
                ? <div className="page" onScroll={handleStopHover}>
                <Header nav={[ {name: room.label, url: params.room } ]}/>
                <LayerInfo room={room} toggleModal={toggleModal}/>
                <div className="layer"> 
                    <div className="layer__sidebar">
                        <ListMenu title={'zoom'} 
                                list={zoom} 
                                handleOneFilter={setActiveView} 
                                activeItem={activeView}/>
                        <ListMenu title={'sort'} 
                                list={sort} 
                                handleOneFilter={handleOneFilter} 
                                activeItem={activeItem}/>
                    </div>
                    <div className="layer__body">
                        {p_loading && <div>Loading</div>} 
                        {(!p_loading && posts.length === 0) && 
                            <div className="layer__empty">
                                <h3 className="light">Empty layer</h3>
                            </div>
                        }
                        {(!p_loading) && <PostList100 posts={posts} 
                                                    activeView={activeView} 
                                                    handleDeletePost={handleDeletePost}
                                                    openPost={openPost}
                                                    handleStopHover={handleStopHover} 
                                                    tagpath={tagpath} 
                                                    handleHover={handleHover} 
                                                    coords={coords}
                                                    />}
                        {(!p_loading) && <PostList25 posts={posts} activeView={activeView}/>}
                        {(!t_loading) && <PostList5 tags={allTags} activeView={activeView}/>}
                    </div>
                <span className="fixedBtn">
                    <Link to={{pathname: "/add", 
                            state: {
                                id: room.id, 
                                label: room.label, 
                                slug: room.slug}
                }}>
                        <Button icon={<VscAdd className="icon icon__btn"/>}/>
                    </Link> 
                </span>
            </div>
            <PathLegend ref={tagRef}
                        tagpath={tagpath} tagDetails={tagDetails} 
                        loadModal={loadModal} postExcerpts={postExcerpts}/>

        {modal &&  
            <LayerModal toggleModal={toggleModal} handleOutsideClick={handleOutsideClick} 
                    ref={modalRef} id={room.id}/>}
        </div>
        : <Loading/>
            
    )
}
