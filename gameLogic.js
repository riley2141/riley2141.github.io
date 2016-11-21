var players; 
var leader;
var missionNum;

function assignRoles(){
	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	var numEvil = Math.round(players.length / 3);

	for (var i = 0; i < numEvil; i++) {
		var evilPlayer = randomIntFromInterval( 0, players.length );
		//write to json
		gameManager.updatePlayerData(players[evilPlayer].playerId, {'loyalty': 'evil'}, true);
		players.splice(evilPlayer,1);
	}

	for (i = 0; i < players.length; i++) {
		gameManager.updatePlayerData(players[evilPlayer].playerId, {'loyalty': 'good'}, true);
	}

	players = gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING);
	leader = randomIntFromInterval(0, players.length);
	gameManager.updateGameData( {'leader': players[leader].playerId}, true);
	alertLeader();
	gameManager.updateGameData( {'missionNum' : 1}, true);
}

function changeLeader() {
	leader = (leader++) % players.length;
	gameManager.updateGameData( {'leader': players[leader].playerId}, true);
	alertLeader();
}

function alertLeader() {
	gameManager.updateGameData( {'phase': selectPhase}, false);
}

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

function displayMissionTeam(){
	console.log("in display mission team players");
	var missionNum = gameManager.getGameData().missionNum;
	//get mission team
	var readyPlayers = gameManager.getPlayersInState(cast.receiver.games.PlayerState.READY);
	console.log("num ready players " + readyPlayers.length);
	document.getElementById("playerList").innerHTML = "";
	for(var i = 0; i < readyPlayers.length; i++)
	{
		var playerInfo = readyPlayers[i];

		var playerName = playerInfo.playerData.name;
		document.getElementById(missionNum).innerHTML = document.getElementById(missionNum).innerHTML + playerName + "<br>";
	}
}
