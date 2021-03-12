import React, { useEffect } from 'react';
import useLayerPosts from '../hooks/layers/useLayerPosts';
import Grid from '../utils/Grid';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import Paginate from '../atoms/Paginate';

const Archive = () => {
    const { getHousePosts, posts, loading } = useLayerPosts();

    useEffect(() => {
        async function onPageLoad() {
            getHousePosts(1)
        }
        onPageLoad();
    }, []);

    async function handlePageCounter(page) {
        await getHousePosts(page);
    }

    if(loading) {
        return null; 
    }
    return (
        <div>
            <h2 className="houseTitle">
                Archive
            </h2>
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
                    <span key={el._id}>
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
                    <Paginate pageState={posts}
                            handlePageCounter={handlePageCounter}
                            />
                    </span>
                )
            })}
        </div>
    );
}
 
export default Archive;

// date 
// user 
// line 