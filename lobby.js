


function testList(){
	document.getElementById("playerList").innerHTML = "Players<br>Hello<br>test3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>";
}


function updatePlayerList(playerList){
	for(var i = 0; i < playerList.length; i++)
	{
		consoleLog("playerList.length: " + playerList.length);
		var playerId = playerList[i];
		var playerName = "";
		if(!(playerId == undefined || playerId == null){
			playerName = playerIdNameMap[playerId];
		}
		document.getElementById("playerList").innerHTML = document.getElementById("playerList").innerHTML + playerName + "<br>";
	}
}