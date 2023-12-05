import React, { useState } from 'react';

function SidebarRight({ selectedPapers }) {

    return (
        selectedPapers==null ||selectedPapers.length==0 ? null :
        <div className="sidebar" style={{left: '75%'}}>
            <div class="sidebar-content">
                <ul>
                    {selectedPapers.map((paper, idx) => (
                        <li key={idx} >
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

export default SidebarRight;