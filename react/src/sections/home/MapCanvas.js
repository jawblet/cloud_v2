import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import { Link } from 'react-router-dom';
import HomeIcon from '../../atoms/HomeIcon';
import AccordionMenu from '../../components/menus/AccordionMenu';

export default function MapCanvas() {
    const { rooms } = useContext(UserContext);

    const items = [
        {group: "group1", 
        layers:[ 
            {"label": "Kitchen", "slug": "kitchen", "id": 0}, 
            {"label": "Living room", "slug": "living-room", "id": 1}, 
            {"label": "Bedroom", "slug": "bedroom", "id": 2},
            {"label": "Basement", "slug": "basement", "id": 3} ]
        },
        {group: "group2", 
        layers:[ 
            {"label": "Sunroom", "slug": "sun", "id": 4}, 
            {"label": "Dungeon", "slug": "dungeon", "id": 5}, 
            {"label": "Troll bridge", "bridge": "bedroom", "id": 6},
            {"label": "River", "slug": "river", "id": 7} ]
        }
    ];

    const itemArr = Object.values(items).map(el => { return el.layers; });
 
    return (
        <div className="map__container">
        <div className="map__canvas">
            <HomeIcon/>
        </div>
        <div className="map__key">
                <AccordionMenu items={items}/>
        </div>
    </div>
    )
} 

  

/*
example of group obj: 
  const items = [
        {group: "group1", 
        layers:[ 
            {"label": "Kitchen", "slug": "kitchen", "id": 0}, 
            {"label": "Living room", "slug": "living-room", "id": 1}, 
            {"label": "Bedroom", "slug": "bedroom", "id": 2},
            {"label": "Basement", "slug": "basement", "id": 3} 
        ]
        }
    ];
*/