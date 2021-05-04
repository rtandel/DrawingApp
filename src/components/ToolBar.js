import React, { useEffect, useReducer, useState } from "react";
import { SketchPicker } from "react-color";
import styled from "styled-components";


const ToolbarWrapper = styled.div`
& button {
border-style:inset;}
`;

const initialState = {
  strokeColor: '#000000',
  lineWidth: 5
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {lineWidth: state.lineWidth + 1, strokeColor: state.strokeColor};
    case 'decrement':
      return {lineWidth: state.lineWidth - 1, strokeColor: state.strokeColor};
    case 'setStrokeColor':
      console.log("We made it")
      return {strokeColor: action.color, lineWidth: state.lineWidth}
    default:
      throw new Error();
  }
}


export default function ToolBar({ setEditorValues }) {
  const [show, setShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setEditorValues(state);
  }, [state])


  return (
    <ToolbarWrapper>
      {show ? 
        <SketchPicker
        color={state.strokeColor}
        onChangeComplete={(e) => {
          console.log(e);
          dispatch({type: 'setStrokeColor', color: e.rgb })
        }}
        
      /> 
      : 
      null}

      <button onClick={(e) => {
       
        setShow(!show);
      }}>Choose Color</button>

      <button onClick={() => dispatch({type: 'decrement' })}>-</button>
      <p>{state.lineWidth}</p>
      <button onClick={() => dispatch({type: 'increment' })}>+</button>


      <button>Hello</button>

      <button>Hello</button>
      <button>Hello</button>
      <button>Hello</button>
      <button>Hello</button>
    </ToolbarWrapper>
  );
}
