const fetch = require("node-fetch");
const fs = require("fs-extra");
async function player_info() {
  let allPlayers = [];
  let getData = async () => {
    for (let i = 1; i < 55; i++) {
      if (i == 11 || i == 27) {
        console.log("11 or 27");
        continue;
      } else if (i == 31) {
        console.log("31 +21");
        i += 21;
      }
      try {
        console.log(i);
        let response = await (
          await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${i}/roster`)
        ).json();
        let data = await response;
        let teamResponse = await (
          await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${i}`)
        ).json();
        let teamData = await teamResponse;
        parseData(data, teamData);
      } catch (error) {
        console.error("error getting team roster" + error);
        break;
      }
    }
    return allPlayers;
  };

  let parseData = (data, teamData) => {
    for (let i = 0; i < data.roster.length; i++) {
      let currentPlayer = {
        name: data.roster[i].person.fullName,
        apiID: data.roster[i].person.id,
        team: teamData.teams[0].name,
      };
      console.log(currentPlayer);
      allPlayers.push(currentPlayer);
    }
  };

  let list_of_players = await getData();
  let json_players = await JSON.stringify(list_of_players);
  await fs.writeFile("playerslist.json", json_players);
  console.log("waiting");
}

player_info();
