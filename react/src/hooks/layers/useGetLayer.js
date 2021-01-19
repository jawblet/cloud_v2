import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

export default function useGetLayer() {
    const { groups } = useContext(UserContext); 

    const [loading, setLayerLoading] = useState(true); 
    const [layer, setLayer] = useState(null);

    async function getLayer(room) {
        let roomObject;

        groups.forEach(group => {
            group.layers.forEach(layer => { if(layer.slug === room) { roomObject = layer; } 
              });
          });

        setLayer(roomObject);
        setLayerLoading(false);
    };

    return {
        layer,
        loading,
        getLayer
    }
}






/*
        const roomObject = rooms.find(x => x.slug === room);
        console.log(roomObject);
*/

/*
    return axios.get(`/houses/${house}`)
            .then(res => {
            const rooms = res.data.data.doc.rooms;
       
            console.log(rooms);
        
            const newRoom = rooms.find(el => el.slug === room);
            setLayer(newRoom);
            setLayerLoading(false);
        }).catch(err => console.log(err));   
*/    