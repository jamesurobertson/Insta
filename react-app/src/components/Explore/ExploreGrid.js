import { useState, useContext } from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { UserContext } from '../../Contexts';

import Loading from '../Loading/Loading';
import Layout1 from './Layout1';
import Layout2 from './Layout2';
import Layout3 from './Layout3';

const LoadingWrapper = styled.div`
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }


    position: fixed;
    bottom: 55vh;
    opacity: 1;
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-fill-mode: forwards;
`;

const ExploreGridWrapper = styled.div`
    margin: auto;

    margin-bottom: 10vh;
    width: 95vw;
    max-width: 614px;
`;

const ExploreGrid = (props) => {
    const { currentUser } = useContext(UserContext);

    const [toRender, setToRender] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    function getTemplate(len, photoArray) {
        const randomInt = getRandomInt(2, 4);

        if (
            len === 0 ||
            photoArray.length < 3 ||
            !toRender[len - 1].key.includes(`layout1key`)
        ) {
            return [
                <Layout1
                    key={`layout1key-${len}`}
                    componentPhotos={photoArray}
                />,
            ];
        }

        if (len === 1 || randomInt === 2) {
            return [
                <Layout2
                    key={`layout2key-${len}`}
                    componentPhotos={photoArray}
                />,
            ];
        }

        if (
            len === 0 ||
            photoArray.length < 3 ||
            !toRender[len - 1].key.includes(`layout1key`)
        ) {
            return [
                <Layout1
                    key={`layout1key-${len}`}
                    componentPhotos={photoArray}
                />,
            ];
        } else {
            return [
                <Layout3
                    key={`layout3key-${len}`}
                    componentPhotos={photoArray}
                />,
            ];
        }
    }

    const fetchMore = () => {
        if (!currentUser.id) return;

        (async () => {
            const len = toRender.length;
            try {
                const res = await fetch(
                    `/api/post/scroll/${len * 3}`,
    
                );
                const obj = await res.json();

                let photoArray = obj.posts;

                if (photoArray.length < 3) {
                    setHasMore(false);
                }

                const componentToRender = getTemplate(len, photoArray);
                setToRender([...toRender, ...componentToRender]);
            } catch {
                setHasMore(false);
                setToRender([]);
                setLoading(false);
            }
        })();
    };

    if (!toRender || !currentUser.id) return null;
    return (
        <ExploreGridWrapper key='gridWrapper'>
            <InfiniteScroll
                initialLoad={true}
                pageStart={4}
                loadMore={fetchMore}
                hasMore={hasMore}
            >
                {toRender}
            </InfiniteScroll>
            <LoadingWrapper
                style={{ animationName: `${loading ? 'fadeIn' : 'fadeOut'}` }}
            >
                <Loading />
            </LoadingWrapper>
        </ExploreGridWrapper>
    );
};

export default ExploreGrid;
