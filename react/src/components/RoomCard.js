import React, { useEffect } from 'react';  
import { Link } from 'react-router-dom';  
import useRooms from '../hooks/useRooms'; 
import Gradient from '../atoms/Gradient'; 
 
export default function Card({ room, squeeze, getPositionClass, handleCardClick }) {
  //const { data, loading } = usePosts(room.id); 
  const { posts, p_loading, getRoomPosts } = useRooms();

  useEffect(() => { 
    getRoomPosts(room.id);
}, []);

    return(
        <div className={`card 
                    ${squeeze ? room.id : ''} 
                    ${squeeze ? getPositionClass(room.id) : ''}`} 
                    key={room.id} data-id={room.id} 
                    onClick={(e) => handleCardClick(e)}>
                <Link className={`card__label ${room.id}`} to={`/home/${room.id}`}> 
                    <h4> {room.label} </h4>  
                </Link>
                <div className="card__body">
                    {(!p_loading) && posts.map(post => {
                            return (
                                <div key={post._id}>
                                    <Gradient post={post}/>
                                </div>
                            )
                        })
                    } 
                </div>
        </div>
    )
}
