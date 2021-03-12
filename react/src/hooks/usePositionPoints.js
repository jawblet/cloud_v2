import { useState, useRef } from 'react';
import Pin from '../atoms/Pin';
import groupBy from 'lodash/groupBy';

export default function usePositionPoints() {
    const cellRef = useRef(null);

    const [pins, setPins] = useState(null);

    const getPinPos = async(coords, posts, color) => {
        const { radius, centerX, centerY } = (coords); 
        if(posts.length) {
            const pins = posts.map(post => {
                console.log(post);
                const r = radius * Math.random();
                const a = 2 * Math.PI * Math.random();
        
                const x = Math.round(r * Math.cos(a) + centerX);
                const y = Math.round(r * Math.sin(a) + centerY);

                return (
                    < Pin key={post._id} 
                        post={post}
                        tags={groupBy(post.tags, 'tag')}
                        x={x} y={y} 
                        color={color}
                        path />
                )
            });
            setPins(pins);
        }
    }

    return {
        cellRef,
        getPinPos,
        pins
    }
}