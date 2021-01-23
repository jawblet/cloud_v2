import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../sections/Header'
import ThreadHeader from '../sections/posts/ThreadHeader';
import ThreadComments from '../sections/posts/ThreadComments';
import { Editor } from 'draft-js';
import useThread from '../hooks/threads/useThread';
import useShowEditor from '../hooks/threads/useShowEditor';


const Thread = () => {
    const params = useParams();
    const id = params.threadId;
    const { loading, metadata, editorState } = useThread(id); 
    const { showEdit, setEditor } = useShowEditor();

    return (
        <div className="page">
            <ThreadHeader setEditor={setEditor} showEdit={showEdit}/>
           {!loading && 
            <div className="thread">
                <div className="thread__OG">
                    <h3 className="thread__title">{metadata.title}</h3>
                    <div className="thread__metadata">
                        <h4 className="thread__author">{metadata.author}</h4>
                        <h4 className="thread__date">{metadata.date}</h4>
                    </div>
                    <Editor readOnly={true} 
                            editorState={editorState}/> 
                </div> 
                    <ThreadComments id={id} setEditor={setEditor} showEdit={showEdit} thread={metadata.title}/>
            </div>}
        </div>
    );
}
 
export default Thread;

/*
  const location = useLocation();
    const id = location.state; 
    console.log(id);
*/