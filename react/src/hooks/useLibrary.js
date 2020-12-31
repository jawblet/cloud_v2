import { useState, useContext } from 'react'; 
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import { UserContext } from './UserContext';

export default function useLibrary(limit) { 
    const { user } = useContext(UserContext);
    const house = user.house._id;

    const [threads, setThreads] = useState(null);
    const [page, setPage] = useState({}); 

    //GET 
    const getLibraryBooks = async () => {
       console.log('get');
       return axios.get(`/posts/h/${house}/library`)
            .then(res => {
              const rawNotes = res.data.data.results;
        if(rawNotes.length > limit) {
                const totalPages = [...Array(Math.ceil(rawNotes.length / limit))];
                const postArrs = totalPages.map((row, i) => 
                    rawNotes.slice(i * limit, i * limit + limit ));
                setPage({currentPage: 1, 
                totalPages: totalPages.length }); 
                return setThreads(postArrs);
            }
            // if no pgs 
        return setThreads([...Array(rawNotes)]); 
               //return setThreads(rawNotes);
            }).catch(err => console.log(err));
    }

    //POST 
    const addLibraryBook = async (data, title) => {
        const content = JSON.stringify(convertToRaw(data));
        return axios.post('/posts',{
                type: 'library',
                room: 'library',
                title,
                content,
                user,
                house
                }).catch(err => console.log(err));
            }


    //DELETE 
    const deleteLibraryBook = async (id) => {
        return axios.delete(`/posts/${id}`)
            .then(async (res) => {
                console.log(res);
                return await axios.get(`/posts/h/${house}/library`) // ?? why 
            }).catch(err => console.log(err));
    }

    //functions
    async function handleLibraryBookDelete(e) {
        const id = e.currentTarget.dataset.id;
        await deleteLibraryBook(id);
        await getLibraryBooks();
    }
    
    async function handleLibrarySubmit(data, title) {
       await addLibraryBook(data, title);
       await getLibraryBooks();
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

/*
    complex paginate logic 
*/