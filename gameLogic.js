var players;
var leader;
var missionNum;
var gameData;


function assignRoles(){
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	var numEvil = Math.ceil(players.length / 3);

	console.log("number of players being assigned roles: " + players.length);
	console.log("number of evil players: " + numEvil);
	gameData = gameManager.getGameData();
	for (var i = 0; i < numEvil; i++) {
		var evilPlayer = randomIntFromInterval( 0, players.length-1 );
		//write to json
		var playerData = players[evilPlayer].playerData;
		if (assassin) {
			playerData.role = "assassin";
			gameData.assassin = playerData.name;
			assassin = false;
		}
		else if(mordred)
		{
			playerData.role = "mordred";
			gameData.mordred = playerData.name;
			mordred = false;
		}
		else if(morgana)
		{
			playerData.role = "morgana";
			gameData.morgana = playerData.name;
			morgana = false;
		}
		else if(oberon)
		{
			playerData.role = "oberon";
			gameData.oberon = playerData.name;
			oberon = false;
		}
		else
			playerData.role = "minion";
		playerData.loyalty = 'evil';
		gameManager.updatePlayerData(players[evilPlayer].playerId, playerData, true);
		players.splice(evilPlayer,1);
	}

	var merlinNum = randomIntFromInterval (0, players.length-1);
	var percivalNum = randomIntFromInterval (0, players.length-1);
	while (percivalNum == merlinNum)
	{
		percivalNum = randomIntFromInterval (0, players.length-1);
	}
	for (i = 0; i < players.length; i++) {
		var playerData = players[i].playerData;
		if (i == merlinNum && merlin)
		{
			playerData.role = "merlin";
			gameData.merlin = playerData.name;
			merlin = false;
		}
		else if(i == percivalNum && percival)
		{
			playerData.role = "percival";
			gameData.percival = playerData.name;
			percival = false;
		}
		else
			playerData.role = "servant";
		playerData.loyalty = 'good';
		gameManager.updatePlayerData(players[i].playerId, playerData, true);
	}

	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	leader = randomIntFromInterval(0, players.length-1);
	console.log("leader number is: " + leader);

	console.log("players array: " + players);
	console.log("playerId should be: " + players[leader].playerId);
	//gameData = gameManager.getGameData();



	gameData.leader = players[leader].playerId;
	gameData.missionNum = 1;
	gameData.missionTeamSize = missionTeamSizes[1][gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING).length];
	gameData.phase = selectPhase;
	document.getElementById("currLead").innerHTML = "Leader is " + players[leader].playerData.name;
	gameManager.updateGameData(gameData, false);
	console.log("Initial phase change has ended.");
	gameData = gameManager.getGameData();
	console.log("Game data looks like this: " + JSON.stringify(gameData) );

	//gameManager.updateGameData( {'leader': players[leader].playerId}, true);
	//gameManager.updateGameData( {'missionNum' : 1}, true);
	//gameManager.updateGameData({"missionTeamSize" : missionTeamSizes[1][gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING).length] }, true);
	//alertLeader();

}

function changeLeader() {
	leader = (leader+1) % players.length;
	gameData = gameManager.getGameData();
	gameData.leader = players[leader].playerId;
	gameData.leaderName = players[leader].playerData.name;
	//gameManager.updateGameData( {'leader': players[leader].playerId}, true);
	alertLeader();
}

function alertLeader() {
	console.log("Alert leader is setting the phase to selectPhase: " + selectPhase);
	//gameManager.broadcastGameManagerStatus();
	//gameManager.updateGameData( {'phase': selectPhase}, false

	//set hasVoted and hasMissioned to false for all players
	var players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	for(var i = 0; i < players.length; i++){
		var playerData = players[i].playerData;
		playerData.hasVoted = false;
		playerData.hasMissioned = false;
		gameManager.updatePlayerData(players[i].playerId, playerData, true);
	}

	//update gamephase/data
	gameData.phase = selectPhase;
	document.getElementById("currLead").innerHTML = "Select Phase - Leader is " + players[leader].playerData.name;
	gameManager.updateGameData(gameData, false);
}

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function displayMissionTeam(){
	console.log("in display mission team players");
	var missionNum = gameManager.getGameData().missionNum;
	var missionTeam = gameManager.getGameData().missionTeam;

	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);

	console.log("num displaying mission players " + missionTeam.length);
	document.getElementById("MissionTeam").style = "";
	document.getElementById(missionNum).innerHTML = "";
	document.getElementById("currMissionTeam").innerHTML = "";
	for(var i = 0; i < missionTeam.length; i++)
	{
		var playerId = missionTeam[i];
		console.log("Player #" + i + " is " + playerId);
		var playerName = gameManager.getPlayer(playerId).playerData.name;
		console.log("Player #" + i + " name is " + playerName);
		document.getElementById(missionNum).innerHTML = document.getElementById(missionNum).innerHTML + playerName + "<br>";
		document.getElementById("currMissionTeam").innerHTML = document.getElementById("currMissionTeam"). innerHTML + playerName + "<br>";
	}
}

