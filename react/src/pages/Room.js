import React, { useState, useRef } from 'react';
import Header from './../sections/Header'; 
import Button from '../components/btns/Button';
import ListMenu from '../components/ListMenu';
import PostList100 from '../sections/PostList100';
import PostList25 from '../sections/PostList25';
import PostList5 from '../sections/PostList5';
import { Link, useParams} from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import useOneFilter from '../hooks/useOneFilter'; 
import usePosts from '../hooks/usePosts';
import Edit from '../sections/Edit'; 
import { CSSTransition } from 'react-transition-group';

export default function Room() {
    const nodeRef = useRef(null); // null === initial value 

    let params = useParams();
    const [zoomIn, setZoomIn] = useState(false);
    const [activeView, setZoom] = useState('100%');
    const zoom = ['100%', '25%', '5%'];

    const setActiveView = (e) => {
        setZoom(e.currentTarget.dataset.id); //switch between views // need a transition
        setZoomIn(true);
    }

    // page settings (room, filter, view) 
    const nav = [ {name: params.room, url: params.room } ];

    const sort = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    //get posts by room and tags by house
    const { posts, loading, postDetail, openPost } = usePosts(params.room);
    
    return (
            <div className="page">
                <Header nav={nav}/>
                <h3 className="page__title">{params.room}</h3>
                <div className="room">
                    <div className="room__sidebar">
                        <ListMenu title={'zoom'} list={zoom} handleOneFilter={setActiveView} activeItem={activeView}/>
                        <ListMenu title={'sort'} list={sort} handleOneFilter={handleOneFilter} activeItem={activeItem}/>
                    </div>
                    <div className="room__body">
                        {loading && <div>Loading</div>}
                        {(!loading  && activeView==='100%') && <PostList100 posts={posts} openPost={openPost}/> }
                        {(!loading && activeView === '25%') && <PostList25 posts={posts} openPost={openPost}/>}
                        {(!loading && activeView === '5%') && <PostList5 posts={posts} openPost={openPost}/>}
                    </div>
                <span className="fixedBtn">
                    <Link to={{pathname: "/add", state: params.room}}>
                        <Button icon={<VscAdd className="icon icon__btn"/>}/>
                    </Link> 
                </span>
                {postDetail && 
                <Edit openPost={openPost}/> }
            </div>
        </div>
    )
}
