// Setup

var Game = {};
var SECTOR = {};
var SHIP = {}; //Momentan handelndes Schiff
var LEVEL = {}; //Momentan aktives Level
var CAMPAIGN = { check : function(){}, theme : "none"};
var player1Pos; //Momentane Schiff-ID des durch den Spieler1 gesteurten Schiffes
var target = "none"; //Missionszielobjekt
var infoScreen = false;
var pausedScreen = false;
var stop = false;
var frame = {
	x: 0,
	y: 0
};
frame.adjust = function(){
	if (frame.y < 0) frame.y = 0;
	if (frame.y > SECTOR.height - 720) frame.y = SECTOR.height - 720;
	if (frame.x > SECTOR.width - 1280) frame.x = SECTOR.width - 1280;
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
	setupNpcs();
	setupShips();
	setupSectors();
	SECTOR = loading;
	setupLevels();

	//start drawloop
	draw();
};

// Tatsaechliche Abbildung
function draw() {
	if (!stop){
		CAMPAIGN.check();
		physik();
	}
	SECTOR.display();
	displayProjectiles();
	displayShips();
	GUI();
	displayMsgs();
	displayCursor();
	requestAnimationFrame(draw);
}

function displayCursor(){
	if (LEVEL.target !== "none" && LEVEL.target !== undefined && click){ 
		if (cursor.x <= LEVEL.target.x - frame.x) cursor.angle = get360((Math.atan((LEVEL.target.y -cursor.y - frame.y) / (LEVEL.target.x - cursor.x - frame.x)) / Math.PI * 180) + 90);
		if (cursor.x > LEVEL.target.x - frame.x) cursor.angle = get360((Math.atan((LEVEL.target.y -cursor.y - frame.y) / (LEVEL.target.x - cursor.x - frame.x)) / Math.PI * 180) + 270);
		Game.ctx.translate(cursor.x, cursor.y); // Drehung
		Game.ctx.rotate(cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
		Game.ctx.drawImage(image.testarrow, cursor.x, cursor.y); // Display
		Game.ctx.translate(cursor.x, cursor.y); // Rückdrehung
		Game.ctx.rotate(-cursor.angle * Math.PI / 180);
		Game.ctx.translate(-(cursor.x), -(cursor.y));
	} else {Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y);}
}