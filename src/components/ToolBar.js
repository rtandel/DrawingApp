import React, { useEffect, useReducer, useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";


const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;


& .increment_decrement {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  justify-content: space-between;

}


`;

const initialState = {
  strokeColor: '#000000',
  lineWidth: 5,
  eraser: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {...state, lineWidth: state.lineWidth + 1};
    case 'decrement':
      return {...state, lineWidth: state.lineWidth - 1};
    case 'setStrokeColor':
      return {...state, eraser: false, strokeColor: action.color}
    case 'setEraser':
      return {...state, eraser: !state.eraser}
    default:
      throw new Error();
  }
}


export default function ToolBar({ setEditorValues }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setEditorValues(state);
  }, [state])


  return (
    <ToolbarWrapper>
  
        <SketchPicker
        color={state.strokeColor}
        onChangeComplete={(e) => {
          console.log(e);

          dispatch({type: 'setStrokeColor', color: e.rgb })
        }} /> 


      <div className="increment_decrement">
        <button onClick={() => dispatch({type: 'decrement' })}>
          {'<'}
        </button>
        <p>Line Width: {state.lineWidth}</p>
        <button onClick={() => dispatch({type: 'increment' })}>
          {'>'}
        </button>
      </div>

      <button onClick={() => dispatch({type: 'setEraser'})}>
        { state.eraser ? 'Disable Eraser' : 'Enable Eraser'}
      </button>

    </ToolbarWrapper>
  );
}
