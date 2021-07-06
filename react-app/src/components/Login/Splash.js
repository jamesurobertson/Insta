import styled from 'styled-components';
import { fadeIn } from '../../Styles/animations';

const SplashWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -5;
`;

const SplashImg = styled.img`
    opacity: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${({ loaded }) => (loaded ? fadeIn : 'none')} 2s forwards;
`;

const Splash = ({ loaded, setLoaded }) => {
    return (
        <SplashWrapper>
            <SplashImg
                src='https://picsum.photos/2000/3000'
                loaded={loaded}
                onLoad={() => setLoaded(true)}
            />
        </SplashWrapper>
    );
};

export default Splash;
