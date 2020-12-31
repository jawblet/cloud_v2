import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import Card from './../../components/Card';
import useCardPosition from '../../hooks/layers/useCardPosition';
import useGetRows from '../../hooks/posts/useGetRows';
//import { CSSTransition } from 'react-transition-group';
/*eslint-disable*/

export default function Cards( { squeeze } ) { 
    const { rooms } = useContext(UserContext); 

    const { loading, postArrays } = useGetRows({postsPerRow: 2, allPosts: rooms});

    const { handleCardClick, getPositionClass } = useCardPosition();
     
    return(
        <>        
        {!loading && 
                postArrays.map((floor, i) => {
                    return(
                    <div className="floor" key={i}>
                        {floor.map((room, i) => {
                            return (
                            <Card room={room} squeeze={squeeze} key={room.slug}
                                handleCardClick={handleCardClick} 
                                getPositionClass={() => getPositionClass(room.id)}
                                />
                            )
                        })}
                    </div>
                    )
                 })
            }
        </>
    )
}


/*
    useEffect(() => {
        if(rooms) { 
            let postArrays;
            const postTotal = rooms.length; 
            const numRows = [...Array(Math.ceil((postTotal + 1) / 3))];
            postArrays = numRows.map((row, i) => 
                (i === 0) 
                    ? rooms.slice(i * 2, i * 2 + 2)
                        
                    : rooms.slice(i * 3, i * 3 + 3)  
                )
            setPostArrays(postArrays);
            setLoading(false);
        }
    }, [rooms]);
    */