import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function TagLegend({ hover, tagDetails, loadModal, postExcerpts }) {
    let { tag, date, postCount } = tagDetails;
    tag = tag[0];
   
    console.log(postExcerpts);

    const nodeRef = useRef(null);

    return(
        <CSSTransition in={hover} 
                    timeout={350} 
                    nodeRef={nodeRef} 
                    classNames="fade" 
                    unmountOnExit>
            <div className="popup tagLegend" ref={nodeRef}>
                {!loadModal &&
                    <>
                    <div className="popup__header flex justifyCenter alignCenter">
                        <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
                        <h4>{tag.tag}</h4> 
                    </div> 
                        <p>This path has been used {postCount} {postCount === 1 ? 'time' : 'times' } since it was created on {date}.</p>
                        <div className="tagLegend__summary">
                        {postExcerpts[0] !== null &&
                            postExcerpts.map(el => { 
                                return (
                                <p className="tagLegend__excerpt">
                                    ...{el}..
                                </p>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </CSSTransition>
    ) 
} 