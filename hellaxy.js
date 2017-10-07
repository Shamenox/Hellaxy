var Hellaxy = {
	Msgs : [],
	Screen : {},
	Campaign : {},
	Sector : {},
};

Hellaxy.loop = function(){
	Hellaxy.task();
}

function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	Hellaxy.Msgs.push(neueMsg);
}

function startCampaign(campaign){
	Hellaxy.Campaign = campaign;
	Hellaxy.task = campaignManager;
	LEVEL = Hellaxy.Campaign.levels[Hellaxy.Campaign.at];
	Hellaxy.Campaign.check();
}

function display(obj){
	Helon.ctx.translate(obj.x - Hellaxy.Sector.offset.x, obj.y - Hellaxy.Sector.offset.y); // Drehung
	Helon.ctx.rotate(obj.angle * Math.PI / 180);
	Helon.ctx.translate(-(obj.x - Hellaxy.Sector.offset.x), -(obj.y - Hellaxy.Sector.offset.y));
	Helon.ctx.drawImage(obj.skin, obj.x - Hellaxy.Sector.offset.x - obj.skin.naturalWidth/2, obj.y - Hellaxy.Sector.offset.y - obj.skin.naturalHeight/2); // Display
	Helon.ctx.translate(obj.x - Hellaxy.Sector.offset.x, obj.y - Hellaxy.Sector.offset.y); // Rückdrehung
	Helon.ctx.rotate(- obj.angle * Math.PI / 180);
	Helon.ctx.translate(-(obj.x - Hellaxy.Sector.offset.x), -(obj.y - Hellaxy.Sector.offset.y));
}

function Appstart(){
	setupScreens();
	setupWeapons();
	setupSpecials();
	setupControls();
	setupShips();
	setupSectors();
	setupLevels();
	Hellaxy.Screen = title;
	Hellaxy.Campaign = quicktest;
	Hellaxy.task = screenManager;
	Helon.app = Hellaxy.loop;
}