function checkGameOver() {
	var goodWins = 0;
	var badWins = 0;

	for(var i = 0; i < missionResults.length; i++) {
		if (missionResults[i] == 1)
			goodWins++;
		else if (missionResults[i] == 2) {
			badWins++;
		}
	}

	if (goodWins >= 3 || badWins >= 3)
		return true;
	return false;
}

function displayVotesIncomplete()
{
	console.log("in display vote information - incomplete");
	var missionNum = gameManager.getGameData().missionNum;

	document.getElementById("playerVotesLeft").innerHTML = "";
	document.getElementById("playerVotesRight").innerHTML = "";

	for(var i = 0; i < allPlayers.length; i++)
	{
		if (i < 5) {
			document.getElementById("playerVotesLeft").innerHTML = document.getElementById("playerVotesLeft").innerHTML + allPlayers[i] + "<br>";
		}
		else {
			document.getElementById("playerVotesRight").innerHTML = document.getElementById("playerVotesRight").innerHTML + allPlayers[i] + "<br>";
		}
	}
}

function displayVotes() {
	console.log("in display vote information");
	var missionNum = gameManager.getGameData().missionNum;

	document.getElementById("playerVotesLeft").innerHTML = "";
	document.getElementById("playerVotesRight").innerHTML = "";

	var count = 0;
	for(var i =0; i < acceptPlayers.length; i++)
	{
		if (count < 5)
			document.getElementById("playerVotesLeft").innerHTML = document.getElementById("playerVotesLeft").innerHTML + acceptPlayers[i] + " - Accept" + "<br>";
		else
			document.getElementById("playerVotesRight").innerHTML = document.getElementById("playerVotesRight").innerHTML + acceptPlayers[i] + " - Accept" + "<br>";
		count++;
	}

	for(i = 0; i < rejectPlayers.length; i++)
	{
		if (count < 5)
			document.getElementById("playerVotesLeft").innerHTML = document.getElementById("playerVotesLeft").innerHTML + rejectPlayers[i] + " - Reject" + "<br>";
		else
			document.getElementById("playerVotesRight").innerHTML = document.getElementById("playerVotesRight").innerHTML + rejectPlayers[i] + " - Reject" + "<br>";
		count++;
	}
}

function changeMissionBoxes()
{
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	for(var i = 1; i < 6; i++)
	{
		document.getElementById("ppm"+i).innerHTML = missionTeamSizes[i][players.length];
	}
}

function evilWins()
{
	document.getElementById("who-wins").innerHTML = "Victory for Evil";
	document.getElementById("evilImg").style = "";
	document.getElementById("goodImg").style = "display:none";
	displayLoyalty();
}

function goodWins()
{
	document.getElementById("who-wins").innerHTML = "Victory for Good";

	displayLoyalty();
}

function displayLoyalty()
{
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	document.getElementById("goodList").innerHTML = "";
	document.getElementById("badList").innerHTML = "";

	for(var i = 0; i < players.length; i++)
	{
		if(players[i].playerData.loyalty == "evil")
		{
			document.getElementById("badList").innerHTML = document.getElementById("badList").innerHTML + players[i].playerData.name + " : " + players[i].playerData.role + "<br>";
		}
		else
		{
			document.getElementById("goodList").innerHTML = document.getElementById("goodList").innerHTML + players[i].playerData.name + " : " + players[i].playerData.role + "<br>";
		}
	}
}

function resetAll()
{
	numPlayers = 0;
	voteCount = 0;
	voteCountCount = 0;
	passCount = 0;
	acceptPlayers = [];
	rejectPlayers = [];
	allPlayers = [];
	missionResults = [-1, -1, -1, -1, -1];
	merlin = false;
	assassin = false;
	mordred = false;
	percival = false;
	morgana = false;
	oberon = false;
	evilRoles = 0;



	document.getElementById("playerVotesLeft").innerHTML = "";
	document.getElementById("playerVotesRight").innerHTML = "";
	document.getElementById("currLead").innerHTML = "";
	document.getElementById("voteCount").innerHTML = "Vote Count: " + voteCountCount;
	document.getElementById("voteInformationRight").style = "visibility:hidden";
	document.getElementById("voteInformationLeft").style = "visibility:hidden";
	document.getElementById("MissionTeam").style = "visibility:hidden";
	document.getElementById("failCard").style = "visibility:hidden";
	document.getElementById("successCard").style = "visibility:hidden";



	for(var i = 1; i < 6; i++)
	{
		document.getElementById(i).innerHTML = "";
		document.getElementById(i).parentElement.style = "";
		if (i == 1)
			document.getElementById(i).parentElement.className = "turn current";
		else
			document.getElementById(i).parentElement.className = "turn";
	}




}
