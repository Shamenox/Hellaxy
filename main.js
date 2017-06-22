// Setup

var Game = {};
var SECTOR = {};
var SHIP = {}; //Momentan handelndes Schiff
var LEVEL = {}; //Momentan aktives Level
var player1Pos; //Momentane Schiff-ID des durch den Spieler1 gesteurten Schiffes
var target = "none"; //Missionszielobjekt
var background = new Image(); // Momentanes BG-sample
var infoScreen = false;
var pausedScreen = false;
var stop = false;
var frame = {
	x: 0,
	y: 0
};
frame.adjust = function(){
	if (frame.y < 0) frame.y = 0;
	if (frame.y > sector[sector.at].height - 720) frame.y = sector[sector.at].height - 720;
	if (frame.x > sector[sector.at].width - 1280) frame.x = sector[sector.at].width - 1280;
	if (frame.x < 0) frame.x = 0;
}


// Canvas-Initialisierung
window.onload = function() {
	var canvas = document.getElementById("Canvas");
	Game.ctx = canvas.getContext("2d");
	Game.ctx.font = "24px Consolas";
	Game.ctx.strokeStyle = "yellow";
	Game.ctx.fillStyle = "yellow";

	setupInput();
	loadImages();
	loadAudio();
	setupWeapons();
	setupSpecials();
	console.log(weapon);
	setupNpcs();
	setupShips();
	console.log(ship);
	setupSectors();
	SECTOR = loading;
	setupLevels();
	console.log(frame);
	background = image.blackscreen;

	//start drawloop
	draw();
};

// Tatsaechliche Abbildung
function draw() {
	if (!stop){
		SECTOR.theme.play();
		checkCampaign();
		physik();
	}
	SECTOR.display();
	displayPlanets();
	displayProjectiles();
	displayShips();
	GUI();
	displayMsgs();
	displayCursor();
	requestAnimationFrame(draw);
}

function displayCursor(){
	if (target !== "none" && click){ 
		if (cursor.x <= target.x - frame.x) cursor.angle = get360((Math.atan((target.y -cursor.y - frame.y) / (target.x - cursor.x - frame.x)) / Math.PI * 180) + 90);
		if (cursor.x > target.x - frame.x) cursor.angle = get360((Math.atan((target.y -cursor.y - frame.y) / (target.x - cursor.x - frame.x)) / Math.PI * 180) + 270);
		Game.ctx.translate(cursor.x, cursor.y); // Drehung
		Game.ctx.rotate(cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
		Game.ctx.drawImage(image.testarrow, cursor.x, cursor.y); // Display
		Game.ctx.translate(cursor.x, cursor.y); // Rückdrehung
		Game.ctx.rotate(-cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
	} else {Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y);}
}