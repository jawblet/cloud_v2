import React, { useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import Group from './Group'; 
import AddGroup from './AddGroup';
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import useMapKey from '../../../hooks/house/useMapKey';

const DnDMenu = (props) => {
    const { groups } = props; 

    const {rows,
        reorderRows,
        addRow,
        deleteRow } = useMapKey(groups); 

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
                    reorderRows(rows, source, destination);
                    }}
                >
                    <div className="flex column fullWidth"> 
                        <div className="dnd__header">
                            <AddGroup handleClick={() => (addRow(rows))}/>
                            <VscArrowSmallRight className="icon icon__btn" onClick={() => hideMenu(true)}/>
                        </div>
                        <div className="dnd">
                            {rows && rows.map((row) => (
                                <Group 
                                    internalScroll
                                    key={row.id}
                                    listId={row.id}
                                    listType="CARD"
                                    row={row} 
                                    deleteRow={deleteRow}
                                    />    
                                )
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