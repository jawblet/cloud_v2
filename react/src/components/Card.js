import React from 'react';

const Card = (props) => {
    const { version, card } = props;
    console.log(version);

    return (
        <div className={`card ${version ? 'card__v' : ''}`}>
            <h4 className="light">{card.title}</h4>
        </div>
    );
}
 
export default Card;