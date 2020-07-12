import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes";
import { UserContext, ProfileContext } from "./context";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Explore from "./components/Explore/Explore";
import Login from "./components/Login/Login";
import Notifications from './components/Notifications/Notifications'
import GlobalStyle from "./Styles/GlobalStyle";
import EditProfile from "./components/Profile/EditProfile";
import SinglePost from './components/Post/SinglePost'
import Upload from './components/Upload/Upload'

function App() {
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [currentUserFollowingCount, setCurrentUserFollowingCount] = useState(null)
  const [currentUserFollowerCount, setCurrentUserFollowerCount] = useState(null)

  const userContextValue = {
    currentUserId,
    setCurrentUserId,
    currentUserProfilePic,
    setCurrentUserProfilePic,
    currentUserFollowerCount,
    setCurrentUserFollowerCount,
    currentUserFollowingCount,
    setCurrentUserFollowingCount
  };
  const profileContextValue = { profileData, setProfileData };

  return (
    <UserContext.Provider value={userContextValue}>
      <ProfileContext.Provider value={profileContextValue}>
        <ToastContainer autoClose={5000} />
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/auth" component={Login} />
            {/* <ProtectedRoute path="/direct/inbox" component={Home} /> */}
            <ProtectedRoute exact path="/profile/:id" component={Profile} />
            <ProtectedRoute path="/explore" component={Explore} />
            <ProtectedRoute path="/upload" component={Upload} />
            <ProtectedRoute path="/notifications" component={Notifications}
            />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path='/accounts/edit' component ={EditProfile}/>
            <ProtectedRoute path='/post/:id' component ={SinglePost}/>
          </Switch>
        </BrowserRouter>
      </ProfileContext.Provider>
    </UserContext.Provider>
  );
}

export default App
