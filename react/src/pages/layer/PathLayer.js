import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import useGetPath from '../../hooks/paths/useGetPath';
import PageBody from './PageBody';
import Header from '../../sections/Header';
import Sidebar from './Sidebar';

const PathLayer = () => {
    let params = useParams();

    const { path, getPath } = useGetPath();
  
    useEffect(() => {
        //send tag's slug to lookup
        getPath(params.path);
    }, [params])
    
    //get posts by tag 
    //say posts' layer of origin 
    const [activeView, setZoom] = useState('100%'); 

    return ( 
        <>
        {path && 
        <div className="page">
            <Header nav={[{name: path.tag, url: params.path }]}/>
            <div className="page__info">
                <div className="page__title"
                    style={{paddingLeft:'1rem'}}>
                    {path.tag}
                </div>
            </div>
             <div className="layer">
                 <Sidebar setZoomFilter={(e) => 
                        setZoom(e.currentTarget.dataset.id)}/>
                 <div className="layer__body">
                    <PageBody path={path}
                            activeView={activeView}
                            />
                 </div>
             </div>
        </div>}
        </>
    );
}
 
export default PathLayer;