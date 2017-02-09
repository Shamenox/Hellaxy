
var Game = {
	event: {}
};

// Setup

var next = [];
var collision = {};
var background = new Image();
var infoScreen = false;
var frame = {
	x: 0,
	y: 0
};


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
	setupEvents();
	setupWeapons();
	setupShips();
	setupNpcs();
	setupSectors();
	console.log(frame);
	background = image.testmap;

	//start drawloop
	draw();
};

// Tatsaechliche Abbildung
function draw() {
	Game.ctx.drawImage(background, -frame.x, -frame.y);
	sector.act()
	physik();
	displayProjectiles();
	displayShips();
	infoScreening();
	Game.ctx.drawImage(image.cursor, cursor.x - 16, cursor.y);
	requestAnimationFrame(draw);
}

function infoScreening() {
	if (intervalReact(key.i && infoScreen)) infoScreen = false;
	if (intervalReact(key.i && !infoScreen)) infoScreen = true;
	if (infoScreen) {
		Game.ctx.lineWidth = 20;
		Game.ctx.fillStyle = "Yellow";
		Game.ctx.strokeStyle = "orange";
		Game.ctx.fillRect(0, 0, 1280, 720);
		Game.ctx.strokeRect(5, 5, 1260, 710);
		Game.ctx.fillStyle = "black";
		Game.ctx.drawImage(sector[sector.at].ships[0].skin, 1000, 100, 240, 240);
		Game.ctx.fillText("Ship Specifications:", 100, 100);
		Game.ctx.fillText("Designation:" + sector[sector.at].ships[0].designation, 100, 150);
		Game.ctx.fillText("Fraction:" + sector[sector.at].ships[0].fraction, 100, 200);
		Game.ctx.fillText("Structure:" + sector[sector.at].ships[0].hp, 100, 250);
		Game.ctx.fillText("Armour:" + sector[sector.at].ships[0].armour, 100, 300);
		Game.ctx.fillText("Structure:" + sector[sector.at].ships[0].hp, 100, 350);
		Game.ctx.fillText("Weapons:", 100, 400);
		if (sector[sector.at].ships[0].lightWp !== undefined) {
			Game.ctx.fillText("Light:", 300, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].lightWp.designation, 300, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].lightWp.ammo, 300, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].lightWp.alpha, 300, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].lightWp.pen, 300, 500);
		}
		if (sector[sector.at].ships[0].mediumWp !== undefined) {
			Game.ctx.fillText("Medium:", 500, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].mediumWp.designation, 500, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].mediumWp.ammo, 500, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].mediumWp.alpha, 500, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].mediumWp.pen, 500, 500);
		}
		if (sector[sector.at].ships[0].heavyWp !== undefined) {
			Game.ctx.fillText("Heavy:", 700, 400);
			Game.ctx.fillText(sector[sector.at].ships[0].heavyWp.designation, 700, 425);
			Game.ctx.fillText("Ammunition: " + sector[sector.at].ships[0].heavyWp.ammo, 700, 450);
			Game.ctx.fillText("Alpha-Damage: " + sector[sector.at].ships[0].heavyWp.alpha, 700, 475);
			Game.ctx.fillText("Penetration: " + sector[sector.at].ships[0].heavyWp.pen, 700, 500);
		}


		Game.ctx.strokeStyle = "yellow";
		Game.ctx.fillStyle = "yellow";
		Game.ctx.lineWidth = 1;
	}
}
// Scripted by Shamenox with a lot of help by Miterosan
