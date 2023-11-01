import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DisplayArea from './components/DisplayArea';
import { uploadPaper, fetchPaperList, fetchDocument } from './services/api';
import { fetchPaperContent, getPaperURL, fetchPaperSummary, fetchPaperChart, comparePapers } from './services/api';

function App() {
    const [papers, setPapers] = useState([]);
    const [selectedPapers, setSelectedPapers] = useState([]);
    const [content, setContent] = useState('');
    const [fileType, setFileType] = useState(''); // 新增：文件类型状态

    useEffect(() => {
        fetchPaperList()
            .then(response => {
                setPapers(response.data);  // 设置文件列表
            })
            .catch(error => {
                console.error("Error fetching the file list:", error);
            });
    }, []);

    const handleHowToUse = () => {
        fetchDocument("how_to_use.md").then(response => {
            setContent(response.data);
            setFileType('md'); // 设置文件类型为Markdown
        });
    };

    const handleReadPaper = () => {
        const paperURL = getPaperURL(selectedPapers[0]); // 假设只选择了一个论文
        setContent(paperURL);
        console.log("Paper URL: " + paperURL);
        setFileType('pdf');
    };

    // const handleReadPaper = () => {
    //     if (selectedPapers.length === 1) {
    //         const paperName = selectedPapers[0];
    //         fetchPaperContent(paperName).then(response => {
    //             setContent(response.data);
    //             setFileType('pdf'); // 假设fetchPaperContent返回PDF内容
    //         });
    //     }
    // };
    
    
    const handleUpload = (file) => {
        uploadPaper(file).then(response => {
            setPapers(prevPapers => [...prevPapers, response.data.filename]);  // 更新文件列表
        });
    };

    const handlePaperSelect = (paperName, isMultiSelect = false) => {
        if (isMultiSelect) {
            if (selectedPapers.includes(paperName)) {
                // 如果已选中，则取消选择
                setSelectedPapers(prevSelectedPapers => prevSelectedPapers.filter(p => p !== paperName));
            } else {
                // 否则，添加到选择的论文数组中
                setSelectedPapers(prevSelectedPapers => [...prevSelectedPapers, paperName]);
            }
        } else {
            // 单选逻辑：只选中当前点击的论文
            setSelectedPapers([paperName]);
        }
    };

    return (
        <div>
            <Navbar 
                onHowToUse={handleHowToUse}
                onReadPaper={handleReadPaper}
                onGenerateSummary={fetchPaperSummary}
                onGenerateChart={fetchPaperChart}
                onCompare={comparePapers}
                selectedPapers={selectedPapers}
            />

            <div className="container">
                <Sidebar 
                    papers={papers} 
                    onUpload={handleUpload} 
                    onPaperSelect={handlePaperSelect} 
                    selectedPapers={selectedPapers} 
                />
                <DisplayArea content={content} fileType={fileType} />
            </div>
        </div>
    );
}

export default App;
