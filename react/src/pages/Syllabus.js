import React, { useState, useEffect } from 'react';
import { SYLLABUS_HEADERS } from '../data/syllabus';
import SyllabusItem from '../atoms/SyllabusItem';

const Syllabus = () => {
    const [dropdowns, setDropdowns] = useState(SYLLABUS_HEADERS.map(item => false));

    const sendToggle = (id) => {
        let newArr = [...dropdowns];
        newArr[id] = !newArr[id];
        setDropdowns(newArr);
    }

    return (
        <>
             <h3 className="houseTitle"> 
                References
            </h3>
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

/*
  <div className="syllabus__item">
                    <div className="syllabus__title">
                        <h4 className="heavy"> Memory palace &amp; spatial software </h4> 
                        <img src={ac} alt='animal crossing' className='syllabus__img'/>
                    </div>
                   
                </div>

                <div className="syllabus__item">
                    <div className="syllabus__title">
                        <h4 className="heavy"> Pamphilia &amp; personal narrative </h4> 
                            <LayerIcon id='L3' l={l} fill={fill}/>
                    </div> 
                </div>

                <div className="syllabus__item">
                    <div className="syllabus__title">
                        <h4 className="heavy"> Microsoft Bob &amp; the desktop metaphor</h4> 
                        <img src={bob} alt='microsoft bob' className='syllabus__img'/>
                    </div>
                </div>

                <div className="syllabus__item">
                    <div className="syllabus__title">
                        <h4 className="heavy"> <em>I'm very into you</em> &amp; wayfinding</h4> 
                        <LayerIcon id='L1' l={l} fill={fill}/>
                    </div>
                </div>

                <div className="syllabus__item">
                    <div className="syllabus__title">
                        <h4 className="heavy"> Xanadu &amp; hypertext </h4> 
                        <img src={hypertext} alt='forward anywhere floppy disk' className='syllabus__img'/>
                    </div>
                </div> 
                */