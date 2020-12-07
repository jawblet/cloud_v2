import React from 'react';
import { ReactTinyLink } from 'react-tiny-link';

const LinkCard = ({ link }) => {
    return(
    <div className="linkCard">
    <ReactTinyLink
        showGraphic={true}
        url={link}
        header={null}
        description={null}
        />
    </div>
    )
}


const LinkPreview = ({ link }) => {
    return(
    <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={2}
        minLine={1}
        url={link}
        />
    )
}

export { 
    LinkPreview,
    LinkCard
};