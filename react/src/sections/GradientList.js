import React from 'react';
import Gradient from '../atoms/Gradient';

export default function GradientList({ posts }) {
    return(
        posts.map(post => {
            return (
                <div key={post._id}>
                    <Gradient post={post}/>
                </div>
            )
        })
    )}