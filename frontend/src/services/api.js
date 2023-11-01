import axios from 'axios';

const BASE_URL = 'http://localhost:8000';  // Adjust according to your backend URL

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


// Add other API calls as needed
