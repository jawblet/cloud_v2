import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import TagPreview from '../atoms/TagPreview';
import { VscClose } from 'react-icons/vsc';
import usePosts from '../hooks/usePosts';

export default function Edit( {editPost} ) {
    const params = useParams();
    const location = useLocation();
    const post = location.state.post;

    const { displayPostBody } = usePosts();
   
    return(
        <div className="modal__background">
            <div className="edit">
                <Link to={`/home/${params.room}`}>
                    <div className="modal__X" onClick={editPost}>
                        <VscClose className="icon icon__btn"/>
                    </div>
                </Link>
                <div className="edit__content">
                    <div className="edit__sidebar">
                        <div className="edit__metadata">
                            <h4 className="lightest">created by</h4>
                            <h4 className="light">
                                {post.user.username}
                            </h4>
                        </div>
                        <div className="edit__metadata">
                            <h4 className="lightest">created on</h4>
                            <h4 className="light">
                                {post.date}
                            </h4>
                        </div>
                        <div className="edit__metadata">
                        {post.tags.length > 0 
                            ? <>
                            <h4 className="lightest">tags</h4>
                               { post.tags.map(tag => { 
                                   return ( 
                                    <TagPreview tag={tag} key={tag._id}/> 
                                    ) 
                                })}
                            </>
                            : <h4 className="lightest">no tags</h4>

                            }
                        </div>
                        <div className="edit__metadata">
                        {post.comment !== ''
                            ? <>
                                <h4 className="lightest">comments</h4>
                                <h4 className="light">{post.comment}</h4>
                            </>
                            : <h4 className="lightest">no comments</h4>}
                        </div>
                    </div>
                    <div className="edit__body">
                    <h4 className="lightest">{post.type}:</h4>
                    {displayPostBody(post)}
                    </div>
     
                </div>
            </div>
        </div>
    )
}

