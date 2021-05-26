import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import DrawingTool from "./DrawingTool";
import ToolBar from "./ToolBar";
import styled from "styled-components";
import "./styles.css";

const PdfWrapper = styled.div`
  z-index: 1;
  display: flex;
  height: 100%;

  color: #fff;


  .react-pdf__Page__annotations {
    display: none;
  }

  .react-pdf__Document,
  .react-pdf__Page__canvas {
    width: 789px !important;
    height: 792px !important;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;

  & button {
    color: #9F514A;
    padding: 10px;
  }
`;

const DocumentWrapper = styled.div`
`;

let initialHeight = 250;
let initialWidth = 250;

export default function MyApp({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [canvasArray, setCanvasArray] = useState([]);
  const [height, setHeight] = useState(initialHeight);
  const [width, setWidth] = useState(initialWidth);
  const [editorSettings, setEditorSettings] = useState({
    strokeColor: "#000000",
    lineWidth: 5,
  });
  const ref = useRef();

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
  }, [editorSettings]);

  function onDocumentLoadSuccess({ numPages }) {
    generateCanvas(numPages);
    setNumPages(numPages);
  }

  function nextPage() {
    if (pageNumber === numPages) {
      setPageNumber(1);
    } else {
      setPageNumber(pageNumber + 1);
    }
  }

  function previousPage() {
    if (pageNumber === 1) {
      setPageNumber(numPages);
    } else {
      setPageNumber(pageNumber - 1);
    }
  }

  function generateCanvas(pages) {
    let array = [];
    for (let i = 0; i < pages; i++) {
      array.push(i + 1);
    }
    setCanvasArray([...array]);
  }

  function setEditorValues(state) {
    setEditorSettings(state);
  }

  return (
    <PdfWrapper id="hello">
      {canvasArray.map((value, key) => {
        return (
          <DrawingTool
            key={key}
            height={ref.current.clientWidth}
            width={ref.current.clientWidth}
            settings={editorSettings}
            visible={value == pageNumber ? "visible" : null}
          />
        );
      })}
      <DocumentWrapper ref={ref}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </DocumentWrapper>
      <ControlsWrapper>
        <div className="increment_decrement">
          <button onClick={previousPage}>
            {'<'}
          </button>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button onClick={nextPage}>
            {'>'}
          </button>
        </div>
        <ToolBar setEditorValues={setEditorValues} />
      </ControlsWrapper>
    </PdfWrapper>
  );
}
