class Screen{
	constructor(ID, bg, theme, action){
		this.ID = ID;
		this.bg = Helon.ress.images[bg];
		this.act = action;
		if (theme !== undefined && theme !== "none"){
			this.theme = Helon.ress.audio[theme];
		}
		else {
			this.theme = "none";
		}
	}
	
	act(){};
	
	display(){
		Helon.ctx.drawImage(this.bg, 0, 0);
		loop(this.theme);
		this.act();
	}
}


function createScreen(ID, bg, theme, action){
	Hellaxy.screens[ID] = new Screen(ID, bg, theme, action);
}


function setScreen(ID){
	Hellaxy.screen = Hellaxy.screens[ID];
}

function screenManager(){
	Hellaxy.screen.display();
}


function addMsg(content){
	var neueMsg = {};
	neueMsg.content = content;
	Hellaxy.msgs.push(neueMsg);
}


function setupScreens(){

	createScreen("title", "blackscreen", "theme1", function(){
		Helon.ctx.font = "244px Consolas";
		Helon.ctx.fillText("Hellaxy", 480, 320);
		Helon.ctx.font = "32px Consolas";
		if (!intervalReact(true, 500, "title")) Helon.ctx.fillText("> Press Space <", 800, 640);
		Helon.ctx.fillText("developed by Shamenox", 44, 980);
		if (key.space) setScreen("menue");
	});

	
	createScreen("menue", "blackscreen", "theme1", function(){
		Helon.ctx.font = "64px Consolas";
		Helon.ctx.fillText("Hellaxy", 850, 80);
		Helon.ctx.fillText("Main Menu", 810, 160);
		Helon.ctx.font = "32px Consolas";
		if (intervalReact(key.esc)) setScreen("title");
		button(660, 300, 600, 100, "Quicktest Mode", "yellow", function(){startCampaign("quicktest")})
		button(660, 450, 600, 100, "Campaign Mode", "yellow", function(){setScreen("campaign");})
		button(660, 600, 600, 100, "Free-Roam Mode", "yellow", function(){setScreen("freeroam");})
		button(660, 750, 600, 100, "Controls", "yellow", function(){setScreen("controls");})
		muteButton();
	});

	
	createScreen("controls", "blackscreen", "theme1", function(){
		Helon.ctx.fillText("Accelerate forwards = W", 100,100);
		Helon.ctx.fillText("Turn Left = A", 100,150);
		Helon.ctx.fillText("Turn Right = D", 100,200);
		Helon.ctx.fillText("Deccelerate = S", 100,250);
		Helon.ctx.fillText("Light Weapon = Space", 100,300);
		Helon.ctx.fillText("Medium Weapon = E", 100,350);
		Helon.ctx.fillText("Heavy Weapon = Q", 100,400);
		Helon.ctx.fillText("Special Abilities = 1 - 3", 100,450);
		Helon.ctx.fillText("Pause Game / Skip Dialog = esc", 100,500);
		Helon.ctx.fillText("Point at cursor / Show targets direction = Left mouse button", 100,550);
		Helon.ctx.fillText("Zoom in / out = + / -", 100,600);
		button(660, 900, 600, 100, "Back", "yellow", function(){setScreen("menue");});
	});
	
	
	createScreen("paused", "blank", "none", function(){
		Hellaxy.sector.display();
		button(660, 400, 600, 100, "Resume to game", "yellow", function(){Hellaxy.task = campaignManager;});
		button(660, 600, 600, 100, "Return to menue", "yellow", function(){Hellaxy.campaign.levels[Hellaxy.campaign.at].cancel(); setScreen("menue");});
		muteButton();

		Helon.ctx.lineWidth = 8;
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.font = "204px Consolas";
		Helon.ctx.strokeText("- Game Paused -", 100, 240);
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("- Game Paused -", 100, 240);
		Helon.ctx.font = "32px Consolas";
		Helon.ctx.lineWidth = 1;
	});
	
	
	createScreen("messager", "blank", "none", function(){
		if (Hellaxy.msgs.length === 0){
			Hellaxy.task = campaignManager;
		}
		else{
			loop(Hellaxy.sector.theme);
			Hellaxy.sector.display();
			Helon.ctx.fillStyle = "grey";
			Helon.ctx.fillRect(0,0,1920,130);
			Helon.ctx.fillStyle = "white";
			Helon.ctx.fillRect(170,10,1740,110);
			Helon.ctx.strokeStyle = "black";
			Helon.ctx.lineWidth = 10;
			Helon.ctx.strokeRect(10,10,1895,110);
			Helon.ctx.strokeRect(10,10,160,110);
			Helon.ctx.lineWidth = 2;
			Helon.ctx.fillStyle = "black";
			Helon.ctx.fillText("Intercom", 18, 70);
			Helon.ctx.fillText("Continue(E)", 1700, 100);
			
			if (Hellaxy.msgs.length > 1) Helon.ctx.fillText(Hellaxy.msgs[1].content, 190, 100);
			Helon.ctx.fillText(Hellaxy.msgs[0].content, 190, 50);
			
			Helon.ctx.strokeStyle = "yellow";
			Helon.ctx.fillStyle = "yellow";
			Helon.ctx.lineWidth = 1;
			if (intervalReact(key.e, 500, "msgDelay")){
				Hellaxy.msgs.splice(0,1);
			}
			if (intervalReact(intervalReact(key.esc, 500, "esc"))){
				Hellaxy.msgs.splice(0, Hellaxy.msgs.length);
			}
		}
	});
	
	
	function campaignLine(of, designation, posy){
		of = Hellaxy.campaigns[of];
		Helon.ctx.fillText(designation + ":   Lvl " + of.at, 200, posy);
		if (of.at !== 0){
			if (of.at !== of.levels.length){
				{button(600, posy - 36, 180, 48, "Continue", "yellow", function(){startCampaign(of.designation)});};
			}
			else {
				Helon.ctx.fillText("Complete!", 600, posy);
			}
		}
		button(900,posy - 36, 180, 48, "New", "yellow", function(){of.at = 0; startCampaign(of.designation)});
	}
	
	createScreen("campaign", "blackscreen", "theme1", function(){
		Helon.ctx.fillText("Campaign Mode", 850, 50);
		Helon.ctx.fillText("Select your campaign:", 810, 80);
		campaignLine("humanian", "Humanian", 150);
		campaignLine("qubanian", "Qubanian", 220);
		//campaignLine("chestanian", "Chestanian", 250);
		button(660, 900, 600, 100, "Back", "yellow", function(){setScreen("menue");});
	});
	
	
	createScreen("freeroam", "blackscreen", "theme1", function(){
		var hor = 1;
		var ver = 1;
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillText("Freeroam Mode", 850, 50);
		Helon.ctx.fillText("Select your ship:", 810, 80);
		for (var shiptype in Hellaxy.ships){
				Helon.ctx.drawImage(Hellaxy.ships[shiptype].skin, hor*70, ver*70 + 50, 64, 64);
				if (cursor.x.between(hor*70, hor*70 + 64) && cursor.y.between(ver*70 + 50, ver*70 + 114)){
					Helon.ctx.strokeRect(hor*70 - 4, ver*70 + 46, 70, 70);
					if (click){
						Hellaxy.sectors.central.spawnShip(Hellaxy.ships[shiptype].fraction + "_" + Hellaxy.ships[shiptype].designation, 1000, 1000, 0, player1, 0, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
						startCampaign("freeroaming");
					}
				}
				hor++;
				if (hor > 24) hor = 1, ver++;
		}
		button(660, 900, 600, 100, "Back", "yellow", function(){setScreen("menue");});
	});
}




function GUI(of) {
	if (exists(of)){
		Helon.ctx.fillStyle = "grey";
		Helon.ctx.fillRect(0,960,1920,120);
		Helon.ctx.fillStyle = "white";
		Helon.ctx.fillRect(9,969,102,102);
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.lineWidth = 10;
		Helon.ctx.strokeRect(9,969,1902,102);
		Helon.ctx.strokeRect(9,969,102,102);
		Helon.ctx.drawImage(of.skin, 14, 974, 92, 92);
		Helon.ctx.fillStyle = "black";
		if (of.maxshield !== 0) Helon.ctx.fillText("Shield:", 120, 1005);
		Helon.ctx.fillText("Structure:", 120, 1045);
		Helon.ctx.fillStyle = "red";
		if (of.maxshield !== 0) Helon.ctx.fillRect(300, 980, 200, 30);
		Helon.ctx.fillRect(300, 1020, 200, 30);
		Helon.ctx.fillStyle = "cyan";
		if (of.shield !== 0) Helon.ctx.fillRect(300, 980, 200 * (of.shield / of.maxshield), 30);
		Helon.ctx.fillStyle = "green";
		Helon.ctx.fillRect(300, 1020, 200 * (of.hp / of.mass), 30);
		Helon.ctx.lineWidth = 4;
		if (of.shield !== 0) Helon.ctx.strokeRect(300, 980, 200, 30);
		Helon.ctx.strokeRect(300, 1020, 200, 30);
		Helon.ctx.lineWidth = 2;
		Helon.ctx.fillStyle = "black";
		if (of.shield !== 0) Helon.ctx.fillText(of.shield, 310, 1005);
		Helon.ctx.fillText(of.hp, 310, 1045);
		Helon.ctx.fillText("=>" + Hellaxy.sector.ID + " Sector", 1600 , 1000);
		Helon.ctx.fillText("  X:" + Math.round(of.x) + " Y:" + Math.round(of.y), 1600 , 1040);
		if (of.wp1 !== undefined) {
			Helon.ctx.fillText(of.wp1.designation + ":", 550, 1000);
			Helon.ctx.fillText(of.wp1.ammo, 580 + Helon.ctx.measureText(of.wp1.designation).width, 1000);
			if (!queue[of.wp1.designation + of.staticID]){
				Helon.ctx.strokeStyle = "green";
				Helon.ctx.strokeText("Loaded", 650 + Helon.ctx.measureText(of.wp1.designation).width, 1000);
				Helon.ctx.strokeStyle = "black";
			}
		}
		if (of.wp2 !== undefined) {
			Helon.ctx.fillText(of.wp2.designation + ":", 550, 1030);
			Helon.ctx.fillText(of.wp2.ammo, 580 + Helon.ctx.measureText(of.wp2.designation).width, 1030);
			if (!queue[of.wp1.designation + of.staticID]){
				Helon.ctx.strokeStyle = "green";
				Helon.ctx.strokeText("Loaded", 650 + Helon.ctx.measureText(of.wp1.designation).width, 1030);
				Helon.ctx.strokeStyle = "black";
			}
		}
		if (of.wp3 !== undefined) {
			Helon.ctx.fillText(of.wp3.designation + ":", 550, 1340);
			Helon.ctx.fillText(of.wp3.ammo, 580 + Helon.ctx.measureText(of.wp3.designation).width, 1060);
			if (!queue[of.wp1.designation + of.staticID]){
				Helon.ctx.strokeStyle = "green";
				Helon.ctx.strokeText("Loaded", 650 + Helon.ctx.measureText(of.wp1.designation).width, 1060);
				Helon.ctx.strokeStyle = "black";
			}
		}
		Helon.ctx.strokeStyle = "yellow";
	} 
}
		
		/*
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
	}
} */