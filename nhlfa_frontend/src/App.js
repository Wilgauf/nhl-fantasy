import React, { useContext, createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TeamPage from "./pages/TeamPage";
import TeamManagePage from "./pages/TeamManagePage";
import NewTeamPage from "./pages/newTeamPage";
// import PrivateRoute from './components/PrivateRoute'
import { getLoggedInUser, login } from "./api/UserAPI";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("auth-user")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      if (sessionStorage.getItem("auth-user") !== "null") {
        let response = await getLoggedInUser(
          sessionStorage.getItem("auth-user")
        );
        let data = await response.json();
        if (data.username) {
          setIsLoggedIn(true);
          console.log(data.username);
          setUser(data);
        }
      }
    };
    if (!user) {
      getUser();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    let userObject = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    let response = await login(userObject);
    let data = await response.json();
    if (data.token) {
      sessionStorage.setItem("auth-user", `${data.token}`);

      setIsLoggedIn(true);
      setUser(data.user);
    }
  };

  const handleLogout = () => {
    sessionStorage.setItem("auth-user", null);
    setIsLoggedIn(false);
    setUser(null);
  };

  const RenderLoginPage = () => {
    return (
      <LoginPage
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        user={user}
      />
    );
  };

  const RenderHomePage = () => {
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        user={user}
        handleLogout={handleLogout}
      />
    );
  };

  function PrivateRoute({ children, isAuthenticated, ...rest }) {
    return (
      <Route
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    // <ProvideAuth>
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={RenderHomePage} />
          <Route exact path="/login" render={RenderLoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <PrivateRoute path="/team/:teamID" isAuthenticated={isLoggedIn}>
            <TeamManagePage user={user} handleLogout={handleLogout} />
          </PrivateRoute>
          <PrivateRoute path="/team" isAuthenticated={isLoggedIn}>
            <TeamPage user={user} handleLogout={handleLogout} />
          </PrivateRoute>
          <PrivateRoute path="/newteam" isAuthenticated={isLoggedIn}>
            <NewTeamPage user={user} handleLogout={handleLogout} />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
    // </ProvideAuth>
  );
}

export default App;
