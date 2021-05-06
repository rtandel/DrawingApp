import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DrawingToolWrapper = styled.div`
  position: absolute;
  z-index: 2;

  &.visible {
    display: block;
  }

  &.invisible {
    display: none;
  }
`;


const DrawingTool = ({ height, width, settings, visible }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = `rgba(${settings.strokeColor.r}, ${settings.strokeColor.g}, ${settings.strokeColor.b}, ${settings.strokeColor.a})`;
    context.lineWidth = settings.lineWidth;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    
    const context = contextRef.current;
    context.strokeStyle = `rgba(${settings.strokeColor.r}, ${settings.strokeColor.g}, ${settings.strokeColor.b}, ${settings.strokeColor.a})`;
    context.lineWidth = settings.lineWidth;

  })




  const beginDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (settings.eraser) {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over'
    }
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);

    contextRef.current.stroke();
  };

  const finishDraw = (e) => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
      <DrawingToolWrapper className={visible ? 'visible' : 'invisible'}>
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={beginDraw}
          onMouseUp={finishDraw}
          onMouseMove={draw}
          onMouseOut={finishDraw}
        ></canvas>
      </DrawingToolWrapper>
  );
};

export default DrawingTool;
