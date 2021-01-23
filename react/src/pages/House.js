import React, { useContext, useState } from 'react';
import HouseNav from '../sections/HouseNav';
import { UserContext } from '../hooks/UserContext';
import HouseNavMenu from '../components/menus/HouseNavMenu';

const House = () => {
    const { user } = useContext(UserContext);
    const house = user.house.house; 

    const [hover, setHover] = useState(null);

    const hoverRoom = (id) => {
        console.log(id);
        setHover(id);
    }
    return (
        <div className="house">
            <HouseNav hover={hover}/>
            <HouseNavMenu house={house}
                    hoverRoom={hoverRoom}
            />
        </div>
    )
};
 
export default House;

