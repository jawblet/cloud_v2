import React from 'react';
import { ReactTinyLink, Description } from 'react-tiny-link';

const LinkCard = ({ link }) => {
    return(
    <div className="linkCard">
    <ReactTinyLink 
        showGraphic={false}
        width={'10vw'}
        url={link}
        header={""}
        description={""}
        minLine={0}
        />
    </div>
    )
}


const LinkPreview = ({ link }) => {
    return(
    <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        maxLine={4}
        minLine={1}
        url={link}
        />
    )
}

const LinkDetail = ({ link }) => {
    return(
        <ReactTinyLink
            cardSize="large"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={link}
            />
    )
}

export { 
    LinkPreview,
    LinkCard,
    LinkDetail
};