function GUI() {
	if (SECTOR.ships[player1Pos] !== undefined){
		Game.ctx.fillStyle = "grey";
		Game.ctx.fillRect(0,600,1280,120);
		Game.ctx.fillStyle = "white";
		Game.ctx.fillRect(9,609,102,102);
		Game.ctx.strokeStyle = "black";
		Game.ctx.lineWidth = 10;
		Game.ctx.strokeRect(9,609,1262,102);
		Game.ctx.strokeRect(9,609,102,102);
		Game.ctx.drawImage(sector[sector.at].ships[player1Pos].skin, 14, 614, 92, 92);
		Game.ctx.fillStyle = "black";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillText("Shield:", 120, 645);
		Game.ctx.fillText("Structure:", 120, 685);
		Game.ctx.fillStyle = "red";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillRect(260, 625, 200, 24);
		Game.ctx.fillRect(260, 665, 200, 24);
		Game.ctx.fillStyle = "blue";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillRect(260, 625, 200 * (sector[sector.at].ships[player1Pos].shield / ship[sector[sector.at].ships[player1Pos].designation].shield), 24);
		Game.ctx.fillStyle = "green";
		Game.ctx.fillRect(260, 665, 200 * (sector[sector.at].ships[player1Pos].hp / ship[sector[sector.at].ships[player1Pos].designation].hp), 24);
		Game.ctx.lineWidth = 4;
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.strokeRect(260, 625, 200, 24);
		Game.ctx.strokeRect(260, 665, 200, 24);
		Game.ctx.lineWidth = 2;
		Game.ctx.fillStyle = "black";
		if (sector[sector.at].ships[player1Pos].shield !== 0) Game.ctx.fillText(sector[sector.at].ships[player1Pos].shield, 270, 645);
		Game.ctx.fillText(sector[sector.at].ships[player1Pos].hp, 270, 685);
		Game.ctx.fillText("=>" + sector.at, 1050 , 635);
		if (sector[sector.at].ships[player1Pos].lightWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].lightWp.designation + ":", 470, 635);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].lightWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].lightWp.designation).width, 635);
		}
		if (sector[sector.at].ships[player1Pos].mediumWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].mediumWp.designation + ":", 470, 665);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].mediumWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].mediumWp.designation).width, 665);
		}
		if (sector[sector.at].ships[player1Pos].heavyWp !== undefined) {
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].heavyWp.designation + ":", 470, 695);
			Game.ctx.fillText(sector[sector.at].ships[player1Pos].heavyWp.ammo, 490 + Game.ctx.measureText(sector[sector.at].ships[player1Pos].heavyWp.designation).width, 695);
		}
		Game.ctx.strokeStyle = "yellow";
		}
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
	}
	if (intervalReact(key.esc && pausedScreen)) pausedScreen = false, stop = false;
	if (intervalReact(key.esc && !pausedScreen && !stop)) pausedScreen = true, stop = true;
	if (pausedScreen) {
		Game.ctx.lineWidth = 4;
		Game.ctx.font = "128px Consolas";
		Game.ctx.strokeText("- Game Paused -", 100, 180);
		Game.ctx.font = "24px Consolas";
		button(400, 350, 480, 50, "Resume to game", "yellow", function(){pausedScreen = false; stop = false;});
		button(400, 500, 480, 50, "Return to menue", "yellow", function(){pausedScreen = false; stop = false; endLevel(true);});
		Game.ctx.lineWidth = 1;
	}
}