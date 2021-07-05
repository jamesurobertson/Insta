import { useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Switch, BrowserRouter } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './Routes';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Explore from './components/Explore/Explore';
import Login from './components/Login/Login';
import Notifications from './components/Notifications/Notifications';
import EditProfile from './components/Profile/EditProfile';
import SinglePost from './Pages/SinglePost';
import Upload from './components/Upload/Upload';
import { UserContext } from './Contexts';

function App() {
    let { setCurrentUser } = useContext(UserContext);

    let [loaded, setLoaded] = useState(false);

    // let getFollows = useCallback(async () => {
    //     if (!currentUser.id) return;
    //     let res = await fetch(`/api/follow/${currentUser.id}`);
    //     if (res.status !== 200) {
    //         let { errors } = await res.json();
    //         showErrors(errors);
    //     } else {
    //         let { users } = await res.json();
    //         let followObj = users.reduce((followObj, user) => {
    //             followObj[user.id] = user;
    //             return followObj;
    //         }, {});
    //         setFollows(followObj);
    //     }
    // }, [setFollows, currentUser.id]);

    // let getLikes = useCallback(async () => {
    //     if (!currentUser.id) return;
    //     let res = await fetch(`/api/like/user/${currentUser.id}`);
    //     if (res.status !== 200) {
    //         let { errors } = await res.json();
    //         showErrors(errors);
    //     } else {
    //         let { likes } = await res.json();
    //         let obj = likes.reduce((obj, like) => {
    //             let { likeable_id, likeable_type } = like;
    //             obj[`${likeable_type}-${likeable_id}`] = like;
    //             return obj;
    //         }, {});
    //         setLikes(obj);
    //         setLoaded(true);
    //     }
    // }, [currentUser.id, setLikes]);

    useEffect(() => {
        (async () => {
            let res = await fetch(`/api/auth/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                let user = await res.json();
                user.likes = user.likes.reduce((obj, like) => {
                    obj[`${like.content_type}-${like.content.id}`] = like;
                    return obj;
                }, {});
                user.followers = user.followers.reduce((obj, follower) => {
                    obj[follower.follower_id] = follower;
                    return obj;
                }, {});
                user.following = user.following.reduce((obj, following) => {
                    obj[following.following_id] = following;
                    return obj;
                }, {});
                setCurrentUser(user);
                setLoaded(true);
            }
        })();
    }, [setCurrentUser]);

    return (
        <>
            {loaded && (
                <BrowserRouter>
                    <Switch>
                        <AuthRoute path='/auth' component={Login} />
                        {/* <ProtectedRoute path="/direct/inbox" component={Home} /> */}
                        <ProtectedRoute
                            exact
                            path='/profile/:userId'
                            component={Profile}
                        />
                        <ProtectedRoute path='/explore' component={Explore} />
                        <ProtectedRoute path='/upload' component={Upload} />
                        <ProtectedRoute
                            path='/notifications'
                            component={Notifications}
                        />
                        <ProtectedRoute exact path='/' component={Home} />
                        <ProtectedRoute
                            path='/accounts/edit'
                            component={EditProfile}
                        />
                        <ProtectedRoute
                            path='/post/:id'
                            component={SinglePost}
                        />
                    </Switch>
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
