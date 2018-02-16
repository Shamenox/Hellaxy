var Hellaxy = {
	msgs : [],
	screen : {},
	screens : {},
	campaign : {},
	sector : {},
	ships : {},
	sectors : {},
	campaigns : {},
	planets : {},
	weapons : {},
	projectiles : projectile,
	locations : {},
	scale : 1,
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


function Appstart(){
	setupScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	setScreen("title");
	setCampaign("quicktest");
	Hellaxy.task = screenManager;
	//skipTo("qubanian", 2);
	Helon.app = Hellaxy.loop;
}






//Methoden:


function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	Hellaxy.msgs.push(neueMsg);
}



function setCampaign(designation){
	Hellaxy.campaign = Hellaxy.campaigns[designation];
}



function startCampaign(campaign){
	resetAudio()
	setCampaign(campaign);
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



function spawnShip(designation, atX, atY, atAngle, ctrl, abgang, inSector){
	if (inSector === undefined){
		inSector = Hellaxy.sector;
	} else {
		inSector = Hellaxy.sectors[inSector];
	}
	inSector.spawnShip(designation, atX, atY, atAngle, ctrl, abgang);
}



function spawnSquad(designation, atX, atY, atAngle, quantity, ctrl, abgang, inSector){
	var hor = 0;
	var ver = 0;
	var spawned = 0;
	while (spawned < quantity){
		spawnShip(designation, atX + hor * Hellaxy.ships[designation].width * 2, atY + ver * Hellaxy.ships[designation].height * 2, atAngle, ctrl, abgang, inSector);
		spawned++;
		hor++;
		if (hor >= Math.sqrt(quantity)){
			hor = 0;
			ver++;
		}
	}
}



function display(obj){
	var x = (obj.x - Hellaxy.sector.offset.x) * Hellaxy.scale;
	var y = (obj.y - Hellaxy.sector.offset.y) * Hellaxy.scale;
	Helon.ctx.translate(x, y); // Drehung
	Helon.ctx.rotate(obj.angle * Math.PI / 180);
	Helon.ctx.translate(-x, -y);
	Helon.ctx.drawImage(obj.skin, (x - obj.width/2 * Hellaxy.scale), (y - obj.height/2 * Hellaxy.scale), obj.width * Hellaxy.scale, obj.height * Hellaxy.scale); // Display
	Helon.ctx.translate(x, y); // Rückdrehung
	Helon.ctx.rotate(-obj.angle * Math.PI / 180);
	Helon.ctx.translate(-x, -y);
	
	if (obj.hp !== undefined && obj.hp > 0){
		Helon.ctx.strokeStyle = "red";  //infotafel für Schiffe
		Helon.ctx.fillStyle = "green";
		x -= obj.width/2 * Hellaxy.scale;
		y -= (obj.height/2 * Hellaxy.scale) + 14;
		Helon.ctx.strokeRect(x, y, obj.width * Hellaxy.scale, 6);
		Helon.ctx.fillRect(x, y, obj.width * (obj.hp / obj.mass) * Hellaxy.scale, 6);
		Helon.ctx.fillStyle = "blue";
		Helon.ctx.fillRect(x, y, obj.width * (obj.shield / obj.maxshield) * Hellaxy.scale, 6);
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillStyle = "yellow";
	}
}



function zoomIn(){
	if (intervalReact(Hellaxy.scale > 0.25, 250, "zoom")) Hellaxy.scale -= 0.25;
}


function zoomOut(){
	if (intervalReact(Hellaxy.scale < 1.75, 250, "zoom")) Hellaxy.scale += 0.25;
}