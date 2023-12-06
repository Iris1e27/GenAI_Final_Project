import React, { useState, useEffect } from 'react';
import FloatingBox from './FloatingBox';


function LandingPage({ onUpload }) {

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

    return (<>
            <div className='landing-page'>
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
                
                <label className='prompt'>Select 📍</label>
                <div className='detail-text'>Select more than one papers by `ctrl`+`click`👈</div>

                <label className='prompt'>Then 🚀</label>
                <div className='detail-text'> Click given `button` on the navbar👆</div>

                <label className='prompt'>After 📑</label>
                <div className='detail-text'> Click `reset` to clear all papers👆</div>
                </div>
                <FloatingBox text={'Explore papers collection from Zotero!📖'}/>
            </>
        );

}

export default LandingPage;