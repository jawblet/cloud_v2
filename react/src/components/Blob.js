import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRooms from '../hooks/useRooms';
import Gradient from '../atoms/Gradient';
import groupBy from 'lodash/groupBy';

// MASTER BLOB component 
export default function Blob(props) {
    const { room, quad, handleCardClick, getPositionClass } = props; 
    const { posts, p_loading, getRoomPosts } = useRooms();

    useEffect(() => { 
        getRoomPosts(room.id);
    }, []);

    return (
        <div className={`blob blob--${quad} 
        ${getPositionClass(room.id)}`}
        
            onClick={(e) => handleCardClick(e)}
        >
            <div className="blob__body">
            <h4 className={`blob__label blob__label--${quad}`}> {room.label} </h4>  
            </div>
        </div>
    )
};



/*
{(!p_loading) && posts.map(post => {
                            return (
                                <div key={post._id}>
                                    <Gradient 
                                        post={post} 
                                        tags={groupBy(post.tags, 'tag')}/>
                                </div>
                            )
                })
            }  
 */