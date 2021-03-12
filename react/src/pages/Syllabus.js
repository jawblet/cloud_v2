import React, { useState } from 'react';
import { SYLLABUS_HEADERS, THEMES } from '../data/syllabus';
import SyllabusItem from '../atoms/SyllabusItem';
//import Grid from '../utils/Grid';
import Blur from '../atoms/Blur';

const Syllabus = () => {
    const [dropdowns, setDropdowns] = useState(SYLLABUS_HEADERS.map(item => false));

    const sendToggle = (id) => { 
        let newArr = [...dropdowns];
        newArr[id] = !newArr[id];
        setDropdowns(newArr);
    }

    return (
        <>
         <h2 className="houseTitle"> 
                References
            </h2>
        <p className="syllabus__intro"> 
            We found ourselves returning to themes of
            {THEMES.map((el, i) => {
                return( <span key ={i}>
                    <Blur color={el.color}/> {el.theme} 
                    {i === (THEMES.length - 1) ? '.' : ','}
                </span>)
            })}
        </p>
        <div className="syllabus">
            {SYLLABUS_HEADERS.map((item, i) => {
                return <SyllabusItem key={i} sendToggle={sendToggle}
                        item={item}  id={i}
                        dropdowns={dropdowns}
                        />
            })}
        </div>
            
        </>
    ); 
}
 
export default Syllabus;

/*
//one or two col layout?
<Grid columns='repeat(2, 1fr)' rows='repeat(3, 1fr)' gap="1" className="syllabus">
</Grid>
*/

 