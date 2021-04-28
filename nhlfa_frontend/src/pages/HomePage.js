import React from "react";
import { Link } from "react-router-dom";

const HomePage = ({ isLoggedIn, user, handleLogout }) => {
  return (
    <div>
      Home Page
      {user && <div>Hello {user.username}</div>}
      {!isLoggedIn ? (
        <div>
          <div>
            <Link to="/login"> Login </Link>
          </div>
          <div>
            <Link to="/signup"> Signup </Link>
          </div>
          <div>
            <Link to="/team"> team </Link>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Link to="/team"> Manage Team </Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
