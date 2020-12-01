import { useState } from 'react'; 

export default function useEditPost() {
    const [edit, showEdit] = useState(false);

    const editPost = (note) => {
        showEdit(!edit);
    }

    return {
        editPost,
        edit
    }
}