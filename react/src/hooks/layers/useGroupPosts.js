import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function useGroupPosts(groupSlug) {
    const { user } = useContext(UserContext);
    const house = user.house._id; 
    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState(null);
    const [loading, setGroupLoading] = useState(true);

    async function getGroup () {
            return axios.get(`/houses/${house}`)
            .then(res => {
                const groups = res.data.data.doc.groups;
                const currentGroup = groups.find(el => el.slug === groupSlug);
                setGroup(currentGroup);
                setGroupLoading(false);
        }).catch(err => console.log(err));     
    };
 
    const getGroupPosts = async(layers) => {
       const posts = layers.map(layer => {
            return axios.get(`/posts/h/${house}/${layer.id}`)
            .then(res => {
                return {layer: layer.label, 
                        slug: layer.slug, 
                        posts: [...res.data.data.results]};
            }).catch(err => console.log(err)); 
        });
        
        Promise.all(posts).then(res => setPosts(res));
        setGroupLoading(false);
    }

    async function handleGetGroup() {
        const layers = await getGroup();
        await getGroupPosts(layers);
    }

    return {
        loading,
        group,
        posts,
        handleGetGroup,
        getGroup
    }
}

//Promise.all(posts).then(res => setPosts(res.flat())); // flatten all post arrays into one
