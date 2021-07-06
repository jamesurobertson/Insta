import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);

    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const inOut = keyframes`
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

export const yTranslate = keyframes`
    0% {
       transform: translateY(15vh);
    }
    100% {
        transform: translateY(10.2vh);
    }
`;

export const yTranslateRev = keyframes`
    0% {
       transform: translateY(15vh);
    }
    100% {
        transform: translateY(20vh);
    }
`;
export const yTranslate2 = keyframes`
    0% {
       transform: translateY(37.5vh);
    }
    100% {
        transform: translateY(25.5vh);
    }
`;

export const yTranslateRev2 = keyframes`
    0% {
       transform: translateY(37.5vh);
    }
    100% {
        transform: translateY(50vh);
    }
`;

export const rotate0 = keyframes`
   0% {
       transform: rotateZ(0deg);
   }
   100% {
       transform: rotateZ(180deg);
   }
`;
export const rotate45 = keyframes`
   0% {
       transform: rotateZ(45deg);
   }
   100% {
       transform: rotateZ(225deg);
   }
`;
export const rotate90 = keyframes`
   0% {
       transform: rotateZ(90deg);
   }
   100% {
       transform: rotateZ(270deg);
   }
`;
export const rotate135 = keyframes`
   0% {
       transform: rotateZ(135deg);
   }
   100% {
       transform: rotateZ(315deg);
   }
`;
