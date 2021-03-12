import React from 'react';
import Grow from '../components/animate/Grow';
import { THEMES } from '../data/syllabus';
import Blur from '../atoms/Blur';

const SyllabusItem = ({ item, id, ...props }) => {
    const { title, dropdown, icon, category } = item; 

    return (
        <div className="reference__entry">
             <span onClick={() => props.sendToggle(id)} 
                    className="reference__icon"
                > {icon}
                </span>
            <span className="heavy reference__title">
                {title}
            </span> 
            <Grow in={props.dropdowns[id]}>
                <div className="reference__dropdown">
                    {dropdown}
                </div>
            </Grow>
        </div>
        
    );
}
 
export default SyllabusItem;

/*
 {props.dropdowns[id] ? '-' : '+'}
 //style={{backgroundColor:THEMES[category].color }}
 */
//                 <Blur color={THEMES[category].color}/>
