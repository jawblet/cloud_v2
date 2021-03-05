import React, { useState } from 'react'; 
import { DragDropContext } from "react-beautiful-dnd";
import Group from './Group'; 
import AddGroup from './AddGroup';
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc';
import useMapKey from '../../../hooks/house/useMapKey';
import SwitchSlide from '../../animate/SwitchSlide';

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
    <SwitchSlide state={hide}>
        <div className="dnd__wrapper"> 
            {hide 
                ? <VscArrowSmallLeft className="icon icon__btn expandX" onClick={() => hideMenu(false)}/>
                : <DragDropContext 
                    onDragEnd={({ destination, source }) => {
                        if (!destination) { // dropped outside the list
                            return;
                            }
                        reorderRows(groups, source, destination);
                        }}
                    >
                            <div className="dnd__header">
                                <AddGroup handleClick={() => (addRow(rows))}/>
                                <VscArrowSmallRight className="icon icon__btn expandX" onClick={() => hideMenu(true)}/>
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
                                        {...props}
                                        />    
                                )}
                            )}
                    </div>
            </DragDropContext>}
        </div>
    </SwitchSlide>
    )
} 
 
export default DnDMenu;