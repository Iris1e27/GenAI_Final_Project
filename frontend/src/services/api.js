import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';  // Adjust according to your backend URL

export const BASE_URL = 'http://localhost:8000';

export const uploadPaper = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${BASE_URL}/papers/upload/`, formData);
};

// New function to fetch the list of uploaded papers
export const fetchPaperList = () => {
    return axios.get(`${BASE_URL}/papers/list/`);
};

// Fetch the content of a specific paper by its filename
export const fetchPaperContent = (filename) => {
    return axios.get(`${BASE_URL}/papers/read/${filename}`);
};

export const getPaperURL = (paperName) => {
    return `${BASE_URL}/papers/read/${paperName}`;
};


// Generate and fetch a summary for a specific paper
export const fetchPaperSummary = (filename) => {
    return axios.get(`${BASE_URL}/papers/summary/${filename}`);
};

// Generate and fetch a chart for multiple papers
export const fetchPaperChart = (filenames) => {
    return axios.post(`${BASE_URL}/papers/chart/`, { filenames });
};

// Compare multiple papers and fetch the comparison result
export const comparePapers = (filenames) => {
    return axios.post(`${BASE_URL}/papers/compare/`, { filenames });
};

export const fetchDocument = (docName) => {
    return axios.get(`${BASE_URL}/documents/read/${docName}`);
};

// New API calls for BibTeX entries

// Upload a BibTeX file
export const uploadBibFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`${BASE_URL}/bibs/upload`, formData);
};

// Fetch the list of all BibTeX entries
export const fetchAllBibEntries = () => {
    return axios.get(`${BASE_URL}/bibs/list/all`);
};

// Fetch a single BibTeX entry by citation key
export const fetchBibEntry = (ID) => {
    return axios.get(`${BASE_URL}/bibs/list/${ID}`);
};

// Delete a BibTeX entry by citation key
export const deleteBibEntry = (ID) => {
    return axios.delete(`${BASE_URL}/bibs/delete/${ID}`);
};

export const getBibEntryURL = (ID) => {
    return axios.get(`${BASE_URL}/bibs/read/${ID}`);
};

export const getBibEntrySummary = (ID) => {
    return axios.get(`${BASE_URL}/bibs/summary/${ID}`);
};

export const getBibEntryCategorization = (Bibs) => {
    // 从 Bibs 中提取所有的 ID
    const paper_ids = Bibs.map(bib => bib.ID);
    
    // 发送包含所有 ID 的请求给后端
    return axios.post(`${BASE_URL}/bibs/categorize_themes`, { "paper_ids": paper_ids });
};

export const getBibEntryChart = (Bibs) => {
    // 从 Bibs 中提取所有的 ID
    const paper_ids = Bibs.map(bib => bib.ID);
    
    // 发送包含所有 ID 的请求给后端
    return axios.post(`${BASE_URL}/bibs/generate_chart`, { "paper_ids": paper_ids });
};

export const getBibEntryComparison = (Bibs) => {
    // 从 Bibs 中提取所有的 ID
    const paper_ids = Bibs.map(bib => bib.ID);
    
    // 发送包含所有 ID 的请求给后端
    return axios.post(`${BASE_URL}/bibs/compare_paper`, { "paper_ids": paper_ids });
};



// Add other API calls as needed
