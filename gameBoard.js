function updateTurnColor(turnNum, pass) {
	if (pass) {
		document.getElementById(turnNum).style.borderColor = "blue"; 
	} else {
		document.getElementById(turnNum).style.borderColor = "red";
	}
}

function updateTurn() {
	var el = document.getElementByClass("current");
	if (el) {
		var turn = el.id;
		el.classname = "";
		el.classname = "col-sm-2 turn completed";
		turn++;
		if (turn <= 5)
			document.getElementById(turn).classname += "current";	
	}
}