import { useState, useContext } from 'react'; 
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import { UserContext } from './UserContext';

export default function useLibrary() { 
    const { user } = useContext(UserContext);
    const house = user.house._id;
    const [threads, setThreads] = useState(null);

    //GET
    const getLibraryBooks = async () => {
       await axios.get(`/posts/h/${house}/library`)
            .then(res => {
                const rawNotes = res.data.data.results;
                setThreads(rawNotes);
            })
    }

    //POST 
    const addLibraryBook = async (data) => {
        const content = JSON.stringify(convertToRaw(data));
        await axios.post('/posts',{
                type: 'library',
                room: 'library',
                content,
                user,
                house
                }).then(res => {
                    //console.log(res);
                }).catch(err => console.log(err));
    }

    //DELETE 
    const deleteLibraryBook = async (id) => {
        await axios.delete(`/posts/${id}`)
            .then(() => {
                //set new state without deleted post 
                const posts = [...threads];
                const newPosts = posts.filter(el => el._id !== id);
                setThreads(newPosts); 
            })
            .catch(res => console.log(res));
    }

    //functions
    function handleLibraryBookDelete(e) {
        const id = e.currentTarget.dataset.id;
        deleteLibraryBook(id);
        getLibraryBooks();
    }
    
    function handleLibrarySubmit(data) {
        addLibraryBook(data);
        getLibraryBooks();
    }    

    return {
        handleLibrarySubmit,
        getLibraryBooks,
        handleLibraryBookDelete,
        threads
    }
}