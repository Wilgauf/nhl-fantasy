import React, { useState } from "react";
import { createTeam } from "../api/FantasyAPI";
import { useHistory } from "react-router-dom";

const NewTeamPage = (props) => {
  const [user, setUser] = useState(props.user);
  const history = useHistory();
  const handleNewTeam = async (event) => {
    event.preventDefault();
    let teamInfo = {
      name: event.target.name.value,
      owner: user.id,
    };
    let token = sessionStorage.getItem("auth-user");
    let response = await createTeam(token, teamInfo);
    let data = await response.json();
    if (data.error) {
      console.log("An error occured during team creation, try again");
    } else {
      history.push("/");
    }
  };

  return (
    <div>
      <h1>Create a Team</h1>
      <form onSubmit={handleNewTeam}>
        <label> Team name: </label>
        <input type="text" placeholder="Use something fun" name="name" />
        <button type="submit"> Create</button>
      </form>
    </div>
  );
};

export default NewTeamPage;
