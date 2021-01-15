import { useState } from 'react';
import axios from 'axios'; 
import groupBy from 'lodash/groupBy';

export default function usePostDetail(postId) {
    const [post, setPost] = useState(null);
    const [tags, setTags] = useState(null);
    const [loading, setLoading] = useState(true);

    const getPostDetail = async() => {
       return axios.get(`/posts/${postId}`)
                .then(res => {
            const post = res.data.data.doc;
            setPost(post);
            setTags(groupBy(post.tags, 'tag'));
            setLoading(false)
        }).catch(err => console.log(err));
}

    return {
        post, 
        tags,
        loading,
        getPostDetail
    }
}