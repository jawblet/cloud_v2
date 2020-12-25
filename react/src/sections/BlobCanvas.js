import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Blob } from '../svg/Blob';

export default function BlobCanvas() {
    const { rooms } = useContext(UserContext);

    return(
        <div className="blobCanvas">
        {rooms &&
        rooms.map(room => {
            return (
                <Blob/>
            )
        })}
        </div>
    )

    
}