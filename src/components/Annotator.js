import React from 'react';
import styled from 'styled-components';

const AnnotatorWrapper = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background-color: black;
    opacity: .5;
    z-index: 2;
`;

export default function Annotator({ nextPage, previousPage}) {

    return (
        <AnnotatorWrapper>
           <canvas>

           </canvas>
        </AnnotatorWrapper>
    )
}