import React, { useState, useRef } from 'react';
import PageBody from './PageBody';
import Chevron from '../../atoms/Chevron';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';  

const Sublayer = ({ layer, activeView }) => {
    const nodeRef = useRef(null);
    const [expand, setExpand] = useState(true);

    return (
        <div className="sublayer" key={layer.id}>
            <div className="sublayer__header">
                <Link to={`/${layer.slug}`}>
                    <h3 className="sublayer__title">
                        {layer.label}
                    </h3> 
                </Link>
                <Chevron expand={expand} setExpand={setExpand}/>
            </div>
            <CSSTransition in={expand} timeout={350} classNames="grow" nodeRef={nodeRef} 
                        unmountOnExit
                        >
               <div style={{transformOrigin:'top'}} ref={nodeRef}>
                    <div className="sublayer__body">
                            <PageBody   layer={layer}
                                        activeView={activeView} 
                                        subpage={true}
                                        /> 
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}
 
export default Sublayer;