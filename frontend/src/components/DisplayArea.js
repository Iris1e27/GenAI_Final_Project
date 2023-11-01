import React from 'react';
import ReactMarkdown from 'react-markdown';

function DisplayArea({ content }) {
    return (
        <div className="display-area">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default DisplayArea;
