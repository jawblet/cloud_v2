import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom'; 
import Header from '../../sections/Header'; 
import LayerInfo from '../../sections/LayerInfo';
import useOneFilter from '../../hooks/useOneFilter'; 
import { LoadingPage } from '../../components/Loading';
import AddButton from '../../atoms/page/AddButton';
import Sidebar from './Sidebar';
import PageBody from './PageBody';
import useGetLayer from '../../hooks/layers/useGetLayer';
import useTagLegend from '../../hooks/paths/useTagLegend';

export default function Layer() { 
    let params = useParams();
    const { handleOneFilter, activeItem } = useOneFilter('date');
    const [activeView, setZoom] = useState('100%'); 

    const { layer, loading, getLayer } = useGetLayer(params);
    
    useEffect(() => {
        getLayer(params.room);
    }, [params]);

    const { handleStopHover } = useTagLegend();

    if(loading){
        return <LoadingPage/>
    } 

    return ( 
        <>
        {layer &&
            <div className="page" onScroll={handleStopHover}>
                <Header nav={[ {name: layer.label, url: params.room }]}/>
                <LayerInfo page={layer} layer={true}
                    />
                <div className="layer">
                    <Sidebar setZoomFilter={(e) => setZoom(e.currentTarget.dataset.id)}
                            handleOneFilter={handleOneFilter} activeItem={activeItem}
                            />
                    <div className="layer__body">
                        <PageBody activeView={activeView} 
                                layer={layer} 
                                />
                        </div>
                        <AddButton room={layer}/>
                    </div>            
            </div> 
        } 
    </>
    )
};
