import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../sections/Header'; 
import LayerInfo from '../../sections/LayerInfo';
import Sidebar from './Sidebar';
import AddButton from '../../atoms/page/AddButton';
import { LoadingPage } from '../../components/Loading';
import useGroupPosts from '../../hooks/layers/useGroupPosts';

const Group = () => {
    let params = useParams();

    const { group, getGroup } = useGroupPosts();

    useEffect(() => {
        getGroup(params.group);
    },[params])

    if(!group){
        return <LoadingPage/>
    }

    return (
        <div className="page">
            <Header/>
            <LayerInfo page={group}/>
            <AddButton room={group.layers[0]}/>
            <div className="layer">
                <Sidebar group={group}/>
                <div className="layer__body">
                </div>
            </div>
        </div>
    );
}
 
export default Group;