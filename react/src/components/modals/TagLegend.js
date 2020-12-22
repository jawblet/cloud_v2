import React, { forwardRef } from 'react';

const TagLegend = forwardRef((props, ref) => {
    const { tagDetails, loadModal, postExcerpts } = props;
    let { tag, date, postCount, tagCount } = tagDetails; 



    return(
            <div className="tagLegend__container" ref={ref}>
                 {!loadModal && 
                    <div className="popup tagLegend">
                    <div className="tagLegend__body">
                        <div className="popup__header tagLegend__header">
                            <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
                            <h4>{tag.tag}</h4> 
                        </div> 
                            <h5 className="light">This path has been used {tagCount} {tagCount === 1 ? 'time ' : 'times ' }
                            since it was created on {date}.</h5>
                            <div>
                            {postExcerpts[0] !== null &&
                                postExcerpts.map((el, i) => { 
                                    return (
                                    <h5 className="tagLegend__excerpt" key={i}>
                                        ...{el}..
                                    </h5>
                                    )})}
                           </div>
                        </div>
                    </div>
                }
            </div>
    ) 
});

export default TagLegend;
