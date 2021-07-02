import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CaptionWrapper = styled.div`
    @media screen and (min-width: 735px) {
        padding: 5px 0 0 0;
    }
`;

const Caption = ({ userId, username, caption }) => {
    return (
        <CaptionWrapper>
            <Link
                style={{ fontWeight: 'bold', paddingRight: '8px' }}
                to={`/profile/${userId}`}
            >
                {username}
            </Link>
            {caption}
        </CaptionWrapper>
    );
};

export default Caption;
