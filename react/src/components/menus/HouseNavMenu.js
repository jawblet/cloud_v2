import React from 'react';
import { Link } from 'react-router-dom'; 

const HouseNavMenu = ({ house, hoverRoom }) => {
    const rooms = [
                { url: 'paths', label: 'Path key' }, 
                { url: 'rooms', label: 'Room key' }, 
                { url: 'syllabus', label: 'Syllabus' },
                { url: '', label: 'Post view' },
                { url: '', label: 'Path view' },
                { url: 'archive', label: 'Archive' },
                { url: 'filing', label: 'Mailroom' }
                 ];
    return (
        <ol className="house__menu">
            <div className="dndHeader__label">
                <h4 className="heavy">
                    {house}
                </h4>
            </div>
            {rooms.map((el, i) => { 
            return <Link to={`/library/${el.url}`} 
                        key={i}
                        onMouseEnter={() => hoverRoom(i + 1)}
                        onMouseLeave={() => hoverRoom(null)}>
                <p className="dnd__item dnd__item--nested">
                    {i + 1}. {el.label}
                </p>
            </Link>
            })
          }
        </ol>
    );
}
 
export default HouseNavMenu;