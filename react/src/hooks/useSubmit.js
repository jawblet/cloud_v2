import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import { convertToRaw } from 'draft-js';
import { UserContext } from './UserContext';

export default function useSubmit() {
    const { globalTags } = useContext(UserContext);

    let history = useHistory();

//handle URL POST
    const handleLinkSubmit = async (formValues) => {
        const { content, user, house, room, tags, comment } = formValues.values;

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
                history.push(`home/${room}`); 
            }).catch((err) => { console.log(err) })
        };

//handle note POST 
    const handleNoteSubmit = async (formValues, data) => {
        const note = JSON.stringify(convertToRaw(data));
        const tagArr = [];
        let tag;
        
        // get tags from note to save to post 
        if(globalTags.length !== 0) { // check if tags exist  
            const text = data.getPlainText(); 
            const tagNames = globalTags.map(el => el.tag);
            const TAGS_REGEX = new RegExp(tagNames.join("|"), "gi"); // create regex to search for names 
    
                while ((tag = TAGS_REGEX.exec(text)) !== null) {
                    console.log(tag[0]);
                    let tagObj = globalTags.find(obj => obj.tag === tag[0]);
                    console.log(tagObj);
                    tagArr.push(tagObj);
                }
        }

        const { user, house, room, tags, comment } = formValues;
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
                    tags: [...tags, ...tagArr],
                    comment
                }
            }).then(res => {
                //console.log(res);
                history.push(`home/${room}`); 
            })
            } catch(err) {
                console.log(err)
            }
        };

    return {
        handleLinkSubmit,
        handleNoteSubmit
    }
}
