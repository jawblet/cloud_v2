import React from 'react';
import CTA from '../btns/CTA';
import useDeleteLayer from '../../hooks/layers/useDeleteLayer';
import { VscClose } from 'react-icons/vsc';
import useDeleteGroup from '../../hooks/layers/useDeleteGroup';
 
const LayerModal = React.forwardRef((props, ref) => {
    const { handleDeleteLayer } = useDeleteLayer(props.page.id); 
    const { handleDeleteGroup } = useDeleteGroup(props.page);
    const { layer } = props; 

      return (  
      <div className="modal__background" onClick={(e) => props.handleOutsideClick(e)}>
            <div className="modal" ref={ref}> 
                <div className="modal__X" onClick={props.toggleModal}> <VscClose className="icon icon__btn"/> </div>
                    <div className="modal__content"> 
                        <h3>Delete {layer ? 'layer' : 'group'}</h3>
                        <p style={{paddingTop:'1rem'}}>
                        Confirm you'd like to delete this {layer ? 'layer' : 'group'}.  
                        {layer ? ' Any posts in this layer will also be deleted.'
                            : `All layers in this group will become ungrouped. The layers, and the posts in them, will not be deleted.`
                            } 
                        </p> 
                        <div className="modal__actions">
                        <CTA name={"cancel"} kind="secondary" handleClick={props.toggleModal}/> 
                        <CTA name={"delete"} color="warning" 
                                handleClick={layer ? handleDeleteLayer : handleDeleteGroup}/>
                    </div>
                </div>
            </div> 
        </div>
    )
});

export default LayerModal; 