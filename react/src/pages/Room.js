import React from 'react';
import Header from './../sections/Header'; 
import Button from '../components/btns/Button';
import ListMenu from '../components/ListMenu';
import PostList from '../sections/PostList';
import { Link, useParams, useLocation, Route } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import useOneFilter from '../hooks/useOneFilter'; 
import useTags from '../hooks/useTags';
import usePosts from '../hooks/usePosts';
import Edit from '../sections/Edit';
import useEditPost from '../hooks/useEditPost';

export default function Room() {
    let params = useParams();
    
    // page settings (room, filter, view) 
    const nav = [ {name: params.room, url: params.room } ];

    const list = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    const { tagView } = useTags();

    //get posts by room 
    const { posts, loading } = usePosts(params.room);

    //edit post
    const { edit, editPost } = useEditPost(); 
    
    return(
        <div className="page">
            <Header nav={nav}/>
            <h3 className="page__title">{params.room}</h3>
            <div className="room">
                <div className="room__sidebar">
                    <ListMenu title={'sort'} list={list} handleOneFilter={handleOneFilter} activeItem={activeItem}/>
                </div>
                <div className="room__body">
                    {loading 
                        ? <div>Loading</div>
                        : <PostList posts={posts} tagView={tagView} editPost={editPost}/>
                     }
                </div>
            </div>
            <span className="fixedBtn">
                <Link to={{pathname: "/add", state: params.room}}>
                    <Button icon={<VscAdd className="icon icon__btn"/>}/>
                </Link> 
            </span>
            {edit && 
            <Edit editPost={editPost}/> }
        </div>
    )
}
