import React from 'react';

function GooglePDFViewer({ fileURL }) {
    const googleDocsURL = `https://docs.google.com/gview?url=${fileURL}&embedded=true`;
    console.log("googleDocsURL:"+googleDocsURL);
    return (
        <iframe src={googleDocsURL} width="100%" height="500px"></iframe>
    );
}

export default GooglePDFViewer;
// https://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true