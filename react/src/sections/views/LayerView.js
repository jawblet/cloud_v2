import React from 'react';
import Grid from '../../utils/Grid';
import Subtitle from './Subtitle';
import PostCell from './PostCell';
import DnDMenu from '../../components/dnd/menu/DnDMenu';

const LayerView = (props) => { 
  
    return (
        <>
        <div className="map__canvas">
            {props.groups.map((group, i) => {
                return (
                <div className="groupGrid" key={i}>
                    <Subtitle slug={group.slug} label={group.label}
                                p="1rem" heavy/>
                    <Grid columns="repeat(3, minmax(0, 1fr))">
                        {group.layers.map(layer => {
                            return (
                                <div className="groupGrid__cell" key={layer.slug}>
                                    <Subtitle slug={`${layer.slug}`} label={layer.label}/>
                                    <PostCell id={layer.id}/>
                                </div>
                                )
                            })}
                        </Grid>
                    </div>
                    )
                })}
            </div>
            <div className="map__key">
                <DnDMenu groupArray={props.groups} 
                        hoverId={props.hoverId}  
                        setHoverId={props.setHoverId}/> 
            </div>    
        </>
    );
}
 
export default LayerView;

// is there ever a situation w/ no groups? 

//send correct array of posts to cell by key value pair                                
