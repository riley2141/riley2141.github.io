var players; 
var leader;
var missionNum;
var gameData;


function assignRoles(){
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	var numEvil = Math.round(players.length / 3);
	console.log("number of players being assigned roles: " + players.length);
	console.log("number of evil players: " + numEvil);

	for (var i = 0; i < numEvil; i++) {
		var evilPlayer = randomIntFromInterval( 0, players.length-1 );
		//write to json
		gameManager.updatePlayerData(players[evilPlayer].playerId, {'loyalty': 'evil'}, true);
		players.splice(evilPlayer,1);
	}

	for (i = 0; i < players.length; i++) {
		gameManager.updatePlayerData(players[i].playerId, {'loyalty': 'good'}, true);
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
	leader = (leader++) % players.length;
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

	console.log("num displaying mission players " + missionTeam.length);
	document.getElementById(missionNum).innerHTML = "";
	for(var i = 0; i < missionTeam.length; i++)
	{
		var playerInfo = missionTeam[i];

		var playerName = playerInfo.playerData.name;
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
