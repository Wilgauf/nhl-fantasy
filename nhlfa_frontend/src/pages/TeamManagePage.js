import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import playerslist from "../Data_scraper/playerslist.json";
import {
  getAllTeams,
  buildTeam,
  getAllPlayers,
  deletePlayer,
} from "../api/FantasyAPI";

const TeamManagePage = (props, teamProps) => {
  const [value, setValue] = useState(playerslist[0]);
  //Instantiating the list of teams
  const [team, setTeam] = useState({ id: 0 });
  const [user, setUser] = useState(props.user);
  const [players, setPlayers] = useState([]);

  // Get all the players for the auto complete
  const allPlayers = playerslist.map((playerslist) => {
    return playerslist;
  });

  const removePlayer = (playerData) => {
    console.log("deletion in progress");
    if (playerData) {
      let playersArray = players.filter(
        (player) => player.name !== playerData.name
      );

      setPlayers([...playersArray]);
      let token = sessionStorage.getItem("auth-user");
      deletePlayer(token, playerData);
    } else {
      console.log("Invalid selection for deletion");
    }
  };

  //Handles submit on the autocomplete box
  const addPlayer = () => {
    if (value) {
      let playerName = value.name;
      let apiID = value.apiID;
      let nhlTeam = value.team;
      let playerData = {
        name: playerName,
        apiID: apiID,
        team: [team.id],
        nhlTeam: nhlTeam,
      };
      let token = sessionStorage.getItem("auth-user");
      buildTeam(token, playerData);
      setPlayers([...players, playerData]);
    }
  };

  useEffect(() => {
    const getTeams = async () => {
      let response = await getAllTeams(sessionStorage.getItem("auth-user"));
      let data = await response.json();
      const userTeam = data.find(
        (currentTeam) => currentTeam.owner === props.user.id
      );
      setTeam(userTeam);
    };
    getTeams();
  }, []);

  useEffect(() => {
    const getPlayers = async () => {
      let currentTeam = [];
      let response = await getAllPlayers(sessionStorage.getItem("auth-user"));
      let data = await response.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i].team[0] === team.id) {
          currentTeam.push(data[i]);
        }
      }
      setPlayers(currentTeam);
    };
    getPlayers();
  }, [team]);

  if (team.id === 0 && players.length === 0)
    return <span>Loading team data</span>;

  const renderPlayers = () => {
    if (players.length > 0) {
      return players.map((player) => (
        <div>
          <h2>{player.name}</h2>
          <h4>{player.nhlTeam}</h4>
          <Button
            variant="contained"
            onClick={() =>
              removePlayer({
                id: player.id,
                name: player.name,
                apiID: player.apiID,
                team: team.id,
                nhlTeam: player.nhlTeam,
              })
            }
          >
            Remove
          </Button>
          <hr />
        </div>
      ));
    } else {
      return (
        <div>
          <h2>Add some players</h2>
        </div>
      );
    }
  };
  return (
    <div>
      <h1>Build your team</h1>
      <Autocomplete
        id="combo-box-demo"
        options={allPlayers}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            defaultValue="Choose a player"
            label="Choose a player"
            variant="outlined"
          />
        )}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />

      <div>
        Are you sure you want to add{" "}
        {`${value !== null ? `${value.name}` : "null"} to your team`}
      </div>
      <Button variant="contained" onClick={addPlayer}>
        Add player
      </Button>

      <div>{renderPlayers()}</div>
    </div>
  );
};

export default TeamManagePage;
