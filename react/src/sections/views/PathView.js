import React from 'react';
import Grid from '../../utils/Grid';
import PathList from '../../atoms/PathList';
import SlideMenu from '../../components/menus/SlideMenu';
import Subtitle from './Subtitle';
import slugify from 'react-slugify';
import PathCell from './PathCell';

const PathView = ({ paths }) => {
    return (
        <>
         <div className="map__canvas">
            <Grid columns="repeat(3, 1fr)" autoRows="5rem" gap={1.5}>
                {paths.map(path => {
                    return (
                        <div className="groupGrid__cell" key={path._id}>
                            <Subtitle label={path.tag} slug={`/path/${slugify(path.tag)}`}/>
                            <PathCell id={path._id}/>
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

/*
  <div className="map__canvas">
            <Grid columns="repeat(3, 1fr)" autoRows="5rem" gap={1.5}>
                {paths.map(path => {
                    return (
                        <div className="groupGrid__cell" key={path._id}>
                            <Subtitle label={path.tag} slug={`/path/${slugify(path.tag)}`}/>
                            <PathCell id={path._id}/>
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
*/