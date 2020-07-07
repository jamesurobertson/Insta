import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Explore from "./Pages/Explore"
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import GlobalStyle from "./Styles/GlobalStlye"

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <GlobalStyle/>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/login" component={Login} currentUserId={1} />
          <AuthRoute path="/register" component={SignUp} currentUserId={1} />
          <ProtectedRoute exact path="/" component={Home} currentUserId={true} />
          <ProtectedRoute path="/direct/inbox" component={Home} currentUserId={true} />
          <ProtectedRoute path="/profile" component={Profile} currentUserId={true} />
          <ProtectedRoute path="/explore" component={Explore} currentUserId={true} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
