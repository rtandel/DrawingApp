import React, { useState } from "react";
import logo from "./logo.svg";
import PDF from "./components/PDF";
import styled from "styled-components";


const Wrapper = styled.div`
  height: auto;
  width: 85%;
  margin: 0 auto;
  text-align: center;
  
`;

function App() {
  const [file, setFile] = useState('/canon.pdf');
  const [totalPages, setTotalPages] = useState(1);


  function setTotal(e) {
    console.log(e)
    setTotalPages(e);
  }

  return (
    <Wrapper className="App">
      
      <PDF file={file} />
    </Wrapper>
  );
}

export default App;
