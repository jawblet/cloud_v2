import { useState, useRef } from 'react';
import Pin from '../atoms/Pin';


export default function usePositionPoints() {
    const cellRef = useRef(null);

    const [pins, setPins] = useState(null);

    const getPinPos = async(coords, posts, color) => {
        const { radius, centerX, centerY } = (coords);
        if(posts.length) {
            const pins = posts.map(post => {
                const r = radius * Math.random();
                const a = 2 * Math.PI * Math.random();
        
                const x = Math.round(r * Math.cos(a) + centerX);
                const y = Math.round(r * Math.sin(a) + centerY);

                console.log(color);
                return (
                    < Pin key={post._id} 
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