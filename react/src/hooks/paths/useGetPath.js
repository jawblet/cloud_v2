import { useState } from 'react';
import axios from 'axios';

export default function useGetPath() {
    const [path, setPath] = useState(null);
    //lookup path by slug

    const getPath = async (slug) => {
        return axios.get(`/tags/s/${slug}`)
                .then(res => {
                    //return tag object 
                    setPath(res.data.data.doc);
            }).catch(err => console.log(err));
    }

    return {
        path,
        getPath
    }
}