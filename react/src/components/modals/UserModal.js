import React from 'react';
import { VscClose } from 'react-icons/vsc'; 
import CTA from '../btns/CTA';
 
const Modal = React.forwardRef((props, ref) => (
        <div className="modal__background" onClick={(e) => props.handleOutsideClick(e)}>
            <div className="modal" ref={ref}> 
                <div className="modal__X" onClick={props.toggleModal}> <VscClose className="icon icon__btn"/> </div>
                <div className="modal__content"> 
                        <h3>Delete account</h3>
                        <p style={{paddingTop:'1rem'}}>
                        Confirm you'd like to delete your user account and all data. <b>This action can't be undone.</b> 
                        </p> 
                        <div className="modal__actions">
                        <CTA name={"cancel"} kind="secondary" handleClick={props.toggleModal}/> 
                        <CTA name={"delete"} color="warning" handleClick={props.deleteUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
);

export default Modal; 
