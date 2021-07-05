import { useState, useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import { PostsContext, UserContext } from '../Contexts';
import NoFollows from '../components/NoFollows';
import Loading from '../components/Loading/Loading';

const Feed = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 55px;
    align-items: center;
    justify-content: center;
    padding-bottom: 53px;

    @media screen and (min-width: 640px) {
        padding-top: 75px;
    }

    @media screen and (min-width: 475px) {
        padding-bottom: 0;
    }
`;

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

    z-index: 2;
    position: fixed;
    opacity: 1;
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
`;

const Home = () => {
    const { currentUser } = useContext(UserContext);
    const { posts, setPosts, postOrder, setPostOrder } =
        useContext(PostsContext);

    const [feedPosts, setFeedPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [load, setLoad] = useState(true);

    const loadMore = () => {
        if (!currentUser.id) return;

        (async () => {
            setLoad(true);
            if (postOrder.size > feedPosts.length) return;
            const res = await fetch(`/api/post/user/scroll/${postOrder.size}`);

            if (!res.ok) throw res;

            const { posts } = await res.json();
            let obj = posts.reduce(
                (obj, post) => {
                    obj.posts = { ...obj.posts, [post.id]: post };
                    obj.order = [...obj.order, post.id];
                    return obj;
                },
                { order: [], posts: {} }
            );

            setPosts((posts) => ({ ...posts, ...obj.posts }));
            setPostOrder((postOrder) => {
                for (let post of obj.order) {
                    postOrder.add(post);
                }
                return postOrder;
            });
        })();
    };

    useEffect(() => {
        if (!postOrder.size) return;
        let nodeList = [];

        postOrder.forEach((postId) => {
            nodeList.push(
                <Post key={`feedPost-${postId}`} post={posts[postId]} />
            );
        });

        setFeedPosts(nodeList);

        if (postOrder.size < 3) {
            setHasMore(false);
        }

        setLoad(false);
    }, [posts, postOrder]);

    if (!feedPosts) return null;

    return (
        <>
            {Object.values(currentUser.following).length ? (
                <>
                    <LoadingWrapper>
                        <Loading load={load} setLoad={setLoad} />
                    </LoadingWrapper>
                    <Feed>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore}
                        >
                            {feedPosts}
                        </InfiniteScroll>
                    </Feed>
                </>
            ) : (
                <NoFollows />
            )}
        </>
    );
};

export default Home;
