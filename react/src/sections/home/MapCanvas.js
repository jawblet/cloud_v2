import React, { useState } from 'react';
import HomeIcon from '../../atoms/HomeIcon';
import DnDMenu from '../../components/dnd/menu/DnDMenu'; 
import GroupMap from './GroupMap';
import useGetRows from '../../hooks/posts/useGetRows';

export default function MapCanvas({ groups }) {
    const { postArrays } = useGetRows({postsPerRow: 2, allPosts: groups});

    const [hoverId, setHoverId] = useState(null);
    
    return (
            <div className="map__container">
                <div className="map__canvas">
                    {postArrays && postArrays.map((array, i) => {
                        return <div className="map__row" key={i}>
                            {array.map(group => {
                                return <GroupMap 
                                        key={group.slug} 
                                        group={group}
                                        hoverId={hoverId}/>
                            })}
                        </div>
                    })}
                    <HomeIcon/>
                </div>
                <div className="map__key">
                    <DnDMenu groupArray={groups} 
                            setHoverId={setHoverId}
                        />
                </div>
            </div> 
    )
} 

  
