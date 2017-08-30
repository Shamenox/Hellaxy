class Screen{
	constructor(ID, bg, theme, entities){
		this.ID = ID;
		this.bg = image[bg];
		if (theme !=== undefined){
			this.theme = theme;
		}
		else {
			this.theme = audio.theme1;
		}
		this.entities = function(){};
		this.entities = entities;
	}
	
	display(){
		Helon.ctx.drawImage(this.bg);
		this.theme.play();
		this.entities();
	}
}


loading = new Screen("loading" , "blackscreen", "none", function(){
	Helon.ctx.fillText("Loading... please wait", 200, 200);
	Helon.ctx.rect(40,400,1200,100);
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.fillRect(50,410,1180*(image.loaded/image.quantity),80);
	Helon.ctx.rect(50,410,1180*(image.loaded/image.quantity),80);
	Helon.ctx.stroke();
});

title = new Screen("title", "blackscreen", audio.theme1, function(){
	Helon.ctx.font = "144px Consolas";
	Helon.ctx.fillText("Hellaxy", 350, 240);
	Helon.ctx.font = "24px Consolas";
	if (!intervalReact(true, 1000, "title")) Helon.ctx.fillText("> Press Space <", 540, 540);
	if (key.space) SECTOR = menue;
};

menue = new Screen("menue", "blackscreen", audio.theme1, function(){
	button(400, 100, 480, 100, "Quicktest Mode", "yellow", function(){system.at = 0, CAMPAIGN = system})
	button(400, 250, 480, 100, "Campaign Mode", "yellow", function(){SECTOR = campaign;})
	button(400, 400, 480, 100, "Free-Roam Mode", "yellow", function(){SECTOR = freeroam;})
	button(400, 550, 480, 100, "Controls", "yellow", function(){SECTOR = controls;})
});

campaign = new Screen("campaign", "blackscreen", audio.theme1, function(){
	Helon.ctx.fillText("Campaign Mode", 540, 50);
	Helon.ctx.fillText("Select your campaign:", 490, 80);
	Helon.ctx.fillText("Humanian:   Lvl " + humanian.at, 200, 150);
	if (humanian.levels[humanian.at] !== undefined) {button(500, 115, 130, 50, "Continue", "yellow", function(){CAMPAIGN = humanian});} else {Helon.ctx.fillText("Complete!", 500, 150);}
	button(700, 115, 130, 50, "New", "yellow", function(){humanian.at = 0; CAMPAIGN = humanian;});
	button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = menue;})
});

freeroam = new Screen("freeroam", "blackscreen", audio.theme1, function(){
	var hor = 1;
	var ver = 1;
	Helon.ctx.fillText("Freeroam Mode", 540, 50);
	Helon.ctx.fillText("Select your ship:", 490, 80);
	for (var i = 1; i < Ships.length; i++){
		Helon.ctx.drawImage(Ships[i].skin, hor*130, ver*130, 128, 128);
		if (click && cursor.x.between(hor*130, hor*150 + 128) && cursor.y.between(ver*130, ver*130 + 128)){
			system.at = 1;
			CAMPAIGN = system;
			Ships[i].spawn(central_sector, 100, 100, 180, player1, 0, function(){endLevel(true);});
			return;
		}
		hor++;
		if (hor > 8) hor = 1, ver++;
	}
	button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = menue;})
});

controls = new Screen("controls", "blackscreen", audio.theme1, function(){
	Helon.ctx.fillText("Accelerate forwards = W", 100,100);
	Helon.ctx.fillText("Turn Left = A", 100,150);
	Helon.ctx.fillText("Turn Right = D", 100,200);
	Helon.ctx.fillText("Deccelerate = S", 100,250);
	Helon.ctx.fillText("Light Weapon = Space", 100,300);
	Helon.ctx.fillText("Medium Weapon = E", 100,350);
	Helon.ctx.fillText("Heavy Weapon = Q", 100,400);
	Helon.ctx.fillText("Info-Screen = I", 100,450);
	Helon.ctx.fillText("Special Abilities = 1 - 4", 100,500);
	Helon.ctx.fillText("Pause Game / Skip Dialog = esc", 100,550);
	button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = menue;});
});




