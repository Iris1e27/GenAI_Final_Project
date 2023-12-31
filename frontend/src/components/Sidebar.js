import React, { useState } from 'react';

function Sidebar({ papers, onPaperSelect, selectedPapers }) {
    const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    // const uploadFile = () => {
    //     if (selectedFile) {
    //         onUpload(selectedFile);
    //         setSelectedFile(null);  // Clear the selected file after upload
    //     }
    // };

    const handlePaperClick = (event, paperName) => {
        // 如果 Ctrl 或 Cmd 键被按下，执行多选逻辑
        if (event.ctrlKey || event.metaKey) {
            if (selectedPapers.includes(paperName)) {
                // 如果已选中，则取消选择
                onPaperSelect(paperName, true);  // 注意，我们传递了一个额外的参数
            } else {
                // 否则，添加到选择的论文数组中
                onPaperSelect(paperName, true);  // 注意，我们传递了一个额外的参数
            }
        } else {
            // 如果没有按下 Ctrl 或 Cmd 键，执行单选逻辑
            onPaperSelect(paperName);
        }
    };

    return (
        papers==null ||papers.length==0 ? null :
        <div className="sidebar">
            <div class="sidebar-content">
                {/* <input type="file" accept=".bib" onChange={handleFileChange} />
                <button title="Only accepts BibTex format" onClick={uploadFile}>Upload BibTex</button> */}
                <ul>
                    {papers.map((paper, idx) => (
                        <li key={idx} 
                            onClick={(event) => handlePaperClick(event, paper)} 
                            className={selectedPapers.includes(paper) ? "selected" : ""}
                        >
                            {idx+1} - {paper.title} 
                            <br />
                            <div className="grey-text">{paper.author.replaceAll(" and ", " ")} - {paper.year}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;