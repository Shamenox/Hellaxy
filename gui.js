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
		Game.ctx.drawImage(playerShip.skin, 14, 614, 92, 92);
		Game.ctx.fillStyle = "black";
		if (playerShip.maxshield !== 0) Game.ctx.fillText("Shield:", 120, 645);
		Game.ctx.fillText("Structure:", 120, 685);
		Game.ctx.fillStyle = "red";
		if (playerShip.maxshield !== 0) Game.ctx.fillRect(260, 625, 200, 24);
		Game.ctx.fillRect(260, 665, 200, 24);
		Game.ctx.fillStyle = "blue";
		if (playerShip.shield !== 0) Game.ctx.fillRect(260, 625, 200 * (playerShip.shield / playerShip.maxshield), 24);
		Game.ctx.fillStyle = "green";
		Game.ctx.fillRect(260, 665, 200 * (playerShip.hp / playerShip.mass), 24);
		Game.ctx.lineWidth = 4;
		if (playerShip.shield !== 0) Game.ctx.strokeRect(260, 625, 200, 24);
		Game.ctx.strokeRect(260, 665, 200, 24);
		Game.ctx.lineWidth = 2;
		Game.ctx.fillStyle = "black";
		if (playerShip.shield !== 0) Game.ctx.fillText(playerShip.shield, 270, 645);
		Game.ctx.fillText(playerShip.hp, 270, 685);
		Game.ctx.fillText("=>" + SECTOR, 1050 , 635);
		if (playerShip.wp1 !== undefined) {
			Game.ctx.fillText(playerShip.wp1 + ":", 470, 635);
			Game.ctx.fillText(playerShip.wp1.ammo, 490 + Game.ctx.measureText(playerShip.wp1).width, 635);
		}
		if (playerShip.wp2 !== undefined) {
			Game.ctx.fillText(playerShip.wp2 + ":", 470, 665);
			Game.ctx.fillText(playerShip.wp2.ammo, 490 + Game.ctx.measureText(playerShip.wp2).width, 665);
		}
		if (playerShip.wp3 !== undefined) {
			Game.ctx.fillText(playerShip.wp3 + ":", 470, 695);
			Game.ctx.fillText(playerShip.wp3.ammo, 490 + Game.ctx.measureText(playerShip.wp3).width, 695);
		}
		Game.ctx.strokeStyle = "yellow";
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
		Game.ctx.lineWidth = 4;
		Game.ctx.font = "128px Consolas";
		Game.ctx.strokeText("- Game Paused -", 100, 180);
		Game.ctx.font = "24px Consolas";
		button(400, 350, 480, 50, "Resume to game", "yellow", function(){pausedScreen = false; stop = false;});
		button(400, 500, 480, 50, "Return to menue", "yellow", function(){pausedScreen = false; stop = false; LEVEL.cancel();});
		Game.ctx.lineWidth = 1;
	}
}