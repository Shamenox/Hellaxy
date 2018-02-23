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
		Helon.ctx.font = "144px Consolas";
		Helon.ctx.fillText("Hellaxy", 350, 240);
		Helon.ctx.font = "24px Consolas";
		if (!intervalReact(true, 500, "title")) Helon.ctx.fillText("> Press Space <", 540, 540);
		Helon.ctx.fillText("developed by Shamenox", 44, 680);
		if (key.space) setScreen("menue");
	});

	
	createScreen("menue", "blackscreen", "theme1", function(){
		Helon.ctx.font = "44px Consolas";
		Helon.ctx.fillText("Hellaxy", 550, 50);
		Helon.ctx.fillText("Main Menu", 520, 100);
		Helon.ctx.font = "24px Consolas";
		if (intervalReact(key.esc)) setScreen("title");
		button(400, 200, 480, 80, "Quicktest Mode", "yellow", function(){startCampaign("quicktest")})
		button(400, 300, 480, 80, "Campaign Mode", "yellow", function(){setScreen("campaign");})
		button(400, 400, 480, 80, "Free-Roam Mode", "yellow", function(){setScreen("freeroam");})
		button(400, 500, 480, 80, "Controls", "yellow", function(){setScreen("controls");})
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
		button(400, 650, 480, 50, "Back", "yellow", function(){setScreen("menue");});
	});
	
	
	createScreen("paused", "blank", "none", function(){
		Hellaxy.sector.display();
		button(400, 350, 480, 50, "Resume to game", "yellow", function(){Hellaxy.task = campaignManager;});
		button(400, 500, 480, 50, "Return to menue", "yellow", function(){Hellaxy.campaign.levels[Hellaxy.campaign.at].cancel(); setScreen("menue");});
		muteButton();

		Helon.ctx.lineWidth = 4;
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.font = "128px Consolas";
		Helon.ctx.strokeText("- Game Paused -", 100, 180);
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("- Game Paused -", 100, 180);
		Helon.ctx.font = "24px Consolas";
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
			Helon.ctx.fillRect(0,0,1280,80);
			Helon.ctx.fillStyle = "white";
			Helon.ctx.fillRect(130,10,1140,60);
			Helon.ctx.strokeStyle = "black";
			Helon.ctx.lineWidth = 10;
			Helon.ctx.strokeRect(10,10,1255,60);
			Helon.ctx.strokeRect(10,10,120,60);
			Helon.ctx.lineWidth = 2;
			Helon.ctx.fillStyle = "black";
			Helon.ctx.fillText("Intercom", 15, 50);
			Helon.ctx.fillText("Continue(E)", 1115, 50);
			
			Helon.ctx.fillText(Hellaxy.msgs[0].content, 145, 50);
			
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
				{button(500, posy - 30, 150, 34, "Continue", "yellow", function(){startCampaign(of.designation)});};
			}
			else {
				Helon.ctx.fillText("Complete!", 500, posy);
			}
		}
		button(700,posy - 30, 150, 34, "New", "yellow", function(){of.at = 0; startCampaign(of.designation)});
	}
	
	createScreen("campaign", "blackscreen", "theme1", function(){
		Helon.ctx.fillText("Campaign Mode", 540, 50);
		Helon.ctx.fillText("Select your campaign:", 490, 80);
		campaignLine("humanian", "Humanian", 150);
		campaignLine("qubanian", "Qubanian", 200);
		//campaignLine("chestanian", "Chestanian", 250);
		button(400, 650, 480, 50, "Back", "yellow", function(){setScreen("menue");})
	});
	
	
	createScreen("freeroam", "blackscreen", "theme1", function(){
		var hor = 1;
		var ver = 1;
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillText("Freeroam Mode", 540, 50);
		Helon.ctx.fillText("Select your ship:", 490, 80);
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
				if (hor > 16) hor = 1, ver++;
		}
		button(400, 650, 480, 50, "Back", "yellow", function(){setScreen("menue");})
	});
}




function GUI(of) {
	if (of !== undefined){
		Helon.ctx.fillStyle = "grey";
		Helon.ctx.fillRect(0,600,1280,120);
		Helon.ctx.fillStyle = "white";
		Helon.ctx.fillRect(9,609,102,102);
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.lineWidth = 10;
		Helon.ctx.strokeRect(9,609,1262,102);
		Helon.ctx.strokeRect(9,609,102,102);
		Helon.ctx.drawImage(of.skin, 14, 614, 92, 92);
		Helon.ctx.fillStyle = "black";
		if (of.maxshield !== 0) Helon.ctx.fillText("Shield:", 120, 645);
		Helon.ctx.fillText("Structure:", 120, 685);
		Helon.ctx.fillStyle = "red";
		if (of.maxshield !== 0) Helon.ctx.fillRect(260, 625, 200, 24);
		Helon.ctx.fillRect(260, 665, 200, 24);
		Helon.ctx.fillStyle = "blue";
		if (of.shield !== 0) Helon.ctx.fillRect(260, 625, 200 * (of.shield / of.maxshield), 24);
		Helon.ctx.fillStyle = "green";
		Helon.ctx.fillRect(260, 665, 200 * (of.hp / of.mass), 24);
		Helon.ctx.lineWidth = 4;
		if (of.shield !== 0) Helon.ctx.strokeRect(260, 625, 200, 24);
		Helon.ctx.strokeRect(260, 665, 200, 24);
		Helon.ctx.lineWidth = 2;
		Helon.ctx.fillStyle = "black";
		if (of.shield !== 0) Helon.ctx.fillText(of.shield, 270, 645);
		Helon.ctx.fillText(of.hp, 270, 685);
		Helon.ctx.fillText("=>" + Hellaxy.sector.ID + " Sector", 1050 , 635);
		Helon.ctx.fillText("  X:" + Math.round(of.x) + " Y:" + Math.round(of.y), 1050 , 665);
		if (of.wp1 !== undefined) {
			Helon.ctx.fillText(of.wp1.designation + ":", 470, 635);
			Helon.ctx.fillText(of.wp1.ammo, 490 + Helon.ctx.measureText(of.wp1.designation).width, 635);
		}
		if (of.wp2 !== undefined) {
			Helon.ctx.fillText(of.wp2.designation + ":", 470, 665);
			Helon.ctx.fillText(of.wp2.ammo, 490 + Helon.ctx.measureText(of.wp2.designation).width, 665);
		}
		if (of.wp3 !== undefined) {
			Helon.ctx.fillText(of.wp3.designation + ":", 470, 695);
			Helon.ctx.fillText(of.wp3.ammo, 490 + Helon.ctx.measureText(of.wp3.designation).width, 695);
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