import React, { useState } from 'react';

function Navbar({ onHowToUse, onReadPaper, onGenerateSummary, onGenerateChart, onCompare, selectedPapers }) {

    return (
        <div className="navbar">
            <div className="buttons">
                <button onClick={onHowToUse}>How to use this app</button>

                {selectedPapers.length === 1 && (
                    <>
                        <button onClick={onReadPaper}>Read Paper</button>
                        <button onClick={onGenerateSummary}>Generate Summary</button>
                    </>
                )}
                {selectedPapers.length > 1 && (
                    <>
                        <button onClick={onGenerateChart}>Generate Chart</button>
                        <button onClick={onCompare}>Compare Papers</button>
                    </>
                )}
            </div>
            <div className="product-name">ResearchHive</div>
        </div>
    );
}

export default Navbar;
