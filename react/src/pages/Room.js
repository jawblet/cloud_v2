import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../sections/Header'; 
import RoomInfo from '../sections/RoomInfo';
import Button from '../components/btns/Button';
import ListMenu from '../components/ListMenu';
import PostList100 from '../sections/PostList100';
import PostList25 from '../sections/PostList25';
import PostList5 from '../sections/PostList5'; 
import TagLegend from '../components/modals/TagLegend';
import { VscAdd } from 'react-icons/vsc';
import useOneFilter from '../hooks/useOneFilter'; 
import useRooms from '../hooks/useRooms';
import useTags from '../hooks/useTags';
import useOneTag from '../hooks/useOneTag';
import Loading from '../components/Loading';

export default function Room() {
    //filters 
    const [activeView, setZoom] = useState('100%');
    const zoom = ['100%', '25%', '5%'];
    const sort = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    const {tagpath, coords, tagRef, handleHover,
        tagDetails, postExcerpts, loadModal, handleStopHover } = useOneTag();

    //GET POSTS + TAGS BY ROOM 
    let params = useParams();
    const { getRoom, handleGetPosts,
            room, r_loading, 
            posts, p_loading,
            handleDeletePost, openPost } = useRooms(params.room);
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

    return ( (!r_loading && room)
                ? <div className="page" onScroll={handleStopHover}>
                <Header nav={[ {name: room.label, url: params.room } ]}/>
                <RoomInfo room={room}/>
                <div className="room"> 
                    <div className="room__sidebar">
                        <ListMenu title={'zoom'} 
                                list={zoom} 
                                handleOneFilter={setActiveView} 
                                activeItem={activeView}/>
                        <ListMenu title={'sort'} 
                                list={sort} 
                                handleOneFilter={handleOneFilter} 
                                activeItem={activeItem}/>
                    </div>
                    <div className="room__body">
                        {p_loading && <div>Loading</div>} 
                        {(!p_loading && posts.length === 0) && 
                            <div className="emptyRoom">
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
            <TagLegend ref={tagRef}
                        tagpath={tagpath} tagDetails={tagDetails} 
                        loadModal={loadModal} postExcerpts={postExcerpts}/>
        </div>
        : <Loading/>
            
    )
}
