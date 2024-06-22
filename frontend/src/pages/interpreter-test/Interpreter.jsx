import React, { useEffect, useRef, useState } from 'react'

const Interpreter = () => {

    const [html, setHtml] = useState('');
  const divRef = useRef(null);

  const getStyledText = (text) => {
    return text.replace(/(print)|(\()|(\))|("[^"]*")/g, (match) => {
      if (match === 'print') return `<span style="color: yellow;">${match}</span>`;
      if (match === '(' || match === ')') return `<span style="color: white;">${match}</span>`;
      if (match.startsWith('"')) return `<span style="color: green;">${match}</span>`;
      return match;
    });
  };

  const handleInput = (e) => {
    const text = e.target.innerText;
    setHtml(text);
  };


    useEffect(() => {
        if (divRef.current) {
            const caretPosition = getCaretPosition(divRef.current);
            divRef.current.innerHTML = getStyledText(html);
            setCaretPosition(divRef.current, caretPosition);
        }
    }, [html]);

      // Helper function to get the caret position
  const getCaretPosition = (el) => {
    let caretOffset = 0;
    const doc = el.ownerDocument || el.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  };

  // Helper function to set the caret position
  const setCaretPosition = (el, offset) => {
    const doc = el.ownerDocument || el.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = doc.createRange();
      let charCount = 0;
      const traverseNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeTextLength = node.textContent.length;
          if (charCount + nodeTextLength >= offset) {
            range.setStart(node, offset - charCount);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
          } else {
            charCount += nodeTextLength;
          }
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            if (traverseNodes(node.childNodes[i])) {
              return true;
            }
          }
        }
        return false;
      };
      traverseNodes(el);
    }
  };





    return (
        <div
        ref={divRef}
        className="editable-div"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}>

        </div>
    )
}

export default Interpreter