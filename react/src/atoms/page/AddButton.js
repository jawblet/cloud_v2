import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/btns/Button';
import { VscAdd } from 'react-icons/vsc';


const AddButton = ( {room} ) => {
    if(!room) {
        return null;
    }

    return (
        <span className="fixedBtn">
                    <Link to={{pathname: "/add", 
                            state: {
                                id: room.id, 
                                label: room.label, 
                                slug: room.slug}
                        }}>
                        <Button icon={<VscAdd className="icon icon__btn"/>}/>
                    </Link> 
                </span>
    );
}
 
export default AddButton;