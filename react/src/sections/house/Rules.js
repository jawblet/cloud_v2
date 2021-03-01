import React from 'react';
import Versioning from './Versioning';
import NewDoc from './NewDoc';

const Rules = () => {
    //check if code exists for house

    //if so, show it

    //if now, offer blank template
    const all_versions = [
        {id: 1, title: 'Aug 5', text: 'holy smokes!!'},
        {id: 2, title: 'Aug 6', text: 'holy smokes!!'},
        {id: 3, title: 'Aug 7', text: 'holy smokes!!'},
        {id: 4, title: 'Aug 8', text: 'holy smokes!!'},
        {id: 5, title: 'Aug 9', text: 'holy smokes!!'},
        {id: 6, title: 'Aug 10', text: 'holy smokes!!'},
        {id: 7, title: 'Aug 11', text: 'holy smokes!!'}
    ];

    return (
        <div className="layer">
            <div className="page__body">
                <h3>Code of conduct</h3>
                <NewDoc/>
            </div>
            <div className="page__sidebar">
                <Versioning versions={all_versions}/>
            </div>
        </div>
    );
}
 
export default Rules;