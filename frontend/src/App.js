import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Sidebar from './components/Sidebar';
import SidebarRight from './components/SidebarRight';
import DisplayArea from './components/DisplayArea';
import LandingPage from './components/LandingPage';
import { uploadBibFile, fetchAllBibEntries, fetchBibEntry, deleteBibEntry, deleteAllBibEntries, getBibEntryURL, getBibEntrySummary } from './services/api';
import { getBibEntryCategorization, getBibEntryChart, getBibEntryComparison } from './services/api';
import { BASE_URL, uploadPaper, fetchPaperList, fetchDocument } from './services/api';
import { fetchPaperContent, getPaperURL, fetchPaperSummary, fetchPaperChart, comparePapers } from './services/api';

function App() {
    const [bibs, setBibs] = useState([]);
    const [selectedBibs, setSelectedBibs] = useState([]);
    const [content, setContent] = useState('');
    const [fileType, setFileType] = useState(''); // 新增：文件类型状态
    const [isLoading, setIsLoading] = useState(false);
    const [isLandingPage, setisLandingPage] = useState(true);

    useEffect(() => {
        fetchAllBibEntries()
            .then(response => {
                setBibs(response.data);  // 设置文件列表
                console.log("fetchAllBibEntries: ", response.data);
                if(bibs.length > 0) setisLandingPage(false);
                else setisLandingPage(true);
            })
            .catch(error => {
                console.error("Error fetching the file list:", error);
            });
    }, []);

    
    const handleUpload = (file) => {
        console.log("handleUpload...");
        uploadBibFile(file).then(response => {
            console.log("response.data: ", response.data.bibs);
            setBibs(response.data.bibs);
            setContent(`You have uploaded ${response.data.bibs.length} paper(s) in total. \n`);
            setFileType('html'); setisLandingPage(false);
        });
    };

    const handlePaperSelect = (paperName, isMultiSelect = false) => {
        console.log("handlePaperSelect...");
        if (isMultiSelect) {
            if (selectedBibs.includes(paperName)) {
                // 如果已选中，则取消选择
                setSelectedBibs(prevSelectedPapers => prevSelectedPapers.filter(p => p !== paperName));
            } else {
                // 否则，添加到选择的论文数组中
                setSelectedBibs(prevSelectedPapers => [...prevSelectedPapers, paperName]);
            }
        } else {
            // 单选逻辑：只选中当前点击的论文
            setSelectedBibs([paperName]);
        }
    };

    const handleHowToUse = () => {
        fetchDocument("how_to_use.md").then(response => {
            setContent(response.data);
            setFileType('md'); // 设置文件类型为Markdown
            setisLandingPage(false);
        });
    };

    const getBibEntryString = (entry) => {
        // 获取对象的所有键
        const keys = Object.keys(entry).reverse();
    
        // 构建一个字符串来显示所有键值对
        let detailHTMLString = '';
        keys.forEach(key => {
            detailHTMLString += `<strong>${key}</strong>: ${entry[key]}<br/><br/>`;
        });
        return detailHTMLString;
    }

    const handleCheckDetail = () => {
        console.log("handleCheckDetail...");
        fetchBibEntry(selectedBibs[0].ID)
            .then(response => {
                console.log("response.data", response.data);
    
                // 设置详细信息状态为构建的字符串
                setContent(getBibEntryString(response.data));
                setFileType('html');
            })
            .catch(error => {
                console.error("Error fetching bib detail:", error);
            });
    };

    const handleReadPaper = () => {
        console.log("handleReadPaper...");
        let bib = selectedBibs[0];
        getBibEntryURL(bib.ID).then(response => {
            console.log("response.data: ", response.data.url);
            // 在新标签页中打开URL
            window.open(response.data.url, '_blank');
            setContent(`Now you are reading this paper: <strong>\"${bib.title}\"</strong>. \n`);
            setFileType('html');
        });
    };

    const handleSummaryEntry = () => {
        console.log("handleSummaryEntry...");
        setIsLoading(true);
        let bib = selectedBibs[0];
        getBibEntrySummary(bib.ID).then(response => {
            console.log("response.data: ", response.data.summary);
            let detailHtmlString = '';
            detailHtmlString += `<br><br><br><br>`
            detailHtmlString += `<h2>Summary for \"${bib.title}\": </h2><br><br><br> ${response.data.summary }`
            detailHtmlString += `<br><br><br><br>`
            detailHtmlString += `<strong>Keywords: </strong><br><br><br>\"${bib.keywords}\"`
            setContent(detailHtmlString);
            setFileType('html'); setIsLoading(false);
        });
        
    }

    const handleDeleteEntry = () => {
        console.log("handleDeleteEntry...");
        let bib = selectedBibs[0];
        deleteBibEntry(bib.ID).then(response => {
            console.log("response.data: ", response.data.bibs);
            setBibs(response.data.bibs);
            setSelectedBibs([]);
            setContent(`Now this paper <strong>\"${bib.title}\"</strong> is deleted. \n`);
            setFileType('html');
        });
    }

    const handleReset = () => {
        console.log("handleReset...");
        deleteAllBibEntries().then(response => {
            console.log("response.message: " + response.message);
        });
        setBibs([]); 
        setSelectedBibs([]);
        setFileType(''); setisLandingPage(true);
    };
    

    const handleCategorizeThemes = () => {
        console.log("handleCategorizeThemes...");
        setIsLoading(true);
        getBibEntryCategorization(selectedBibs).then(response => {
            console.log("response.data: ", response.data.result);
            let detailMdString = '';
            detailMdString += `<br><br><br><br>`
            selectedBibs.forEach((entry, idx) => {
                detailMdString += `**Paper ${idx}: ${entry.title}**\n\n`;
            });
            detailMdString += '**Categorization Result:** \n\n ';
            detailMdString += `${response.data.result} \n`;
            setContent(detailMdString);
            console.log(detailMdString);
            setFileType('html'); setIsLoading(false);
        });
        
    }

    const handleComparePapers = () => {
        console.log("handleComparePapers...");
        setIsLoading(true);
        getBibEntryComparison(selectedBibs).then(response => {
            console.log("response.data: ", response.data.result);
            let detailMdString = '';
            selectedBibs.forEach((entry, idx) => {
                detailMdString += `**Paper ${idx}: ${entry.title}**\n\n`;
            });
            detailMdString += '**Comparison Result:** \n\n ';
            detailMdString += `${response.data.result} \n`;
            setContent(detailMdString);
            setFileType('html'); setIsLoading(false);
        });
        
    };
    
    const handleGenerateChart = () => {
        console.log("handleGenerateChart...");
        setIsLoading(true);
        getBibEntryChart(selectedBibs).then(response => {
            console.log("response.data: ", response.data.image_url);
            let full_image_url = BASE_URL+"/"+response.data.image_url.replace(/\\/g, '/');
            console.log("full_image_url: ", full_image_url);
            let detailHTMLString = `<img src="${full_image_url}" alt="Generated Chart" />`;
            setContent(detailHTMLString);
            setFileType('html');
            setIsLoading(false);
        });
        
    };

    const handleSwitchToUpload = () => {
        console.log("handleSwitchToUpload...");
        setSelectedBibs([]);
        setFileType('');
        if(bibs.length > 0) setisLandingPage(false);
        else setisLandingPage(true);
    };
    

    
    return (
        <div>
            <Navbar 
                onHowToUse={handleHowToUse}
                onCheckDetail={handleCheckDetail}
                onReadPaper={handleReadPaper}
                onGenerateSummary={handleSummaryEntry}
                onDeleteEntry={handleDeleteEntry}
                onReset={handleReset}
                onUpload={handleSwitchToUpload}
                onCategorize={handleCategorizeThemes}
                onCompare={handleComparePapers}
                onGenerateChart={handleGenerateChart}
                selectedPapers={selectedBibs}
                papers={bibs}
            />

            <div className="container">
                {isLoading==true? <Loading/>: 
                <>
                    {isLandingPage == true? <LandingPage onUpload={handleUpload}/>:
                    <>
                    <Sidebar 
                        papers={bibs} 
                        onPaperSelect={handlePaperSelect} 
                        selectedPapers={selectedBibs} 
                    />
                    <DisplayArea 
                        onUpload={handleUpload}
                        content={content} 
                        fileType={fileType} 
                    />
                    </>}
                    {/* <SidebarRight selectedPapers={selectedBibs}/> */}
                </>}
            </div>
        </div>
    );
}

export default App;