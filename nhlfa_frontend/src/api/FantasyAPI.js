const getAllTeams = (token) => {
  return fetch("http://localhost:8000/teams/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  }).then((res) => res);
};

const buildTeam = (token, playerData) => {
  return fetch("http://127.0.0.1:8000/players/", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(playerData),
  });
};

const getAllPlayers = (token) => {
  return fetch("http://localhost:8000/players/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  }).then((res) => res);
};

const deletePlayer = (token, playerData) => {
  if (playerData) {
    return fetch(`http://localhost:8000/players/${playerData.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(playerData),
    }).then((res) => res);
  }
  console.error("playerdata not passed correctly" + playerData);
};

const getGames = (token) => {
  return fetch("https://statsapi.web.nhl.com/api/v1/schedule/", {}).then(
    (res) => res
  );
};
const gameData = (temp) => ({ ...temp
})
  
const getStats = async (id) => {
  let response = await fetch(
    `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason`
  );
  let data = await response.json();
  gameData(data)
  return data;
};

const createTeam = (token, teamInfo) => {
  return fetch(`http://localhost:8000/teams/`, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(teamInfo),
  }).then((res) => res);
};

const editTeam = (token, newTeamInfo) => {
  return fetch(`http://localhost:8000/teams/${newTeamInfo.teamID}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(newTeamInfo),
  }).then((res) => res);
};

export {
  getAllTeams,
  buildTeam,
  getAllPlayers,
  deletePlayer,
  getGames,
  getStats,
  createTeam,
  editTeam,
  gameData
};
