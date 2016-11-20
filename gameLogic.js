var players; 
var leader;
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
}

function changeLeader() {
	leader = (leader++) % players.length;
	gameManager.updateGameData( {'leader': players[leader].playerId}, true);
}

function randomIntFromInterval(min,max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}
