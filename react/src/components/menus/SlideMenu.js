import React, { useState } from 'react';
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc';
import SwitchSlide from '../animate/SwitchSlide';

const SlideMenu = (props) => { 
    
    const [hide, hideMenu] = useState(false); 

    return (
        <SwitchSlide state={hide}>
            <div className="slide">
                {hide 
                    ? <VscArrowSmallLeft className="icon icon__btn expandX" onClick={() => hideMenu(false)}/>
                    : <VscArrowSmallRight className="icon icon__btn expandX" onClick={() => hideMenu(true)}/> }
                {hide 
                    ? null
                    :  <> {props.children}
                    </>}
            </div>
        </SwitchSlide>
    );
}
 
export default SlideMenu;