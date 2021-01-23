import React from 'react';
import GroupGrid from './GroupGrid';

const MapGrid = ({ groups }) => {    

    return (
        groups 
        ? <> {groups.map((group, i) => {  
                return <GroupGrid 
                            key={i} 
                            group={group}/>}
            )} </>
        : null
    )
}
 
export default MapGrid;