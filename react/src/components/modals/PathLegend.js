import React, { forwardRef } from 'react';

const PathLegend = forwardRef((props, ref) => {
    const { tagDetails, loadModal, postExcerpts } = props;
    let { tag, date, postCount, tagCount } = tagDetails; 
    
    console.log(loadModal);
    return(
            <div className="pathLegend__container" ref={ref}>
               {!loadModal && 
                    <div className="popup pathLegend">
                    <div className="pathLegend__body">
                        <div className="popup__header pathLegend__header">
                            <span className="tagPreview__color" style={{backgroundColor:tag.color}}></span>
                            <h4>{tag.tag}</h4> 
                        </div> 
                            <h5 className="light">
                                This path has been used {tagCount} 
                                {tagCount === 1 ? ' time ' : ' times ' }
                                since it was created on {date}.
                            </h5>
                            <div>
                            {postExcerpts[0] !== null &&
                                postExcerpts.map((el, i) => { 
                                    return (
                                    <h5 className="pathLegend__excerpt" key={i}>
                                        ...{el}..
                                    </h5>
                                    )})} 
                           </div>
                        </div>
                        <span className="pathLegend__fade"></span>
                    </div>
                } 
            </div>
    ) 
});

export default PathLegend;
