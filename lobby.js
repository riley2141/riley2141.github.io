


function testList(){
	document.getElementById("playerList").innerHTML = "Players<br>Hello<br>test3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>";
}


function displayReadyPlayers(){
	console.log("in display ready players");
	var readyPlayers = gameManager.getPlayersInState(cast.receiver.games.PlayerState.READY);
	console.log("num ready players " + readyPlayers.length);
	document.getElementById("playerList").innerHTML = "";
	for(var i = 0; i < readyPlayers.length; i++)
	{
		var playerInfo = readyPlayers[i];

		var playerName = playerInfo.playerData.name;
		document.getElementById("playerList").innerHTML = document.getElementById("playerList").innerHTML + playerName + "<br>";
	}
}

function displayQuitPlayers(){
	console.log("A player has quit");
}