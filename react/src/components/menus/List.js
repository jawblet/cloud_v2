import React from 'react';

const List = ({ items }) => {
    return ( 
        <ol>
           {items.map((item, i) => {
               return(
                <li key={i} className="listItem">
                    {item.label}
                </li>
               )
            })
            }
        </ol> 
     );
}
 
export default List;