import React, { useEffect, useRef } from 'react';
import { LABEL_STYLE } from './dnd';
import { Link } from 'react-router-dom';
//import GroupIcon from '../../../svg/GroupIcon';
import { VscEdit } from 'react-icons/vsc';

const GroupLabel = (props) => {
    const { row, 
        handleClick, 
        disable, handleBlur, 
        newName,
        handleChange, 
        nodeRef } = props;

    return (
        <>
        {disable 
            ? <Link to={`/group/${row.slug}`} 
                    className='dndHeader__label'>
                    <h4 style={LABEL_STYLE}>
                        {row.label}
                    </h4>
                    <VscEdit className="dndHeader__edit" 
                            onClick={handleClick} />
                </Link>
            : <input type="text" 
                ref={nodeRef}
                className="dndHeader__label dndHeader__label--edit"
                name={row.id}
                value={newName}
                onChange={handleChange}
                onBlur={handleBlur}
                style={LABEL_STYLE}
                />
            }
        </>
    );
}
 
export default GroupLabel;