import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getUrlBase } from '../../pages/layer/layer_data';

//update, delete, open posts 
export default function useManagePosts() {
let history = useHistory();
let location = useLocation();

//DELETE 
const deletePost = async (id) => {
    await axios.delete(`/posts/${id}`)
        .catch(err => console.log(err));
    };

//UPDATE 
    const updatePost = async(note, id) => {
        await axios.put(`/posts/${id}`, {
            content: note
        }).catch(err => console.log(err));
    };

function openPost(e) {
    const postId = e.currentTarget.dataset.id;
    history.push(`${location.pathname}/${postId}`);
} 

    async function handleDeleteDetail(e) {
       await deletePost(e.currentTarget.dataset.id);
       const url = getUrlBase(location.pathname);
       history.push(url);
}
    
    return {
        openPost,
        updatePost,
        deletePost,
        handleDeleteDetail
    }

}
