import React, { useState } from 'react';

function Navbar({ onHowToUse, 
    onCheckDetail, onReadPaper, onGenerateSummary, onDeleteEntry, 
    onGenerateChart, onCompare, selectedPapers }) {

    return (
        <div className="navbar">
            <div className="buttons">
                <button onClick={onHowToUse}>Help</button>

                {selectedPapers.length === 1 && (
                    <>
                        <button onClick={onCheckDetail}>Check Detail</button>
                        <button onClick={onReadPaper}>Read Paper</button>
                        <button onClick={onGenerateSummary}>Generate Summary</button>
                        <button onClick={onDeleteEntry}>Delete Entry</button>
                    </>
                )}
                {selectedPapers.length > 1 && (
                    <>
                        <button onClick={onGenerateChart}>Generate Chart</button>
                        <button onClick={onCompare}>Compare Papers</button>
                    </>
                )}
            </div>
            <div className="product-name">
                Research Hive
            </div>
        </div>
    );
}

export default Navbar;
