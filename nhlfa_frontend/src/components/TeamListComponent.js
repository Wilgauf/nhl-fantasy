import React from "react";
import { getAllPlayers } from "../api/FantasyAPI";

const TeamList = async () => {
  let currentTeam = [];
  if (team.id == 0) {
    console.log("no team yet");
    return <span>Loading team data</span>;
  } else {
    let response = await getAllPlayers(sessionStorage.getItem("auth-user"));
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].team == team.id) {
        currentTeam.push(data[i]);
      }
    }
    console.log("here");
    console.log(currentTeam);
    return <p>{currentTeam}</p>;
  }
};
