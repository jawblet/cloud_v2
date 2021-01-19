import React, { useState } from 'react'; 
import { DragDropContext } from "react-beautiful-dnd";
import Group from './Group'; 
import AddGroup from './AddGroup';
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import useMapKey from '../../../hooks/house/useMapKey';

const DnDMenu = (props) => {
    const { groupArray } = props; 

    const {
        groups, 
        rows,
        reorderRows,
        addRow, 
        deleteRow } = useMapKey(groupArray); 

    const [hide, hideMenu] = useState(false);

    return ( 
    <>
     <SwitchTransition mode="out-in">
     <CSSTransition key={hide} 
                    timeout={350} 
                    classNames="rollOutX" 
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                        }}> 
        {hide 
            ? <VscArrowSmallLeft className="icon icon__btn expandX" onClick={() => hideMenu(false)}/>
            : <DragDropContext 
                onDragEnd={({ destination, source }) => {
                    if (!destination) { // // dropped outside the list
                        return;
                        }
                    reorderRows(groups, source, destination);
                    }}
                >
                    <div className="flex column fullWidth"> 
                        <div className="dnd__header">
                            <AddGroup handleClick={() => (addRow(rows))}/>
                            <VscArrowSmallRight className="icon icon__btn" onClick={() => hideMenu(true)}/>
                        </div>
                        <div className="dnd">
                            {groups && groups.map((group) => {
                                return(
                                <Group 
                                    internalScroll
                                    key={group.id}
                                    listId={group.id}
                                    listType="CARD"
                                    group={group} 
                                    layers={group.layers}
                                    deleteRow={deleteRow}
                                    />    
                                )}
                            )}
                        </div>
                    </div>
            </DragDropContext>}
        </CSSTransition>
     </SwitchTransition>
</>
    )
} 
 
export default DnDMenu;