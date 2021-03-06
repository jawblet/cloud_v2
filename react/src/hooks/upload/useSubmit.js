import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import { convertToRaw } from 'draft-js';
import { UserContext } from '../UserContext';
import slugify from 'react-slugify';

export default function useSubmit() {
    const { globalTags } = useContext(UserContext);
    let history = useHistory();
    const [error, setError] = useState(null);

//handle URL POST
    const handleLinkSubmit = async (formValues) => {
        const { content, user, house, room, roomName, tags, comment } = formValues.values;
        const roomTo = slugify(roomName);

        await axios
                .post('/posts', { // post note 
                    type: 'link',
                    content,
                    user,
                    house, 
                    room,
                    tags,
                }).then((res) => {
                //if comment exists, post comment w/ post id
                const post = res.data.data.doc._id;
                if(comment !== '') {
                    axios.post('/comments', {
                        comment, 
                        user,
                        post
                    })
                    //.then(res => console.log(res));
                }
                history.push(`/${roomTo}`);
            }).catch((err) => { 
                if(err.response.status === 400) {
                   // console.log(err.response.data);
                    setError(err.response.data.messages); //not read at the moment 
                }
            })
        };

//handle note POST 
    const handleNoteSubmit = async (formValues, data) => {
        //stringify draft-js to save
        const note = JSON.stringify(convertToRaw(data));
        const tagArr = [];
        let tag;
        
        console.log(globalTags);
        // get tags from note to save to post 
        if(globalTags.length !== 0) { // check if tags exist  
            const text = data.getPlainText(); 
            const tagNames = globalTags.map(el => el.tag);
            const TAGS_REGEX = new RegExp(tagNames.join("|"), "gi"); // create regex to search for names 
    
                while ((tag = TAGS_REGEX.exec(text)) !== null) {
                    const foundTag = tag[0].toLowerCase(); //convert tag to lc 
                    let tagObj = globalTags.find(obj => obj.tag === foundTag);
                    tagArr.push(tagObj);
                }
        }

        const { user, house, room, roomName, comment } = formValues;
        const roomTo = slugify(roomName);
    
        try {
            await axios({
                method: 'POST',
                url: 'posts',
                data: {
                    type: 'note',
                    content: note,
                    user,
                    house, 
                    room,
                    tags: [...tagArr],
                    comment
                }
            }).then(res => {
                //console.log(res);
                history.push(`/${roomTo}`); 
            })
            } catch(err) {
                console.log(err)
            }
        };

    return {
        handleLinkSubmit,
        handleNoteSubmit,
        error
    }
}
