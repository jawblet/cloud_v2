import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams} from 'react-router-dom';
import Header from './../sections/Header'; 
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


export default function Room() {
    let params = useParams();
    const nav = [ {name: params.room, url: params.room } ];
    //filters 
    const [activeView, setZoom] = useState('100%');
    const zoom = ['100%', '25%', '5%'];
    const sort = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');


    //GET POSTS BY ROOM 
    const { posts, p_loading, getRoomPosts, handleDeletePost, openPost } = useRooms(params.room);
        
        //get posts on room load // view change within a room
        useEffect(() => { 
            getRoomPosts(params.room);
        }, [params]);

        const {tagpath, coords, tagRef, handleHover,
            tagDetails, postExcerpts, loadModal, handleStopHover } = useOneTag();


    //get tags by room 
    const { t_loading, allTags, getAllTagsFromPosts } = useTags();

    const setActiveView = (e) => { 
        const zoomValue = e.currentTarget.dataset.id;
        setZoom(zoomValue); 
    }

    useEffect(() => { 
        if(activeView === '5%') {
           getAllTagsFromPosts();
       }
    }, [activeView]);
    
    return ( 
            <div className="page" onScroll={handleStopHover}>
                <Header nav={nav}/>
                <h3 className="page__title">{params.room}</h3>
                <div className="room"> 
                    <div className="room__sidebar">
                        <ListMenu title={'zoom'} list={zoom} handleOneFilter={setActiveView} activeItem={activeView}/>
                        <ListMenu title={'sort'} list={sort} handleOneFilter={handleOneFilter} activeItem={activeItem}/>
                    </div>
                    <div className="room__body">
                        {p_loading && <div>Loading</div>} 
                        {(!p_loading && posts.length === 0) && 
                            <div className="emptyRoom">
                                <h3 className="light">Empty room</h3>
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
                    <TagLegend ref={tagRef}
                                    tagpath={tagpath} tagDetails={tagDetails} 
                                    loadModal={loadModal} postExcerpts={postExcerpts}/>
                <span className="fixedBtn">
                    <Link to={{pathname: "/add", state: params.room}}>
                        <Button icon={<VscAdd className="icon icon__btn"/>}/>
                    </Link> 
                </span>
            </div>
        </div>
    )
}
