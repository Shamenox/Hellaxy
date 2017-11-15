var Hellaxy = {
	msgs : [],
	screen : {},
	campaign : {},
	sector : {},
	ships : {},
	sectors : {},
	campaigns : {},
	planets : {},
	weapons : {},
	locations : {},
};

Hellaxy.loop = function(){
	Hellaxy.Campaign = Hellaxy.campaign;  // Übergangslösung für neue groß-klein-Schreibung
	Hellaxy.Sector = Hellaxy.sector;
	Hellaxy.Screen = Hellaxy.screen;
	var testmap = Hellaxy.sectors["testmap"];
	var central_sector = Hellaxy.sectors["central"];
	var omar_sector = Hellaxy.sectors["omar"];
	var outer_sector = Hellaxy.sectors["outer"];
	var imperial_sector = Hellaxy.sectors["imperial"];
	
	
	Hellaxy.task();
}

function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	Hellaxy.msgs.push(neueMsg);
}

function startCampaign(campaign){
	Hellaxy.screen.theme.pause();
	Hellaxy.campaign = campaign;
	Hellaxy.task = campaignManager;
	player1ship.x = 0;
	player1ship.y = 0;
	LEVEL = Hellaxy.campaign.levels[Hellaxy.campaign.at];
	if (!LEVEL.isSetup) {
		LEVEL.setup();
		LEVEL.isSetup = true;
	}
	Hellaxy.campaign.act();
	Hellaxy.sector.act();
}

function spawnShip(designation, atX, atY, atAngle, ctrl, abgang){
	Hellaxy.sector.spawnShip(designation, atX, atY, atAngle, ctrl, abgang);
}

function display(obj){
	Helon.ctx.translate(obj.x - Hellaxy.sector.offset.x, obj.y - Hellaxy.sector.offset.y); // Drehung
	Helon.ctx.rotate(obj.angle * Math.PI / 180);
	Helon.ctx.translate(-(obj.x - Hellaxy.sector.offset.x), -(obj.y - Hellaxy.sector.offset.y));
	Helon.ctx.drawImage(obj.skin, obj.x - Hellaxy.sector.offset.x - obj.width/2, obj.y - Hellaxy.sector.offset.y - obj.height/2); // Display
	Helon.ctx.translate(obj.x - Hellaxy.sector.offset.x, obj.y - Hellaxy.sector.offset.y); // Rückdrehung
	Helon.ctx.rotate(- obj.angle * Math.PI / 180);
	Helon.ctx.translate(-(obj.x - Hellaxy.sector.offset.x), -(obj.y - Hellaxy.sector.offset.y));
}

function Appstart(){
	setupScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	Hellaxy.screen = title;
	Hellaxy.campaign = quicktest;
	Hellaxy.task = screenManager;
	Helon.app = Hellaxy.loop;
}

