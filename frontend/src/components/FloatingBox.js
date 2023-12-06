import React, { useState } from 'react';

function FloatingBox({text}) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible && (
        <div id="floating-box">
          
          {text}
          {/* 悬浮框的内容 */}
          {/* <button onClick={() => setIsVisible(false)}>Close</button> */}
        </div>
      )}
      {/* <button onClick={() => setIsVisible(true)}>Show Floating Box</button> */}
    </>
  );
}

export default FloatingBox;