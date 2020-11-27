import React from 'react';
import Header from './../sections/Header'; 
import Button from '../components/Button';
import ListMenu from '../components/ListMenu';
import PostList from '../sections/PostList';
import { Link, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import useOneFilter from '../hooks/useOneFilter';
import usePosts from '../hooks/usePosts';

export default function Room() {
    let params = useParams();
    
    //sort
    const list = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    const nav = [
        {name: params.room, url: params.room },
    ];

    //get posts by room 
    const { posts, loading } = usePosts(params.room);
    console.log(posts);
    return(
        <div className="page">
            <Header nav={nav}/>
            <h3>{params.room}</h3>
            <div className="room">
                <div className="room__sidebar">
                    <ListMenu title={'sort'} list={list} handleOneFilter={handleOneFilter} activeItem={activeItem}/>
                </div>
                <div className="room__body">
                    {loading 
                        ? <div>Loading</div>
                        : <PostList posts={posts} />
                     }
                </div>
            </div>
            <span className="fixedBtn">
                <Link to={{pathname: "/add", state: params.room}}>
                    <Button button={<VscAdd className="icon icon__btn"/>}/>
                </Link>
            </span>
        </div>
    )
}