import React from 'react'; 
import InboxPreview from '../components/posts/InboxPreview';
import { convertFromRaw } from 'draft-js';
import Paginate from '../atoms/Paginate';

export default function Inbox(props) {
    const { threads, page } = props;

    const pg = page.currentPage; 

    //loop through the page OR the 0 position of array (no pg)
    return(
        <div className="inbox">
           {(threads && threads.length !== 0) 
                ? <div>
                   { threads[pg - 1 || 0].map((post, i)=> { 
                    const contentState = convertFromRaw(JSON.parse(post.content));
                    const plaintext = contentState.getPlainText();
                    return ( 
                        <InboxPreview post={post} plaintext={plaintext} key={i}
                                    handleLibraryBookDelete={props.handleLibraryBookDelete}
                        />
                    )
                    })}
                    <Paginate {...props}/>
                </div>
                : <div>No threads</div>
            }
        </div>
    )
}
