var ship = {};
function createShip(declaration, fraction, texture, hp, armour, acc, wp1, wp2, wp3){
	var neuesSchiff = {};
	neuesSchiff.x = 0;
	neuesSchiff.y = 0;
	neuesSchiff.vx = 0;
	neuesSchiff.vy = 0;
	neuesSchiff.designation = declaration;
	neuesSchiff.fraction = fraction;
	neuesSchiff.hp = hp;
	neuesSchiff.armour = armour;
	neuesSchiff.a = acc;
	neuesSchiff.skin = image["ship_" + texture];
	if (wp1 !== undefined) neuesSchiff.lightWp = weapon[wp1];
	if (wp2 !== undefined) neuesSchiff.mediumWp = weapon[wp2];
	if (wp3 !== undefined) neuesSchiff.heavyWp = weapon[wp3];
	neuesSchiff.collidesWith = function (obj) {
		var collision = false;
		if (this.x.between(obj.x, obj.x + obj.skin.naturalWidth)){
			if (this.y.between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
			if ((this.y + this.skin.naturalHeight).between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
		}
		if ((this.x + this.skin.naturalWidth).between(obj.x, obj.x + obj.skin.naturalWidth)){
			if (this.y.between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
			if ((this.y + this.skin.naturalHeight).between(obj.y, obj.y + obj.skin.naturalHeight)) collision = true;
		}
		return collision;
	}
	ship[declaration] = neuesSchiff;
}

function spawnShip(declaration, x, y, angle,  ctrl){
	neuesSchiff = ship[declaration];
	neuesSchiff.x = x;
	neuesSchiff.y = y;
	neuesSchiff.angle = angle;
	neuesSchiff.ctrl = ctrl;
	
	console.log(neuesSchiff);
	console.log(ship[declaration]);
	console.log(sector[sector.at].ships[sector[sector.at].ships.length]);
	
	sector[sector.at].ships[sector[sector.at].ships.length] = neuesSchiff;
	
	console.log(neuesSchiff);
	console.log(ship[declaration]);
	console.log(sector[sector.at].ships[sector[sector.at].ships.length]);
}

function displayShips(){
	for (i = 0; i < sector[sector.at].ships.length; i++){
		Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y); // Drehung
		Game.ctx.rotate(sector[sector.at].ships[i].angle * Math.PI / 180);
		Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
		Game.ctx.drawImage(sector[sector.at].ships[i].skin, sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - frame.y); // Display
		Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 -frame.y); // Rückdrehung
		Game.ctx.rotate(-sector[sector.at].ships[i].angle * Math.PI / 180);
		Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
	}
}
	
function setupShips(){
	createShip("testarrow", "none", "testarrow", 100, 1, 0.1, "5nm machinegun");
}