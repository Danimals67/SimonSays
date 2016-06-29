window.onload = defaults;


var choice;
var colorPicked;
var compOrder            = [];
var userOrder            = [];
var cn                   = 0;
var un                   = 0;
var shape;
var difficulty;
var difficultyState;
var turns                = 1;
var compTurns            = 0;
var userTurns            = 0;
var comp;
var choose;
var index                = 0;
var previousComp;
var rounds               = 0;
var highScore            = 0;
var compare              = 0;
var flashTime            = 500;
var time                 = 0;
var seconds;
var startingTime         = 1500;
var timeDegrade          = 1;
var intervalTime         = 1000;
var width                = 100;
var subWidth             = 2/3;
var enableCountDownTimer = false;
var timer;
var id;
var pass                 = new Audio('pass.wav');
var fail                 = new Audio('fail.wav');

function defaults(){
	document.getElementById("easy").checked = true;
	document.getElementById("square").checked = true;
}

function check(){
	var list = "";
	var uList = "";
	var z =0;
	for(z = 0; z < userOrder.length; z++){
		uList += userOrder[z] + ", ";
	}
	for(x = 0; x < compOrder.length; x++){
		list += compOrder[x] + ", ";
	}
	alert("Computer List: " + list + "\n" + "User List: " + uList + "\n" + "Total Turns: " + turns + "\n" + "Computer Turns: " + compTurns);
}

function changeShape(shape){
	var elem = document.getElementsByClassName("box");
	if(shape == "Square"){
		for(i = 0; i < elem.length; i++){
			elem[i].style.borderRadius = "0px";
		}
	}
	if(shape == "Circle"){
		for(i = 0; i < elem.length; i++){
			elem[i].style.borderRadius = "100px";
		}
	}
}

function changeDifficulty(difficulty){
	if(difficulty == "easy"){
		difficultyState = 1;
	}
	if(difficulty == "medium"){
		difficultyState = 2;
	}
	if(difficulty == "hard"){
		difficultyState = 3;
	}
	switch(difficultyState){
		case 1:
			flashTime = 500;
			timeDegrade = 1;
			time = 0;
			enableCountDownTimer = false;
			document.getElementById("time").innerHTML = "Time: " + time;
			document.getElementById("bar").style.backgroundColor = "rgb(191,191,191)";
			document.getElementById("barProgress").style.backgroundColor = "rgb(191,191,191)";
			document.getElementById("time").style.color = "rgb(133,133,133)";
			break;
		case 2:
			flashTime = 500;
			timeDegrade = 0.85;
			time = 0;
			enableCountDownTimer = false;
			document.getElementById("time").innerHTML = "Time: " + time;
			document.getElementById("bar").style.backgroundColor = "rgb(191,191,191)";
			document.getElementById("barProgress").style.backgroundColor = "rgb(191,191,191)";
			document.getElementById("time").style.color = "rgb(133,133,133)";
			break;
		case 3:
			flashTime = 500;
			timeDegrade = 0.85;
			time = 1500;
			enableCountDownTimer = true;
			document.getElementById("bar").style.width = 100 + '%';
			document.getElementById("time").innerHTML = "Time: 1.50";
			document.getElementById("bar").style.backgroundColor = "rgb(158,255,158)";
			document.getElementById("barProgress").style.backgroundColor = "rgb(255,176,176)";
			document.getElementById("time").style.color = "rgb(0,0,0)";
	}
}

function start(){
	compare = 0;
	rounds = 0;
	time = 1500;
	startingTime = 1500;
	subWidth = 2/3;
	width = 100;
	document.getElementById("start").disabled = true;
	compChooseNew();
	document.getElementById("winLose").innerHTML = "Lost: No";
	document.getElementById("round").innerHTML = "Round: " + rounds;
	document.getElementById("easy").disabled = true;
	document.getElementById("medium").disabled = true;
	document.getElementById("hard").disabled = true;
}

function startTime(){
	timer = setInterval(updateTimer, 10);
	timerBar();
}

function updateTimer(){
	time = time - 10;
	seconds = (time/1000) % 60;
	seconds = seconds.toFixed(2);
	document.getElementById("time").innerHTML = "Time: " + seconds;
	if(seconds <= 0){
			document.getElementById("time").innerHTML = "Time: 0";
			document.getElementById("bar").style.width = 0;
			lost();
	}
}

function timerBar(){
	var elem = document.getElementById("bar");   
	id = setInterval(frame, 10);
	function frame(){
		if(seconds != 0){
		if(width <= 0){
			//clearInteveral(id);
			document.getElementById("bar").style.width = 0;
			//width = 0;
		}
		else{
			width -= subWidth;
			elem.style.width = width + '%'; 
		}
	}
	}
	
}

function secondsUpdate(){
	width = 100;
	time = startingTime + 150;
	startingTime += 150;
	subWidth = 1 / (time/1000);
	//alert("new Time: " + time);
}

function down(){
	if(choice == "topRight"){
		colorPicked = "Red";
		flashOn();
	}
	if(choice == "topLeft"){
		colorPicked = "Blue";
		flashOn();
	}
	if(choice == "bottomRight"){
		colorPicked = "Yellow";
		flashOn();
	}
	if(choice == "bottomLeft"){
		colorPicked = "Green";
		flashOn();
	}
	userOrder[un] = colorPicked;
	un++;
}

