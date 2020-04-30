var Hellaxy = new App();
	Hellaxy.name = "Hellaxy";
	Hellaxy.sector = {};
	Hellaxy.msgs = [];
	Hellaxy.campaign = {};
	Hellaxy.level = {};
	Hellaxy.ships = {};
	Hellaxy.sectors = {};
	Hellaxy.campaigns = {};
	Hellaxy.planets = {};
	Hellaxy.weapons = {};
	Hellaxy.locations = {};
	Hellaxy.playerShip = {};


Hellaxy.main = function(){
	Hellaxy.sector = Helon.screen;
	if (exists(Hellaxy.level.check)) Hellaxy.level.check();
}


Hellaxy.startUp = function(){
	setupHellaxyScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	setScreen("title");
	console.log("HINT: If something is UNDEFINED and you cant find why, check for THIS. !!!");
}