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
	gameManager.updateGameData( {'missionNum' : 1}, true);
	gameManager.updateGameData({"missionTeamSize" : missionTeamSizes[1][gameManager.getPlayersInState(cast.receiver.games.PlayerState.PLAYING).length] }, true);
	alertLeader();
	
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
