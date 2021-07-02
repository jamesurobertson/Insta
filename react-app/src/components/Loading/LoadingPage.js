import React from 'react';
import styled from 'styled-components';

import {
    yTranslate2,
    yTranslateRev2,
    rotate0,
    rotate45,
    rotate90,
    rotate135,
} from '../../Styles/animations';

const LoadingWrapper = styled.div`
    .positioner {
        position: absolute;
        bottom: 100vh;
        left: calc(50% - 20vh);
        z-index: -2;
        width: 40vh;
        height: 40vh;
    }

    .box {
        position: absolute;
        height: 100vh;
        width: 25vh;
        left: calc(50% - 12.5vh);
    }

    .color {
        height: 25vh;
        width: 25vh;
        opacity: 0.5;
        border-radius: 50%;
    }

    .for-color {
        animation: ${yTranslate2} 2s alternate infinite;
    }
    .rev-color {
        animation: ${yTranslateRev2} 2s alternate infinite;
    }

    .red-box {
        animation: ${rotate0} 4s infinite;
    }
    .red {
        background-color: red;
    }

    .yellow-box {
        animation: ${rotate45} 4s infinite;
    }
    .yellow {
        background-color: yellow;
    }

    .green-box {
        animation: ${rotate90} 4s infinite;
    }
    .green {
        background-color: green;
    }

    .blue-box {
        animation: ${rotate135} 4s infinite;
    }
    .blue {
        background-color: blue;
    }
    .red2-box {
        animation: ${rotate0} 4s infinite;
    }
    .red2 {
        background-color: red;
    }

    .yellow2-box {
        animation: ${rotate45} 4s infinite;
    }
    .yellow2 {
        background-color: yellow;
    }

    .green2-box {
        animation: ${rotate90} 4s infinite;
    }
    .green2 {
        background-color: green;
    }

    .blue2-box {
        animation: ${rotate135} 4s infinite;
    }
    .blue2 {
        background-color: blue;
    }
`;

const Loading = (props) => {
    return (
        <LoadingWrapper style={props.positioner}>
            <div className='positioner'>
                <div className='box red-box'>
                    <div className='color for-color red'></div>
                </div>
                <div className='box yellow-box'>
                    <div className='color for-color yellow'></div>
                </div>
                <div className='box green-box'>
                    <div className='color for-color green'></div>
                </div>
                <div className='box blue-box'>
                    <div className='color for-color blue'></div>
                </div>
                <div className='box red2-box'>
                    <div className='color rev-color red2'></div>
                </div>
                <div className='box yellow2-box'>
                    <div className='color  rev-color yellow2'></div>
                </div>
                <div className='box green2-box'>
                    <div className='color  rev-color green2'></div>
                </div>
                <div className='box blue2-box'>
                    <div className='color  rev-color blue2'></div>
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default Loading;
