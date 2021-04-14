import React from 'react';

const SyllabusColumn = ({item}) => {
    const { title, icon, column } = item; 
    return (
    <div className="syllabus__col">
        <div className="syllabus__col__title">
            <h3>{title}</h3> 
            {icon}
        </div>
            {column.map((item, i)=> {
                return(
                    <div className="warp__item" key={i}>
                        {item.component}
                    </div>
                )
            })}
    </div>);
}
 
export default SyllabusColumn;