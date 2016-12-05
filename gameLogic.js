var players; 
var leader;
var missionNum;
var gameData;


function assignRoles(){
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	var numEvil = players.length / 3;
	if(players.length % 3 != 0)
	{
		numEvil = numEvil + 1;
	}
	console.log("number of players being assigned roles: " + players.length);
	console.log("number of evil players: " + numEvil);

	for (var i = 0; i < numEvil; i++) {
		var evilPlayer = randomIntFromInterval( 0, players.length-1 );
		//write to json
		var playerData = players[evilPlayer].playerData;
		playerData.loyalty = 'evil';
		gameManager.updatePlayerData(players[evilPlayer].playerId, playerData, true);
		players.splice(evilPlayer,1);
	}

	for (i = 0; i < players.length; i++) {
		var playerData = players[i].playerData;
		playerData.loyalty = 'good';
		gameManager.updatePlayerData(players[i].playerId, playerData, true);
	}

	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	leader = randomIntFromInterval(0, players.length-1);
	console.log("leader number is: " + leader);

	console.log("players array: " + players);
	console.log("playerId should be: " + players[leader].playerId);
	gameData = gameManager.getGameData();



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
	//gameManager.updateGameData( {'leader': players[leader].playerId}, true);
	alertLeader();
}

function alertLeader() {
	console.log("Alert leader is setting the phase to selectPhase: " + selectPhase);
	//gameManager.broadcastGameManagerStatus();
	//gameManager.updateGameData( {'phase': selectPhase}, false);
	gameData.phase = selectPhase;
	document.getElementById("currLead").innerHTML = "Leader is " + players[leader].playerData.name;
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
	document.getElementById(missionNum).innerHTML = "";
	for(var i = 0; i < missionTeam.length; i++)
	{
		var playerId = missionTeam[i];
		console.log("Player #" + i + " is " + playerId);
		var playerName = gameManager.getPlayer(playerId).playerData.name;
		console.log("Player #" + i + " name is " + playerName);
		document.getElementById(missionNum).innerHTML = document.getElementById(missionNum).innerHTML + playerName + "<br>";
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
	

	

	
	document.getElementById("playerVotes").innerHTML = "";

	for(var i =0; i < acceptPlayers.length; i++)
	{
		console.log("acceptPlayer " + i + " " + acceptPlayers[i]);
		document.getElementById("playerVotes").innerHTML = document.getElementById("playerVotes").innerHTML + acceptPlayers[i] + "<br>";
		console.log(document.getElementById("playerVotes").innerHTML);
	}

	for(var i =0; i < rejectPlayers.length; i++)
	{
		console.log("rejectPlayer " + i + " " + rejectPlayers[i]);
		document.getElementById("playerVotes").innerHTML = document.getElementById("playerVotes").innerHTML + rejectPlayers[i] + "<br>";
		console.log(document.getElementById("playerVotes").innerHTML);
	}
}

function displayVotes() {
	console.log("in display vote information");
	var missionNum = gameManager.getGameData().missionNum;
	

	

	
	document.getElementById("playerVotes").innerHTML = "";

	for(var i =0; i < acceptPlayers.length; i++)
	{
		document.getElementById("playerVotes").innerHTML = document.getElementById("playerVotes").innerHTML + acceptPlayers[i] + " - Accept" + "<br>";
	}

	for(var i =0; i < rejectPlayers.length; i++)
	{
		document.getElementById("playerVotes").innerHTML = document.getElementById("playerVotes").innerHTML + rejectPlayers[i] + " - Reject" + "<br>";
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
			document.getElementById("badList").innerHTML = document.getElementById("badList").innerHTML + players[i].playerData.name + "<br>";
		}
		else
		{
			document.getElementById("goodList").innerHTML = document.getElementById("goodList").innerHTML + players[i].playerData.name + "<br>";
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
	missionResults = [-1, -1, -1, -1, -1];

	document.getElementById("playerVotes").innerHTML = "";
	document.getElementById("currLead").innerHTML = "";
	document.getElementById("voteCount").innerHTML = "Vote Count: " + voteCountCount;



	for(var i = 1; i < 6; i++)
	{
		document.getElementById(i).innerHTML = "";
		document.getElementById(i).parentElement.style = "";
	}
	



}
