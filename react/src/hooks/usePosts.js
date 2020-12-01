import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { Editor, EditorState, convertFromRaw } from 'draft-js';


export default function usePosts(room) {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState(null);
    const [loading, isLoading] = useState(true);
 
    //get house posts by room 
    useEffect(() => {
        console.log('i was called');
        try {
            axios({
                method: 'GET',
                url: `/posts/h/${user.house._id}/${room}` 
            }).then(res => {
                //console.log(res.data.data.results);
                setPosts(res.data.data.results);
                isLoading(false);
            })
        } catch(err) {
            console.log(err)
        }
    }, [room]); 
    
    const displayPostBody = (post) => {
        let editorState; 

        if(post.type ==='note') {
            const contentState = convertFromRaw(JSON.parse(post.content));
             editorState = EditorState.createWithContent(contentState); 
            return ( <div className="post__body__note">
                        <Editor editorState={editorState} readOnly={true} />
                        <span className="post__body__fade"></span>   
                    </div>            
            )
        }
        if(post.type === 'link') {
            return <div> Link </div>
        }
    }

    return {
        posts,
        loading,
        displayPostBody
    }
}