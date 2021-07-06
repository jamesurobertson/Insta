import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
    yTranslate,
    yTranslateRev,
    rotate0,
    rotate45,
    rotate90,
    rotate135,
    inOut,
} from '../../Styles/animations';

const LoadingWrapper = styled.div`
    .positioner {
        position: fixed;
        bottom: -21vh;
        /* top: calc(50% - 20vh); */
        left: calc(50% - 12.5vh);
        z-index: -1;
        width: 40vh;
        height: 40vh;
    }
    opacity: 0;
    animation: ${inOut} 2s linear 0s forwards;
    .positioner2 {
        position: fixed;
        bottom: -21vh;
        left: calc(50% - 12.5vh);
        z-index: 12;
        width: 40vh;
        height: 40vh;
    }

    .box {
        position: absolute;
        height: 40vh;
        width: 10vh;
        left: calc(50% - 12.5vh);
    }

    .color {
        height: 10vh;
        width: 10vh;
        opacity: 0.7;
        border-radius: 50%;
        border: black solid 2pt;
    }

    .for-color {
        animation: ${yTranslate} 2s alternate infinite;
    }
    .rev-color {
        animation: ${yTranslateRev} 2s alternate infinite;
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
    @media screen and (max-width: 475px) {
        .positioner {
            bottom: calc(-21vh + 54px);
        }
    }
`;

const Loading = ({ load, positioner }) => {
    let [onScreen, setOnScreen] = useState(true);

    useEffect(() => {
        setOnScreen(true);
        if (load) return;
        let count = 2;
        const clear = setInterval(() => {
            count -= 1;
            if (count <= 0) {
                clearInterval(clear);
                setOnScreen(false);
            }

            return () => clearInterval(clear);
        }, 1000);
    }, [load]);

    if (!onScreen) return null;
    return (
        <LoadingWrapper style={positioner}>
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