function up(){
	if(choice == "topRight"){
		colorPicked = "Red";
		flashOff();
		userTurns++;
	}
	if(choice == "topLeft"){
		colorPicked = "Blue";
		flashOff();
		userTurns++;
	}
	if(choice == "bottomRight"){
		colorPicked = "Yellow";
		flashOff();
		userTurns++;
	}
	if(choice == "bottomLeft"){
		colorPicked = "Green";
		flashOff();
		userTurns++;
	}
	CheckLost();
	compare++;
	if(userTurns == turns){
		pass.play();
		disableButtons();
		userTurns = 0;
		compare = 0;
		
		choose = setTimeout(compChoose, 500);
		//alert("Starting update function");
		secondsUpdate();
		clearInterval(timer);
		clearInterval(id);
	}
}

function CheckLost(){
	//alert("Checking " + compare);
	if (userOrder[compare] !== compOrder[compare]){
		lost();
		//alert("False");
	}
	//else
		//alert("True");
	/*else{
		clearTimeout(choose);
		alert("!");
		document.getElementById("winLose").innerHTML = "You Lost";
		clearInterval(comp);
		document.getElementById("topLeft").disabled = true;
		document.getElementById("topRight").disabled = true;
		document.getElementById("bottomLeft").disabled = true;
		document.getElementById("bottomRight").disabled = true;
		rounds = 0;
	}*/
}

function lost(){
	fail.play();
	userOrder = [];
	compOrder = [];
	turns = 0;
	cn = 0;
	un = 0;
	turns = 1;
	compTurns = 0;
	userTurns = 0;
	index = 0;
	rounds = 0;
	compare = 0;
	intervalTime = 1000;
	flashTime = 500;
	time = 0;
	clearInterval(comp);
	clearInterval(timer);
	clearInterval(id);
	clearTimeout(choose);
	document.getElementById("winLose").innerHTML = "Lost: Yes";
	disableButtons();
	document.getElementById("start").disabled = false;
	document.getElementById("easy").disabled = false;
	document.getElementById("medium").disabled = false;
	document.getElementById("hard").disabled = false;
}

function disableButtons(){
	document.getElementById("topLeft").disabled = true;
	document.getElementById("topRight").disabled = true;
	document.getElementById("bottomLeft").disabled = true;
	document.getElementById("bottomRight").disabled = true;
}

function enableButtons(){
	document.getElementById("topLeft").disabled = false;
	document.getElementById("topRight").disabled = false;
	document.getElementById("bottomLeft").disabled = false;
	document.getElementById("bottomRight").disabled = false;
}

function compChoose(){
	un = 0;
	turns++;
	//compChoosePrevious();
	comp = setInterval(compChoosePrevious, intervalTime);
}

function compChooseNew(){
	
		var i = 0;
		
		i = num = Math.floor((Math.random() * 4) + 1);
		
		if(i == 1){
			colorPicked = "Blue";
			startFlash();
		}
		if(i == 2){
			colorPicked = "Red";
			startFlash();
		}
		if(i == 3){
			colorPicked = "Green";
			startFlash();
		}
		if(i == 4){
			colorPicked = "Yellow";
			startFlash();
		}
		compOrder[cn] = colorPicked;
		cn++;
		
		rounds++;
		if(flashTime > 150){
			flashTime = flashTime * timeDegrade;
			intervalTime = flashTime * 2;
			//alert("Time: " + flashTime + "\n" + "Interval Time: " + intervalTime);
		}
		document.getElementById("round").innerHTML = "Round: " + rounds;
		setTimeout(enableButtons, 500);
		
		if(highScore < rounds){
			highScore = rounds;
			document.getElementById("highScore").innerHTML = "High Score: " + highScore;
		}
		
		if(enableCountDownTimer == true){
			setTimeout(startTime, 500);
		}
		
		//compTurns++;
}


//Something is wrong when finding red FIXED
function compChoosePrevious(){
	//alert("Checking index " + index)
	if(compOrder[index] == "Blue"){
		colorPicked = "Blue";
		startFlash();
	}
	if(compOrder[index] == "Red"){
		colorPicked = "Red";
		startFlash();
	}
	if(compOrder[index] == "Green"){
		colorPicked = "Green";
		startFlash();
	}
	if(compOrder[index] == "Yellow"){
		colorPicked = "Yellow";
		startFlash();
	}
	index++;
	compTurns++;
	var tests = turns - 1;
	//alert("Checking if " + index + " is equal to " + tests);
	if(index == turns - 1){
		compTurns = 0;
		setTimeout(compChooseNew, 1000);
		clearInterval(comp);
		index = 0;
	}
}

function startFlash(){
	flashOn();
	//Change how long it flashes on medium
	setTimeout(flashOff, flashTime);
}

function flashOn(){
	//elem = document.getElementById(choice);
	//force = setInterval(forceOff, 500);
	if(colorPicked == "Red"){
		document.getElementById("topRight").style.backgroundColor = "rgb(222, 42, 42)";
	}
	
	if(colorPicked == "Blue"){
		document.getElementById("topLeft").style.backgroundColor = "rgb(32, 101, 212)";
	}
	
	if(colorPicked == "Green"){
		document.getElementById("bottomLeft").style.backgroundColor = "rgb(46,219,46)";
	}
	
	if(colorPicked == "Yellow"){
		document.getElementById("bottomRight").style.backgroundColor = "rgb(227,224,39)";
	}
	
}

function flashOff(){
	//elem = document.getElementById(choice);
	//Red
	if(colorPicked == "Red"){
		document.getElementById("topRight").style.backgroundColor = "rgb(214, 111, 111)";
	}
	//Blue
	if(colorPicked == "Blue"){
		document.getElementById("topLeft").style.backgroundColor = "rgb(117, 152, 209)";
	}
	//Green
	if(colorPicked == "Green"){
		
		document.getElementById("bottomLeft").style.backgroundColor = "rgb(121, 212, 121)";
	}
	//Yellow
	if(colorPicked == "Yellow"){
		document.getElementById("bottomRight").style.backgroundColor = "rgb(224, 223, 123)";
	}
}