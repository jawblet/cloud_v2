//filters 
export const zoom = ['100%', '25%', '5%'];
export const sort = ['date', 'tag', 'boarder'];

//style
//inline edit title 
export const PAGE_TITLE = { 
        fontFamily: 'Work Sans, sans-serif', 
        fontSize: '1.5rem',
        fontWeight: 300,
        letterSpacing: '0.5px'
}

export const getUniqueTags = (items) => {
        const uniqueTags =  Array.from(new Set(items.map(el => el.tag)))
                .map(tag => { const uniqueTag = items.find(el => el.tag === tag);
                return uniqueTag;
        });
        return uniqueTags;
}

export const getUrlBase = (url) => {
        url = url.substr(0, url.lastIndexOf('/'));
        return url;    
}