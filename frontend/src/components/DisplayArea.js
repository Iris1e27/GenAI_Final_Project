import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import PDFDisplay from './PDFDisplay';
import GooglePDFViewer from './GooglePDFViewer';

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
                <label className='prompt'>Upload 📂</label>
                <div className='upload-area'>
                <input
                    type="file"
                    accept=".bib"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // 隐藏默认的文件选择按钮
                    id="fileInput" // 添加一个ID以便在下面的标签中引用
                />
                <label htmlFor="fileInput" className="custom-file-input"  style={{ whiteSpace: 'pre-line' }}>
                Click 👉Here👈 to Select
                </label>
                <div style={{ border: '10px solid transparent' }}></div> {/* 添加一行空行 */}
                <button
                    title="Only accepts BibTex format"
                    onClick={uploadFile}
                    className="custom-upload-button"
                >
                Upload BibTex
                </button>
                </div>
                <br></br>
                
                <label className='prompt'>Select 📍</label>
                <div className='detail-text'>Select one paper by `click`</div>
                <div className='detail-text'>Select more than one papers by `ctrl`+`click`</div>

                <label className='prompt'>Then 🤖</label>
                <div className='detail-text'> Click given `button` on the navbar</div>

                <label className='prompt'>After 📑</label>
                <div className='detail-text'> Click `reset` to clear all papers</div>
                <div className='detail-text'> Click `upload` to upload more papers</div>
            </div>
        );
    }
}


export default DisplayArea;
