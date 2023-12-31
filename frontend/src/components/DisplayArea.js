import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import PDFDisplay from './PDFDisplay';
import GooglePDFViewer from './GooglePDFViewer';
import FloatingBox from './FloatingBox';

function DisplayArea({ onUpload, content, fileType }) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            setSelectedFile(null);  // Clear the selected file after upload
        }
    };

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
    } else if (fileType === 'html') {
        
        return (
            <div className="display-area" dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        );
    } else {
        return (
            <div className="display-area">
                <br /><br />
                <label className='prompt'>Upload 📂</label>
                <div className='detail-text'>
                    <input
                        type="file"
                        accept=".bib"
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // 隐藏默认的文件选择按钮
                        id="fileInput" // 添加一个ID以便在下面的标签中引用
                    />
                    <label htmlFor="fileInput" className="custom-file-input"  style={{ whiteSpace: 'pre-line' }}>
                    1. Click 👉Here👈 to Select `BibTex`
                    </label>
                </div>
                <div className='detail-text'>
                    <button
                        title="Only accepts BibTex format"
                        onClick={uploadFile}
                        className="custom-upload-button"
                        style={{ display: 'none' }} // 隐藏默认的文件选择按钮
                        id="fileButton" // 添加一个ID以便在下面的标签中引用
                    >
                    Upload BibTex
                    </button>
                    <label htmlFor="fileButton" className="custom-file-input"  style={{ whiteSpace: 'pre-line' }}>
                    2. Click 👉Here👈 to Upload
                    </label>
                </div>
                <br></br>
                <FloatingBox text={'Upload more papers Now!👈'}/>
            </div>
        );
    }
}


export default DisplayArea;
