import { useHistory } from 'react-router-dom';
import axios from 'axios'; 

export default function useSubmit() {
    let history = useHistory();

//handle URL POST 
    const handleLinkSubmit = async (formValues) => {
        const { content, user, house, room, tags, comment } = formValues.values;
        try {
            await axios({
                method: 'POST',
                url: 'posts',
                data: {
                    type: 'link',
                    content,
                    user,
                    house, 
                    room,
                    tags,
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

//handle note POST 
    const handleNoteSubmit = async (formValues, note) => {
        console.log(formValues);
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
                    tags,
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