function GUI() {
	if (SECTOR.ships[player1Pos] !== undefined){
		Helon.ctx.fillStyle = "grey";
		Helon.ctx.fillRect(0,600,1280,120);
		Helon.ctx.fillStyle = "white";
		Helon.ctx.fillRect(9,609,102,102);
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.lineWidth = 10;
		Helon.ctx.strokeRect(9,609,1262,102);
		Helon.ctx.strokeRect(9,609,102,102);
		Helon.ctx.drawImage(playerShip.skin, 14, 614, 92, 92);
		Helon.ctx.fillStyle = "black";
		if (playerShip.maxshield !== 0) Helon.ctx.fillText("Shield:", 120, 645);
		Helon.ctx.fillText("Structure:", 120, 685);
		Helon.ctx.fillStyle = "red";
		if (playerShip.maxshield !== 0) Helon.ctx.fillRect(260, 625, 200, 24);
		Helon.ctx.fillRect(260, 665, 200, 24);
		Helon.ctx.fillStyle = "blue";
		if (playerShip.shield !== 0) Helon.ctx.fillRect(260, 625, 200 * (playerShip.shield / playerShip.maxshield), 24);
		Helon.ctx.fillStyle = "green";
		Helon.ctx.fillRect(260, 665, 200 * (playerShip.hp / playerShip.mass), 24);
		Helon.ctx.lineWidth = 4;
		if (playerShip.shield !== 0) Helon.ctx.strokeRect(260, 625, 200, 24);
		Helon.ctx.strokeRect(260, 665, 200, 24);
		Helon.ctx.lineWidth = 2;
		Helon.ctx.fillStyle = "black";
		if (playerShip.shield !== 0) Helon.ctx.fillText(playerShip.shield, 270, 645);
		Helon.ctx.fillText(playerShip.hp, 270, 685);
		Helon.ctx.fillText("=>" + SECTOR, 1050 , 635);
		if (playerShip.wp1 !== undefined) {
			Helon.ctx.fillText(playerShip.wp1 + ":", 470, 635);
			Helon.ctx.fillText(playerShip.wp1.ammo, 490 + Helon.ctx.measureText(playerShip.wp1).width, 635);
		}
		if (playerShip.wp2 !== undefined) {
			Helon.ctx.fillText(playerShip.wp2 + ":", 470, 665);
			Helon.ctx.fillText(playerShip.wp2.ammo, 490 + Helon.ctx.measureText(playerShip.wp2).width, 665);
		}
		if (playerShip.wp3 !== undefined) {
			Helon.ctx.fillText(playerShip.wp3 + ":", 470, 695);
			Helon.ctx.fillText(playerShip.wp3.ammo, 490 + Helon.ctx.measureText(playerShip.wp3).width, 695);
		}
		Helon.ctx.strokeStyle = "yellow";
		} /*
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
	} */
	if (intervalReact(key.esc && pausedScreen)) pausedScreen = false, stop = false;
	if (intervalReact(key.esc && !pausedScreen && !stop)) pausedScreen = true, stop = true;
	if (pausedScreen) {
		Helon.ctx.lineWidth = 4;
		Helon.ctx.font = "128px Consolas";
		Helon.ctx.strokeText("- Game Paused -", 100, 180);
		Helon.ctx.font = "24px Consolas";
		button(400, 350, 480, 50, "Resume to game", "yellow", function(){pausedScreen = false; stop = false;});
		button(400, 500, 480, 50, "Return to menue", "yellow", function(){pausedScreen = false; stop = false; LEVEL.cancel();});
		Helon.ctx.lineWidth = 1;
	}
}}