import React from 'react';
import Grid from '../../utils/Grid';
import PathList from '../../atoms/PathList';
import SlideMenu from '../../components/menus/SlideMenu';
import Subtitle from './Subtitle';
import slugify from 'react-slugify';
import PathCell from './PathCell';

const PathView = ({ paths, squeeze }) => {
    return (
        <>
         <div className="map__canvas">
            <Grid columns="repeat(3, 1fr)" autoRows="auto" gap={1.5}>
                {paths.map(path => {
                    return (
                        <div className="groupGrid__cell" key={path._id}>
                            <Subtitle label={path.tag} slug={`/path/${slugify(path.tag)}`}/>
                            <PathCell path={path} squeeze={squeeze}/>
                        </div>
                    )
                })}
            </Grid>
        </div> 
        <div className="map__key">
               <SlideMenu>
                   <PathList items={paths}/>
               </SlideMenu>
        </div>
        </>
    );
}
 
export default PathView;

