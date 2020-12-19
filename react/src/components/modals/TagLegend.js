import React, { forwardRef } from 'react';
//import { CSSTransition } from 'react-transition-group';

const TagLegend = forwardRef((props, ref) => {
    const { tagDetails, loadModal, postExcerpts } = props;
    let { tag, date, postCount } = tagDetails;

    return(
            <div className="tagLegend" ref={ref}>
                 {!loadModal && 
                    <div className="popup">
                    <div className="popup__header flex justifyCenter alignCenter">
                        <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
                        <h4>{tag.tag}</h4> 
                    </div> 
                        <p>This path has been used {postCount} {postCount === 1 ? 'time ' : 'times ' }
                        since it was created on {date}.</p>
                        <div className="tagLegend__summary">
                        {postExcerpts[0] !== null &&
                            postExcerpts.map((el, i) => { 
                                return (
                                <p className="tagLegend__excerpt" key={i}>
                                    ...{el}..
                                </p>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
    ) 
});

export default TagLegend;


/*
 
*/