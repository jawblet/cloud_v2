import React from 'react';
import Comment from './Comment';

export default function CommentList({ postComments, deleteComment }) {
    return(
        <>
        {postComments && postComments.length !== 0 
            ? 
            <div className="commentList">
            <h4 className="lightest">comments</h4>
            {postComments.map(comment => {
                return (
                    <Comment comment={comment} key={comment._id} deleteComment={deleteComment}/>
                )
                }) }
            </div>
            : <h4 className="lightest">no comments</h4>
        }
        </>
    )
}