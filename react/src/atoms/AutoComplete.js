import React from 'react';

export default function AutoComplete({ results }) {
    //const users = results.map(el => {return ( el.username )});
    return(
        <ul className="autocomplete">
          {results
         ? results.map(el => {
              return(
                  <li className="autocomplete__item" key={el._id}>
                     <h4>{el.tag}</h4>
                </li>
              )
          })
        : <div>No tags</div>
        }
        </ul>
    )
}