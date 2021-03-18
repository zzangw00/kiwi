import React from 'react';
import CommentList from '../components/CommentList';
import CommentText from '../components/CommentText';

export default function CommentContainer({ id }) {
    return (
        <>
            <CommentList id={id} />
            <CommentText />
        </>
    );
}
