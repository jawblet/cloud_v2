import { useState, useContext } from 'react'; 
import axios from 'axios';
import { convertToRaw } from 'draft-js';
import { UserContext } from './UserContext';

export default function useLibrary(limit) { 
    const { user } = useContext(UserContext);
    const house = user.house._id;

   const initPageState = {
        page: 1,
        totalPages: null, 
        prevPage: null,
        nextPage: null
    }

    const [threads, setThreads] = useState(null); 
    const [pageState, setPage] = useState(initPageState); 

    //GET 
    const getLibraryBooks = async (page, add) => {
        const offset = (page - 1) * limit; 
        return axios.get(`/posts/paginate/${house}/library?offset=${offset}&limit=${limit}`)
            .then(res => {
              let {docs, page, totalPages, prevPage, nextPage} = res.data.data.docs; 
              setThreads(docs);
              
              //combine
              if(page > totalPages) {
                  getLibraryBooks(totalPages);
              }
              if(add && nextPage) {
                getLibraryBooks(totalPages);
              }   

              setPage({
                page,
                totalPages,
                prevPage,
                nextPage
            })
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
        console.log(e.currentTarget);
        await deleteLibraryBook(id);
        await getLibraryBooks(pageState.page);
    }
    
    async function handleLibrarySubmit(data, title) {
       await addLibraryBook(data, title);
       await getLibraryBooks(pageState.page, true); 
    }    

    async function handlePageCounter(page) {
        getLibraryBooks(page);
    }

    return {
        handleLibrarySubmit,
        getLibraryBooks,
        handleLibraryBookDelete,
        threads,
        pageState,
        handlePageCounter
    }
}
