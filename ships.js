var ship = { onField : [] };
function createShip(declaration, fraction, texture, hp, armour, acc, wp1, wp2, wp3){
	neuesSchiff = {};
	neuesSchiff.x = 0;
	neuesSchiff.y = 0;
	neuesSchiff.designation = declaration;
	neuesSchiff.fraction = fraction;
	neuesSchiff.hp = hp;
	neuesSchiff.armour = armour;
	neuesSchiff.a = acc;
	neuesSchiff.skin = image["ship_" + texture];
	if (wp1 !== undefined) neuesSchiff.lightWp = weapon[wp1];
	if (wp2 !== undefined) neuesSchiff.mediumWp = weapon[wp2];
	if (wp3 !== undefined) neuesSchiff.heavyWp = weapon[wp3];
	//console.log(neuesSchiff);
	ship[declaration] = neuesSchiff;
}

function spawnShip(declaration, x, y, angle,  ctrl){
	ship.onField[ship.onField.length] = ship[declaration];
	ship.onField[ship.onField.length -1].x = x;
	ship.onField[ship.onField.length -1].y = y;
	ship.onField[ship.onField.length -1].vx = 0;
	ship.onField[ship.onField.length -1].vy = 0;
	ship.onField[ship.onField.length -1].angle = angle;
	ship.onField[ship.onField.length -1].ctrl = ctrl;
}

function displayShips(){
	for (i = 0; i < ship.onField.length; i++){
		Game.ctx.translate(ship.onField[i].x + ship.onField[i].skin.naturalWidth/2, ship.onField[i].y + ship.onField[i].skin.naturalWidth/2); // Drehung
		Game.ctx.rotate(ship.onField[i].angle * Math.PI / 180);
		Game.ctx.translate(-(ship.onField[i].x + ship.onField[i].skin.naturalWidth/2), -(ship.onField[i].y + ship.onField[i].skin.naturalWidth/2));
		Game.ctx.drawImage(ship.onField[i].skin, ship.onField[i].x - frame.x, ship.onField[i].y - frame.y); // Display
		Game.ctx.translate(ship.onField[i].x + ship.onField[i].skin.naturalWidth/2, ship.onField[i].y + ship.onField[i].skin.naturalWidth/2); // Rückdrehung
		Game.ctx.rotate(-ship.onField[i].angle * Math.PI / 180);
		Game.ctx.translate(-(ship.onField[i].x + ship.onField[i].skin.naturalWidth/2), -(ship.onField[i].y + ship.onField[i].skin.naturalWidth/2));
	}
}
	
function setupShips(){
	createShip("testarrow", "none", "testarrow", 100, 1, 0.1, "5nm machinegun");
}