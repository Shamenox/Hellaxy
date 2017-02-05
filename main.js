var Game = {event : {}};

// Setup

var next = [];
var background = new Image();
var infoScreen = false;
var frame = {
	x : 0,
	y : 0
};


// Canvas-Initialisierung
window.onload = function() {
    var canvas = document.getElementById("Canvas");
    Game.ctx = canvas.getContext("2d");
	Game.ctx.font = "24px Calibri";
	Game.ctx.strokeStyle = "yellow";
	Game.ctx.fillStyle = "yellow";

	setupInput();
	loadImages();
	loadAudio();
	setupEvents();
	setupWeapons();
	setupShips();
	setupNpcs();
	setupSectors();
	console.log(frame);
	background = image.testmap;
	console.log(ship.onField[0]);

	//start drawloop
    draw();
};

// Tatsaechliche Abbildung
function draw() {
	Game.ctx.drawImage(background, -frame.x, -frame.y);
	sector.act()
	physik();
	displayShips();
	displayProjectiles();
	infoScreening();
	Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y );
	requestAnimationFrame(draw);
}

function infoScreening(){
	if (intervalReact(key.i && infoScreen)) infoScreen = false;
	if (intervalReact(key.i && !infoScreen)) infoScreen = true;
	if (infoScreen){
		Game.ctx.lineWidth = 20;
		Game.ctx.fillStyle = "Yellow";
		Game.ctx.strokeStyle = "orange";
		Game.ctx.fillRect(0, 0, 1280, 720);
		Game.ctx.strokeRect(5, 5, 1260, 710);
		
		Game.ctx.strokeStyle = "yellow";
		Game.ctx.fillStyle = "yellow";
		Game.ctx.lineWidth = 1;
	}
}
// Scripted by Shamenox with a lot of help by Miterosan
