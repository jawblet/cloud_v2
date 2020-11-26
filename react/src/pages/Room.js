import React from 'react';
import Header from './../sections/Header'; 
import Button from '../components/Button';
import ListMenu from '../components/ListMenu';
import Post from '../components/Post';
import { Link, useParams } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import useOneFilter from '../hooks/useOneFilter';

export default function Room() {
    let params = useParams();
    
    //sort
    const list = ['date', 'tag', 'boarder'];
    const { handleOneFilter, activeItem } = useOneFilter('date');

    const nav = [
        {name: params.room, url: params.room },
    ];
 
    return(
        <div className="page">
            <Header nav={nav}/>
            <h3>{params.room}</h3>
            <div className="room">
                <div className="room__sidebar">
                    <ListMenu title={'sort'} list={list} handleOneFilter={handleOneFilter} activeItem={activeItem}/>
                </div>
                <div className="room__body">
                <Post/>
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