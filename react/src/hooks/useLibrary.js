import { useState, useContext } from 'react'; 
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import { UserContext } from './UserContext';

export default function useLibrary() { 
    const { user } = useContext(UserContext);
    const house = user.house._id;
    const [threads, setThreads] = useState(null);

    const [page, setPage] = useState({}); 
    const limit = 2;

    //GET
    const getLibraryBooks = async () => {
       await axios.get(`/posts/h/${house}/library`)
            .then(res => {
                const rawNotes = res.data.data.results;
               console.log(rawNotes);
                if(rawNotes.length > limit) {
                    const totalPages = [...Array(Math.ceil(rawNotes.length / limit))];
                    const postArrs = totalPages.map((row, i) => 
                        rawNotes.slice(i * limit, i * limit + limit ));
                    setPage({currentPage: 1, 
                    totalPages: totalPages.length }); 
                    setThreads(postArrs);
                    return;
                }
                return setThreads([...Array(rawNotes)]); 
            })
    }

    //POST 
    const addLibraryBook = async (data, title) => {
        console.log(title);
        const content = JSON.stringify(convertToRaw(data));
        await axios.post('/posts',{
                type: 'library',
                room: 'library',
                title,
                content,
                user,
                house
                }).then(res => {
                    console.log(res);
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
    
    function handleLibrarySubmit(data, title) {
        addLibraryBook(data, title);
        getLibraryBooks();
    }    

    return {
        handleLibrarySubmit,
        getLibraryBooks,
        handleLibraryBookDelete,
        threads,
        page,
        setPage 
    }
}