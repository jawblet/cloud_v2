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
import usePosts from '../hooks/usePosts';
import useTags from '../hooks/useTags';
import useOneTag from '../hooks/useOneTag';


export default function Room() {
    let params = useParams();
    const roomRef = useRef(null);

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

    //set hover effect for tags 
    const { getTagDetails, tagDetails, postExcerpts, loadModal } = useOneTag();

    const [hover, setHover] = useState(null);
    const [coords, setCoords] = useState({
        lengthX: '',
        heightY: '',
        index: ''
    })

    //handle hover
    const handleHover = e => {
        const i = e.currentTarget.dataset.index;
        
       //calculate tag path length 
        const tagEnd = e.currentTarget.getBoundingClientRect().right;
        const roomEnd = roomRef.current.getBoundingClientRect().left;
        const x = (roomEnd - tagEnd);
        
        //calculate tag path height  
        const roomTop = roomRef.current.getBoundingClientRect().top;
        const tagMid = (e.currentTarget.getBoundingClientRect().top + e.currentTarget.getBoundingClientRect().bottom) / 2; 
        const y = tagMid - roomTop; 
        setCoords({lengthX: x,
            heightY: y,
            index: i }); 

        const tagId = e.currentTarget.dataset.id;
        getTagDetails(tagId);
        setHover(tagId);
    }

    useEffect(() => {
        if(activeView === '5%') {
           getAllTagsFromPosts();
       }
    }, [activeView]);
    
    return ( 
            <div className="page" onScroll={() => setHover(null)}>
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
                        {(!loading) && <PostList100 posts={data.posts} openPost={openPost} activeView={activeView} 
                                                    setHover={setHover} hover={hover} handleHover={handleHover} coords={coords}
                                                    />}

                        {(!loading) && <PostList25 posts={data.posts} openPost={openPost} activeView={activeView}/>}
                        {(!t_loading) && <PostList5 tags={allTags} activeView={activeView}/>}
                    </div>
                    <div className="room__margin" ref={roomRef}> 
                        <TagLegend hover={hover} tagDetails={tagDetails} 
                                    loadModal={loadModal} postExcerpts={postExcerpts}/>
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


/*
  useEffect(() => {
        console.log(data.posts)
    }, [data]);
*/