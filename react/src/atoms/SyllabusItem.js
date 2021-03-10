import React from 'react';
import Grow from '../components/animate/Grow';

const SyllabusItem = ({ item, id, ...props }) => {
    const { title, icon, dropdown } = item; 

    return (
        <div className="syllabus__item">
            <div className="syllabus__title">
                <h4 onClick={() => props.sendToggle(id)} className="pointer">
                {props.dropdowns[id] ? '—' : '+'}
                &nbsp;
                </h4>
                <h4 className="heavy">{title}</h4> 
                {icon}
            </div>
            <Grow in={props.dropdowns[id]}>
                {dropdown}
            </Grow>
        </div>
    );
}
 
export default SyllabusItem;