import React from "react";
import { signupUser } from "../api/UserAPI";

const SignupPage = (props) => {
  const { history } = props;
  const handleSignup = async (event) => {
    event.preventDefault();
    let userObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    let response = await signupUser(userObject);
    let data = await response.json();
    if (data.error) {
      console.log("An error occured during sign up, try again");
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label> Username: </label>
        <input type="text" placeholder="SkipBayless" name="username" />
        <label> Password:</label>
        <input type="password" name="password" />
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
