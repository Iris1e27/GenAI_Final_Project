import React from 'react';
import ReactMarkdown from 'react-markdown';
import PDFDisplay from './PDFDisplay';
import GooglePDFViewer from './GooglePDFViewer';

function DisplayArea({ content, fileType }) {
    console.log("fileType:"+fileType);
    if (fileType === 'md') {
        return (
            <div className="display-area">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    } else if (fileType === 'pdf') {
        return (
            <div className="display-area">
                {/* <PDFDisplay fileUrl={content} /> */}
                <GooglePDFViewer fileURL={content} />

            </div>
        );
    } else {
        return (
            <div className="display-area">
                {content}
            </div>
        );
    }
}


export default DisplayArea;
