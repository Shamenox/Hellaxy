// Setup

var SECTOR = {};
var SHIP = {}; //Momentan handelndes Schiff
var LEVEL = {}; //Momentan aktives Level
var CAMPAIGN = { check : function(){}, theme : "none"};
var player1Pos; //Momentane Schiff-ID des durch den Spieler1 gesteurten Schiffes
var playerShip;
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

		setupWeapons();
		setupSpecials();
		setupNpcs();
		setupShips();
		setupSectors();
		SECTOR = loading;
		setupLevels();
		
		

		/*
// Tatsaechliche Abbildung
function draw() {
	if (!stop){
		CAMPAIGN.check();
		physik();
	}
	SECTOR.act();
	displayProjectiles();
	GUI();
	displayMsgs();
	cursor.display();
	requestAnimationFrame(draw);
}
*/