import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useGetLayer() {
    const { user } = useContext(UserContext); 
    const house = user.house._id; 

    const [loading, setLayerLoading] = useState(true); 
    const [layer, setLayer] = useState(null);

    async function getLayer(room) {
            return axios.get(`/houses/${house}`)
                .then(res => {
                const rooms = res.data.data.doc.rooms;
                const newRoom = rooms.find(el => el.slug === room);
                setLayer(newRoom);
                setLayerLoading(false);
            }).catch(err => console.log(err));        
        };

    return {
        layer,
        loading,
        getLayer
    }
}