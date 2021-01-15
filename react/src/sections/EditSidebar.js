import React from 'react';
import useComment from '../hooks/posts/useComment';
import InlineComment from '../components/InlineComment';
import CommentList from '../components/CommentList';
import { VscTrash } from 'react-icons/vsc';
import EditPostTags from '../components/posts/edit/EditPostTags';

export default function EditSidebar({ post, tags, handleDeleteDetail }) { 

    const { data, handleKeyDown, handleChange, deleteComment } = useComment(post._id);

    return(
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
                   <EditPostTags tags={tags}
                   />
                </div>
                <div className="edit__metadata">
                    <CommentList postComments={data.postComments} 
                                deleteComment={deleteComment}
                        />
                </div>
                            <InlineComment 
                                    handleChange={handleChange} 
                                    handleKeyDown={handleKeyDown} 
                                    comment={data.comment}
                            />
                            <VscTrash className="icon icon__btn icon--warning editPost__trash" 
                                        data-id={post._id} onClick={handleDeleteDetail}
                                    />
            </div>
    )
}