import React from 'react';
 
export default function AutoComplete({ results, selectTag }) {
    return(
        <ul className="autocomplete">
          {results
         ? results.map(el => {
              return(
                  <li className="autocomplete__item" key={el._id} data-id={el._id} data-name={el.tag} onClick={selectTag}>
                     <h4>{el.tag}</h4>
                </li>
              )
          })
        : <div>No tags</div>
        }
        </ul>
    )
}