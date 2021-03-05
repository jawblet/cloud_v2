import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useGetGroupGrid() {
    const { user, rooms } = useContext(UserContext);
    const house = user.house._id;

    //fill row to end
    const [postArrays, setPostArrays] = useState(null);
    const [loading, setLoading] = useState(true);

    const getLayerView = async () => {
        return axios.get(`/posts/grid/${house}/`)
            .then(res => {
            //console.log(res.data.arrs);
            const arrs = res.data.arrs;
            setPostArrays(arrs);
            setLoading(false);
        });
    }
             
    return {
        getLayerView,
        postArrays,
        loading
    }
}