import React from 'react'; 
import InboxLink from '../components/posts/InboxLink';
import { convertFromRaw } from 'draft-js';
import Paginate from '../atoms/Paginate';

export default function Inbox(props) {
    const { threads, page, limit } = props;

    const pg = page.currentPage; 
    //loop through the page OR the 0 position of array (no pg)
    return(
        <div className="inbox">
           {(threads && threads.length > 0)
                ? <div> 
                   { threads[pg - 1 || 0].map((post, i)=> { 
                    const contentState = convertFromRaw(JSON.parse(post.content));
                    const plaintext = contentState.getPlainText();
                    return ( 
                            <InboxLink post={post} plaintext={plaintext} key={i}
                                        handleLibraryBookDelete={props.handleLibraryBookDelete}/>
                    )
                    })}
                   <Paginate {...props}/>
                </div>
                : <div className="light">No threads</div>
            }
        </div>
    )
}

/*
{ threads[pg - 1 || 0].map((post, i)=> { 
*/