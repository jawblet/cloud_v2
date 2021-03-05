import React from 'react';

const PathList = ({ items }) => {

    return (
        <>
         {(items && items.length > 0) 
                ?   
                items.map(tag => {
                return (
                    <div className="drawer__item" key={tag._id}>
                        <div className="tagPreview"> 
                            <span className="tagPreview__color" 
                                    style={{backgroundColor:tag.color}}>
                            </span>
                            <h4>{tag.tag}</h4> 
                        </div>
                    </div>
                        )
                    })
                : <p className="fullWidth flex justifyCenter">
                No paths yet
            </p>
            }
        </>
    );
}
 
export default PathList;