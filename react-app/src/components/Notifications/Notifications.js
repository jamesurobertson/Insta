import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import CommentNotification from './CommentNotification';
import FollowNotification from './FollowNotification';
import LikeNotification from './LikeNotification';
import Loading from '../Loading/Loading';

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

    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    z-index: -1;
`;

const NotificationsWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    margin: auto;
    height: calc(100% - 54px);
    min-height: calc(100vh - 54px);
    width: 100%;
    max-width: 614px;
    margin-top: 54px;
    padding-top: 20px;
    padding-bottom: 54px;
    object-fit: cover;
    border: solid 1px #dfdfdf;

    & img {
        height: 100%;
        object-fit: cover;
    }

    & .avatar {
        border-radius: 50%;
    }

    & a {
        height: 100%;
        font-weight: 700;
        color: #0095f6;
    }

    & p {
        width: 100%;
        padding: 0 10px;
        font-size: 12px;
        text-align: left;
    }

    h1 {
        padding-bottom: 5px;
    }
`;

const Notifications = () => {
    const [toRender, setToRender] = useState([]);
    const [load, setLoad] = useState(false);
    const [count, setCount] = useState('0+0+0+0');
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        (async () => {
            if (load) return;
            try {
                const res = await fetch(`/api/note/scroll/${count}`);
                setLoad(true);
                if (!res.ok) throw res;

                const {
                    notes,
                    count: { comment, follow, post_like, comment_like },
                } = await res.json();

                setCount(`${comment}+${follow}+${post_like}+${comment_like}`);
                const nodeList = notes.map((note, i) => {
                    switch (note.type) {
                        case 'comment':
                            return (
                                <CommentNotification
                                    style={{
                                        animationDuration: `${1 + i * 0.25}s`,
                                    }}
                                    {...note}
                                    key={`${note.user.id}-${note.type}-${note.id}`}
                                />
                            );
                        case 'follow':
                            return (
                                <FollowNotification
                                    style={{
                                        animationDuration: `${1 + i * 0.25}s`,
                                    }}
                                    {...note}
                                    key={`${note.type}-${note.id}`}
                                />
                            );
                        default:
                            return (
                                <LikeNotification
                                    {...note}
                                    style={{
                                        animationDuration: `${1 + i * 0.25}s`,
                                    }}
                                    key={`${note.user.id}-${note.type}-${note.content_type}-${note.id}`}
                                />
                            );
                    }
                });

                setToRender((toRender) => [...toRender, ...nodeList]);
                setLoad(false);
                if (notes.length === 0) {
                    setHasMore(false);
                    setLoad(false);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    };

    return (
        <NotificationsWrapper>
            <h1>Notifications</h1>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                initialLoad={true}
            >
                {toRender}
            </InfiniteScroll>
            <LoadingWrapper>
                <Loading load={load} />
            </LoadingWrapper>
        </NotificationsWrapper>
    );
};

export default Notifications;
