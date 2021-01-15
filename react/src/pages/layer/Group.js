import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from '../../sections/Header'; 
import LayerInfo from '../../sections/LayerInfo';
import Sidebar from './Sidebar';
import AddButton from '../../atoms/page/AddButton';
import { LoadingPage } from '../../components/Loading';
import useGroupPosts from '../../hooks/layers/useGroupPosts';
import Sublayer from './Sublayer';


const Group = () => {
    let params = useParams();
    const [activeView, setZoom] = useState('100%');

    const { group, loading, getGroup } = useGroupPosts(params.group);

    useEffect(() => {
        getGroup();
    },[params.group]); 

    if(loading){
        return <LoadingPage/>
    }

    return (
        <>
        {group &&
            <div className="page">
            <Header/>
            <LayerInfo page={group}/>
            <AddButton room={group.layers[0]}/>
            <div className="layer">
                <Sidebar group={group}/>
                <div className="layer__body">
                    {group.layers && group.layers.map((layer, i) => { 
                        return (
                            <Sublayer layer={layer} activeView={activeView}/>
                        )}
                        )
                    }
                </div>
            </div>
        </div>}
        </>
    );
}
 
export default Group;

//  {!object.posts.length && <EmptySubpage type="layer"/>}
