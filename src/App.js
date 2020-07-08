import React, {useState} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, BrowserRouter } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes";
import {UserContext} from "./context"
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Explore from "./components/Explore/Explore"
import Login from "./components/Login/Login";
import GlobalStyle from "./Styles/GlobalStyle"

function App() {
  const [currentUserId, setCurrentUserId] = useState('')
  const value = {currentUserId, setCurrentUserId}
  

  return (
    <UserContext.Provider value={value}>
      <ToastContainer autoClose={2000} />
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <AuthRoute
            path="/auth"
            component={Login}
          />
          <ProtectedRoute
            exact
            path="/"
            component={Home}
          />
          <ProtectedRoute
            path="/direct/inbox"
            component={Home}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
          />
          <ProtectedRoute
            path="/explore"
            component={Explore}
          />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
