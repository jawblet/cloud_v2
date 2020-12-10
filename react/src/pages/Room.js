import React, { useState, useEffect } from 'react';
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
import useTags from '../hooks/useTags';

export default function Room() {
    let params = useParams();
    const [activeView, setZoom] = useState('100%');
    const zoom = ['100%', '25%', '5%'];

    // page settings (room, filter, view) 
    const nav = [ {name: params.room, url: params.room } ];

    const sort = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    //get posts by room and tags by house
    const { data, loading, openPost } = usePosts(params.room);
    const { t_loading, allTags, getAllTagsFromPosts } = useTags();

    const setActiveView = (e) => {  // need a transition
        const zoomValue = e.currentTarget.dataset.id;
        setZoom(zoomValue); 
    }

    useEffect(() => {
        console.log(data.posts)
    }, [data]);

    useEffect(() => {
        if(activeView === '5%') {
           getAllTagsFromPosts();
       }
    }, [activeView]);
    
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
                        {(!loading && data.posts.length === 0) && 
                            <div className="emptyRoom">
                                <h3 className="light">Empty room</h3>
                            </div>
                        }
                        {(!loading) && <PostList100 posts={data.posts} openPost={openPost} activeView={activeView}/> }
                        {(!loading) && <PostList25 posts={data.posts} openPost={openPost} activeView={activeView}/>}
                        {(!t_loading) && <PostList5 tags={allTags} activeView={activeView}/>}
                    </div>
                <span className="fixedBtn">
                    <Link to={{pathname: "/add", state: params.room}}>
                        <Button icon={<VscAdd className="icon icon__btn"/>}/>
                    </Link> 
                </span>
            </div>
        </div>
    )
}
