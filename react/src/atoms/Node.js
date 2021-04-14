import React from 'react';
import Flex from '../utils/Flex';
import Grow from '../components/animate/Grow';

//individual content node 
const Node = ( { c, handleOpen } ) => {
    return (
                <h3 className="warp__stitch" 
                onClick={() => handleOpen(c.id)}
                >
                    {c.text}
                </h3> 
    
    )
}

//ROW 
const Row = ({ row, handleOpen, open }) => {
    const { components, right, left } = row; 
    return (
        <>
        <Flex className="syllabus__row" width="100%">
            <div className="warp" style={{ left:left, right:right }}>
            {components.map((el, i) => {
                return (
                    <Node c={el} key={i}
                        handleOpen={handleOpen}
                        />
                )
            })} 
            </div>
        </Flex> 
            <div className="warp__dropdown">
            {components.length && 
                components.map((el, i) => {
                    return (
                        <Grow in={open[el.id]}>
                            <div className="warp__dropdown__cell" key={i}>
                                {el.dropdown}
                            </div>
                      </Grow>
                    )
                })}
            </div>
        </>
    );
}
 
export default Row;

/*
<Grow in={open[el.id]}>
                        <div className="warp__dropdown__cell" key={i}>
                            {el.dropdown}
                        </div>
                      </Grow>

                         {open[el.id] &&
                        <div className="warp__dropdown__cell" key={i}>
                            {el.dropdown}
                        </div>}
 
 */