import React, { useState } from 'react';

function Navbar({ onHowToUse, 
    onCheckDetail, onReadPaper, onGenerateSummary, onDeleteEntry, 
    onCategorize, onCompare, onGenerateChart, selectedPapers }) {

    return (
        <div className="navbar">
            <div className="buttons">
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
                        <button onClick={onCategorize}>Categorize Themes</button>
                        {/* <button onClick={onCompare}>Compare Papers</button> */}
                        <button onClick={onGenerateChart}>Generate Chart</button>
                    </>
                )}

                <button onClick={onHowToUse}>Help</button>
            </div>
            <div className="product-name">
                Research Hive
            </div>
        </div>
    );
}

export default Navbar;
