var ship = {};
function createShip(declaration, fraction, texture, hp, shield, armour, acc, wp1, wp2, wp3){
	var neuesSchiff = {};
	neuesSchiff.x = 0;
	neuesSchiff.y = 0;
	neuesSchiff.vx = 0;
	neuesSchiff.vy = 0;
	neuesSchiff.angle = 0;
	neuesSchiff.ctrl = "none";
	neuesSchiff.designation = declaration;
	neuesSchiff.fraction = fraction;
	neuesSchiff.active = true;
	neuesSchiff.hp = hp;
	neuesSchiff.shield = shield;
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
	neuesSchiff.explode = function(){
		setTimeout(this.fadeOut, 1000);
		this.active = "explosion";
		audio.explosion1.play();
	}
	neuesSchiff.fadeOut = function(){
		this.active = false;
	}
	ship[declaration] = neuesSchiff;
}

function spawnShip(thatOne, atX, atY, atAngle,  withCtrl){
	var neuerSpawn = ship[thatOne];
	neuerSpawn.x = atX;
	neuerSpawn.y = atY;
	neuerSpawn.angle = atAngle;
	neuerSpawn.ctrl = withCtrl;
	sector[sector.at].ships[sector[sector.at].ships.length] = neuerSpawn;
	setupShips();
}

function displayShips(){
	for (i = 0; i < sector[sector.at].ships.length; i++){
		if (sector[sector.at].ships[i].active === "explosion") Game.ctx.drawImage(image.explosion, sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - frame.y, sector[sector.at].ships[i].skin.naturalWidth, sector[sector.at].ships[i].skin.naturalWidth);
		if (sector[sector.at].ships[i].active === true){
			Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y); // Drehung
			Game.ctx.rotate(sector[sector.at].ships[i].angle * Math.PI / 180);
			Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
			Game.ctx.drawImage(sector[sector.at].ships[i].skin, sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - frame.y); // Display
			Game.ctx.translate(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x, sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 -frame.y); // Rückdrehung
			Game.ctx.rotate(-sector[sector.at].ships[i].angle * Math.PI / 180);
			Game.ctx.translate(-(sector[sector.at].ships[i].x + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.x), -(sector[sector.at].ships[i].y + sector[sector.at].ships[i].skin.naturalWidth/2 - frame.y));
		}
	}
}
	
function setupShips(){
	createShip("testarrow", "none", "testarrow", 100, 100, 0.5, 0.1, "5nm machinegun");
	createShip("humanian_shuttle", "humanian", "humanian_shuttle", 100, 0, 1, 0.1, "5nm machinegun");
	createShip("republic base", "republic", "rep_hq", 2000000, 1000000, 3, 0, "5nm machinegun");
}