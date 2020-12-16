import React, { useEffect, useState, useContext } from 'react';
import { VscClose } from 'react-icons/vsc';
import { UserContext } from '../hooks/UserContext';

export default function Comment({ comment, deleteComment }) {
    const { user } = useContext(UserContext);
    const [commentAuthor, setAuthor] = useState('');
    const [isAuthor, checkAuthor] = useState(false);

    useEffect(() => { //set comment author
        if(comment.user.username) {
            setAuthor(comment.user.username)
        } else {
            setAuthor(user.username);
        }
    }, [user, comment]);

    useEffect(() => { //check if comment author is current user --> if so, show delete btn
        if(user.username === commentAuthor) {
            return checkAuthor(true);
        }
    }, [commentAuthor, user]);

    return (
        <div className="comment">
            <div className="comment__body">
                <div className="comment__X"> 
                    {isAuthor && <VscClose data-id={comment._id} className="icon icon__btn icon--small"
                                            onClick={(e) => deleteComment(e)} />}
                </div>
                <h4 className="comment__text">{comment.comment}</h4>
            </div>
            <h6 className="comment__author">{commentAuthor}</h6>
        </div>
    )
}