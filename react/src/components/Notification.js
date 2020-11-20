import React from 'react';

export default function Notification({ notif }) { 
    return(
        <div className='notification success'>
            <h5>{notif}</h5>
        </div>
    )
}