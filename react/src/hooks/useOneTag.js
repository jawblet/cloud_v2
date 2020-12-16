import React, {useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';

export default function useOneTag(){
    const { user } = useContext(UserContext);

   const [loadModal, setLoadModal] = useState(true);
    const [tagDetails, setTagDetails] = useState({
        tag: '',  
        date: '',
        postCount: '',
    });

    const [postExcerpts, setExcerpts] = useState([]);

    //get tag using tag id
    const getTagDetails = async(id) => {
        await axios.get(`/posts/details/${user.house._id}/${id}`)
            .then(res => {
                const {tag, posts, postCount} = res.data.data;
                let date = new Date(tag[0].createdOn);
                date = date.toDateString('en', 
                            { day: "numeric", 
                            month: "short", 
                            year: "numeric" });

                setTagDetails({
                    tag,
                    date,
                    postCount
                });

            //find excerpts to display on tag legend 
            const notes = posts.filter(el => el.type === 'note'); 

            const excerpts = notes.map(note => {
                const name = tag[0].tag; // tag
                const contentState = convertFromRaw(JSON.parse(note.content)); // parse draft-js
                const TAG_REGEX = new RegExp(`[^.!?;]*(${name})[^.?!;]*[.?!;]`, "i"); //regex: extract sentence with tag in note 
                const text = contentState.getPlainText(); //get 
                let matchArr;

                while ((matchArr = TAG_REGEX.exec(text)) !== null) {
                    return matchArr[0];
                    } 
                return null; 
            });

           // console.log(excerpts);
            setExcerpts(excerpts);

       
        }).catch(err => console.log(err));
        setLoadModal(false);
    }

  
    return {
        getTagDetails,
        tagDetails,
        postExcerpts,
        loadModal
    }
}
