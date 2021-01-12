import React from 'react';
import ListMenu from '../../components/ListMenu';
import { zoom, sort } from './layer_data';
import FilterMenu from '../../components/menus/FilterMenu';

const Sidebar = (props) => {
    return (
            <div className="layer__sidebar">
                {props.group &&
                <FilterMenu title="layers" list={props.group.layers}/>
                }
                <ListMenu title='zoom'
                            list={zoom} 
                            handleOneFilter={props.setZoomFilter} 
                            activeItem={props.activeView}/>
                <ListMenu title='sort'
                        list={sort} 
                        handleOneFilter={props.handleOneFilter} 
                        activeItem={props.activeItem}/>
        </div>
    );
}
 
export default Sidebar;