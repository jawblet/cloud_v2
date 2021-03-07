import React, { useEffect } from 'react';
import useLayerPosts from '../hooks/layers/useLayerPosts';
import Grid from '../utils/Grid';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

const Archive = () => {

    const { getHousePosts, posts, loading } = useLayerPosts();

    useEffect(() => {
        async function onPageLoad() {
            getHousePosts()
        }
        onPageLoad();
    }, [])

    if(loading) {
        return null; 
    }

    return (
        <div>
            <h3 className="houseTitle">
                Archive
            </h3>
            {posts.docs.map(el => { 
                let content; 
                if(el.type === 'note') {
                    let contentState = convertFromRaw(JSON.parse(el.content));
                    const editorState = EditorState.createWithContent(contentState);
                    content = <Editor editorState={editorState} readOnly={true} />
                } else {
                    content = el.content;
                }
                
                return(
                    <Grid columns="10% 10% 1fr" gap={1}>
                        <div className="archive__col">
                            <h4>
                                {el.date}
                            </h4>
                        </div>
                        <div className="archive__col">
                            <h4>
                                {el.user.username}
                            </h4>
                        </div>
                        <div className="archive__col">
                                {content}
                        </div>
                    </Grid>
                )
            })}
        </div>
    );
}
 
export default Archive;

// date 
// user 
// line 