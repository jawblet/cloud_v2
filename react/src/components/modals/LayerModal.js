import React from 'react';
import CTA from '../btns/CTA';
import useDeleteLayer from '../../hooks/layers/useDeleteLayer';
import { VscClose } from 'react-icons/vsc';
 
const LayerModal = React.forwardRef((props, ref) => {
    const { handleDeleteLayer } = useDeleteLayer(props.id);
 
      return (  
      <div className="modal__background" onClick={(e) => props.handleOutsideClick(e)}>
            <div className="modal" ref={ref}> 
                <div className="modal__X" onClick={props.toggleModal}> <VscClose className="icon icon__btn"/> </div>
                    <div className="modal__content"> 
                        <h3>Delete layer</h3>
                        <p style={{paddingTop:'1rem'}}>
                        Confirm you'd like to delete this layer. Any posts in this layer will also be deleted.
                        </p> 
                        <div className="modal__actions">
                        <CTA name={"cancel"} kind="secondary" handleClick={props.toggleModal}/> 
                        <CTA name={"delete"} data-id={props.id} color="warning" handleClick={handleDeleteLayer}/>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default LayerModal; 