import React from 'react'; 
import { Link } from 'react-router-dom';  
import usePosts from '../hooks/usePosts';
import Gradient from '../atoms/Gradient';

//skylight view of room 
export default function Card({ room, squeeze, getPositionClass, handleCardClick }) {
    const { posts, loading } = usePosts(room);

    //console.log(posts);
    return(
        <div className={`card 
                    ${squeeze ? room : ''} 
                    ${squeeze ? getPositionClass(room) : ''}`} 
        key={room} data-id={room} onClick={(e) => handleCardClick(e)}>
                <Link className={`card__label ${room}`} to={`/home/${room}`}> 
                    <h4> {room} </h4> 
                </Link>
                <div className="card__body">
                    {(posts) && 
                        posts.map(post => {
                            return(
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