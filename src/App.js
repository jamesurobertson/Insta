import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Explore from "./components/Explore/Explore"
import Login from "./components/Login/Login";
import GlobalStyle from "./Styles/GlobalStyle"

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <GlobalStyle/>
      <BrowserRouter>
        <Switch>

          <AuthRoute path="/auth" component={Login} currentUserId={false}/>
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
