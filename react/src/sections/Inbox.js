import React from 'react'; 
import InboxLink from '../components/posts/InboxLink';
import { convertFromRaw } from 'draft-js';
import Paginate from '../atoms/Paginate';

export default function Inbox(props) {
    const { threads } = props;
    
    return(
        <div className="inbox"> 
           {(threads && threads.length > 0)
                ? <div> 
                   { threads.map((post, i)=> { 
                    const contentState = convertFromRaw(JSON.parse(post.content));
                    const plaintext = contentState.getPlainText();
                        return ( 
                                <InboxLink key={i} 
                                        post={post} plaintext={plaintext} 
                                        props={props} />
                        )
                    })}
                   <Paginate {...props}/>
                </div>
                : <div className="light">No threads</div>
            }
        </div>
    )
}
