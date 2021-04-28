import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {getAllTeams, getAllPlayers, getGames, getStats, gameData } from '../api/FantasyAPI'



const TeamPage = (props) => {
  //Instantiating the arrays
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // on mount will get the user's team info if it exists
  useEffect(()=>{
    const getTeams = async ()=>{
      let teamArray = []
      let response =  await getAllTeams(sessionStorage.getItem("auth-user"))
      let data = await response.json()
      //Checking if current user has a team in the DB
      for (let i = 0; i<data.length; i++){
        if (data[i].owner === props.user.id){
          //make new array then set state after looping done
          teamArray.push(data[i])
        }
      }
      setTeams(teamArray)
    }
    getTeams()
  }, [])
  //once a team has been found players can be looked pulled from the DB
  useEffect(()=>{
    const getPlayers = async ()=> {
      let currentTeam = []  
      // if (teams[0]){
        let response = await getAllPlayers(sessionStorage.getItem ("auth-user"))
        let data = await response.json()
        for (let i=0; i<data.length; i++){
          if(data[i].team[0] === teams[0].id){
            currentTeam.push(data[i])
          }
        }
      setPlayers(currentTeam)
      // }
    }
    if (teams[0]) {
      getPlayers()
    }
  }, [teams[0]])

  useEffect(()=> {
    //when players have been set, this should check players agains the games today to find who is playing today.
    const todaysGames = async () => {
      let gamesArray = []      
        //gets the games from the API
        let response =  await getGames()
        let data = await response.json()
        //loop through the data and pull out the teams that are playing and link to their api's just in case
        for (let i = 0; i< data.dates[0].games.length;i++){
          let homeName = data.dates[0].games[i].teams.home.team.name
          let awayName = data.dates[0].games[i].teams.away.team.name
          //calls the function that checks what players are in the game so they can be listed below the game
          let playersIn = await playersInThisGame(homeName, awayName)
          gamesArray.push({
            homeTeam: homeName,
            homeLink:data.dates[0].games[i].teams.home.team.link,
            awayTeam: awayName,
            awayLink:data.dates[0].games[i].teams.away.team.link,
            players: playersIn
          })
        //sets the state for games so DOM will rerender with new info then calls the render
        setGames([...games, ...gamesArray])
        //changed this line vvvvv
        // return renderGames()
        return isLoading ? null : renderGames()
      }
      // return <div>{renderGames()}</div>
    }
    if (games.length === 0 && players.length > 0) {
      todaysGames()
    }
  },[players])

  const renderGames = ()=>{
    //checking to ensure there are actually games
    if (games.length>0){
    //map over the list of games and displays the user's players in that game
    return games.map((game)=>
    <div>
      {game.awayTeam} at {game.homeTeam} <br/>
      <div>
      {game.players.map((player)=> {return <div>Stats:
        {player.name} plays at {player.position} {player.status}
        </div>})}
      </div>
    </div>)
    }
    return <div> No games found </div>
  }

  const playersInThisGame = (homeName, awayName)=>{
    //get the list of all the players actually playing in the game
    let playingPlayers = []
    for (let j=0; j<players.length; j++){
      if (homeName === players[j].nhlTeam || awayName === players[j].nhlTeam){
        playingPlayers.push(players[j])
      }
    }
    //once I have the list of players playing, call API again and get more stats on just those players
    // let promiseArray = []
    let playersWithStats = playingPlayers.map(async (player)=>{
      // let response = await getStats(player.apiID)
      // let data = await response.json()
      // Promise.all(
      //   playingPlayers.map(player => getStats(player.apiID))
      //     .then((responses) => setPlayerDetails(
      //       responses.map(res => res.data)
      //     )
      // )
      getStats(player.apiId)
      let data = gameData
      let playerWithStats = {
        name: player.name,
        team: [player.team[0]],
        nhlTeam: player.nhlTeam,
        goals: data.stats[0].splits[0].stat.goals,
        avgTOI: data.stats[0].splits[0].stat.timeOnIcePerGame,
        assists : data.stats[0].splits[0].stat.assists,
        plusMinus: data.stats[0].splits[0].stat.plusMinus,
        pim: data.stats[0].splits[0].stat.penaltyMinutes,
      }
      console.log( playerWithStats)

      return playerWithStats
    })
    if (teams.length > 0 && players.length > 0 && games.length > 0){
      setIsLoading(false)
      return playersWithStats
    }

  }


  const renderTeam = ()=> {
    if(teams.length>0){
       return teams.map( team => 
       <Link to={`/team/${team.id}`}>{team.name} </Link>
      )  
    }
    else{
      return <div>
          <p>You currently don't have any teams</p>
          <Link to='/newteam'>or add a new team </Link>
        </div>
    }
  }
  return( <div>
    { isLoading ? (<div>Loading </div>) : (
    <div>
      <h1>Choose your team to manage</h1>
      <div>
        {renderTeam()}

      </div>
      


      <div>
        {renderGames()}
      </div>
    </div>)
    }
    </div>
  )
}

export default TeamPage;