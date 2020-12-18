import React from 'react';
import InboxPreview from '../components/posts/InboxPreview';
import { convertFromRaw } from 'draft-js';

export default function Inbox(props) {
    const { threads } = props;
    console.log(threads);

    return(
        <div className="inbox">
           {(threads && threads.length !== 0) 
                ? <div>
                   { threads.map((post, i)=> {
                    //put into plaintext for now... 
                    const contentState = convertFromRaw(JSON.parse(post.content));
                    const plaintext = contentState.getPlainText();
                    return ( 
                        <InboxPreview post={post} plaintext={plaintext} key={i}
                                    handleLibraryBookDelete={props.handleLibraryBookDelete}
                        />
                    )
                })}
                </div>
                : <div>No threads</div>
            }
        </div>
    )
}
