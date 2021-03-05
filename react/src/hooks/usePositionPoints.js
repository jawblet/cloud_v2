import { useState, useRef } from 'react';
import Pin from '../atoms/Pin';


export default function usePositionPoints() {
    const cellRef = useRef(null);

    const [pins, setPins] = useState(true);

    const getPinPos = async(coords, posts) => {
        const { radius, centerX, centerY } = (coords);
        if(posts.length) {
            const pins = posts.map(post => {
                const r = radius * Math.random();
                const a = 2 * Math.PI * Math.random();
        
                //const x = Math.round(r * Math.cos(a) + centerX);
                //const y = Math.round(r * Math.sin(a) + centerY);
                return (
                    < Pin key={post._id} 
                          path  
                        //x={x} y={y}
                        />
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