import { useState } from 'react';
import ExpandButton from '../atoms/ExpandButton';

export default function useSqueeze() {
    const [squeeze, setSqueeze] = useState(false);

    const handleSqueeze = () => { setSqueeze(!squeeze); }

    const squeezeBtn = [
        {id: 4, 
        name: 'squeeze', 
        type: 'bottom', 
        icon: <ExpandButton className="icon icon__btn" squeeze={squeeze} data-id="squeeze"/> }
    ];

    return {
        squeeze,
        squeezeBtn,
        handleSqueeze
    }
}