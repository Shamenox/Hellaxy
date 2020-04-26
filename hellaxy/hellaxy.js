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


Hellaxy.main = function(){
	Hellaxy.sector = Helon.screen;
	if (exists(Hellaxy.level.check)) Hellaxy.level.check();
	if (exists(Hellaxy.sector.actShips)) Hellaxy.sector.actShips();
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






//Methoden:
/*
function skipTo(designation, at){
	if (at > Hellaxy.campaigns[designation].levels.length){
		console.log("Level Number out of Bounds");
		return;
	} 
	setCampaign(designation);
	if (Hellaxy.campaign.at > at) Hellaxy.campaign.at = 0;
	for (var lvl = Hellaxy.campaign.at; lvl < at; lvl++){
		startCampaign(designation);
		for (var cond in Hellaxy.level.conditions){
			Hellaxy.level.conditions[cond] = true;
			if (exists(Hellaxy.level.events)) Hellaxy.level.events();
		}
		Hellaxy.level.end();
	}
	startCampaign(designation);
}



function setCampaign(designation){
	Hellaxy.campaign = Hellaxy.campaigns[designation];
	Hellaxy.level = Hellaxy.campaigns[designation].levels[Hellaxy.campaigns[designation].at];
}
 */