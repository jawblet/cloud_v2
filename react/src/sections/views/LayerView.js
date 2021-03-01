import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '../../utils/Grid';

const LayerView = ({ groups }) => {
    console.log(groups);

    return (
        <>
            {groups.map((group, i) => {
               return (
                   <div className="groupGrid" key={i}>
                   <Link to={`/${group.slug}`}>
                        <h4 className="subtitle heavy">
                            {group.label}
                        </h4>
                    </Link>
                        <Grid columns="repeat(3, minmax(0, 1fr))">
                        {group.layers.map(layer => {
                                return (
                                    <Link to={`/${layer.slug}`} key={layer.slug}>
                                        <h4 className="subtitle">
                                            {layer.label}
                                        </h4>
                                </Link>
                                )
                            })}
                        </Grid>
                    </div>
                )

            })}
        </>
    );
}
 
export default LayerView;

// is there ever a situation w/ no groups? 