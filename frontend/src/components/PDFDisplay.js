import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFDisplay({ fileUrl }) {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    ),
                )}
            </Document>
        </div>
    );
}

export default PDFDisplay;
