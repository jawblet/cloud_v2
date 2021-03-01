import React, { useState, useEffect } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import Rolldown from '../animate/Rolldown';

export default function LayerSelectMenu({ items, active, selectItem, setAdd }) { 
    const list = items.filter(item => item.label !== active);
 
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        setMenu(false); 
    }, [active]);
    
    const handleMenuToggle = () => {
        setMenu(!menu);
    } 

    return( 
        <div className="selectmenu">
            <h4 className="selectmenu__picked" onClick={handleMenuToggle}
            style={{paddingRight:'5rem'}}> 
                {active} 
                <VscChevronDown className="icon icon__btn selectmenu__expand"/> 
            </h4> 
             <Rolldown in={menu}>
                <menu className="selectmenu__dropdown">
                        {list.map(item => {
                            return (
                                <li className="selectmenu__item" key={item.id} data-id={item.id} 
                                    onClick={(e) => selectItem(e)}>
                                    {item.label}
                                </li>
                            )
                        })}
                        <li className="selectmenu__item selectmenu__item--new" onClick={() => setAdd(false)}>
                            <h4 className="lightest" style={{fontWeight:'bold'}}>
                                + Add layer
                            </h4>     
                        </li> {/*spacer elem*/}
                        <div style={{height:'3rem', marginBottom:'-3rem', background:'transparent'}}
                            >
                        </div>
                    </menu>
             </Rolldown>
        </div>
    )
}

