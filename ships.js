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
	neuesSchiff.skin = image[texture];
	if (wp1 !== undefined) neuesSchiff.lightWp = cloneWeapon(wp1);
	if (wp2 !== undefined) neuesSchiff.mediumWp = cloneWeapon(wp2);
	if (wp3 !== undefined) neuesSchiff.heavyWp = cloneWeapon(wp3);
	neuesSchiff.acc = function(){
		this.vy += Math.cos(this.angle * Math.PI / 180) * this.a;
		this.vx += Math.cos((this.angle - 90) * Math.PI / 180) * this.a;
	}
	neuesSchiff.dec = function(){
		if (this.angle < 180 && this.vx > 0 || this.angle > 180 && this.vx < 0) this.vx -= Math.cos((this.angle - 90) * Math.PI / 180) * this.a;
		if (this.angle.between(90, 270) && this.vy < 0 || !this.angle.between(90, 270) && this.vy > 0) this.vy -= Math.cos(this.angle * Math.PI / 180) * this.a;
	}
	neuesSchiff.fireSmall = function(){
		if (this.lightWp !== undefined) {              //Feuern
			if (intervalReact(this.lightWp.ammo > 0, this.lightWp.reload, this.lightWp.designation + this.ID)) {
				this.lightWp.ammo -= 1;
				spawnProjectile(sector[sector.at].ships[this.ID], "light");
			}
		}
	}
	neuesSchiff.collidesWith = function (Suspect) {
		if (this.fraction === Suspect.fraction) return false;
		var collision = false;
		if (this.x === Suspect.x || this.x.between(Suspect.x, Suspect.x + Suspect.skin.naturalWidth) || (this.x + this.skin.naturalWidth).between(Suspect.x, Suspect.x + Suspect.skin.naturalWidth)){
			if (this.y === Suspect.y) collision = true;
			if (this.y.between(Suspect.y, Suspect.y + Suspect.skin.naturalHeight)) collision = true;
			if ((this.y + this.skin.naturalHeight).between(Suspect.y, Suspect.y + Suspect.skin.naturalHeight)) collision = true;
		}
		return collision;
	}
	neuesSchiff.killSwitch = function(){
		this.active = false;
	}
	neuesSchiff.explode = function(){
		setTimeout(this.killSwitch, 2000);
		this.active = "explosion";
		audio.explosion1.play();
		if (this.abgang !== undefined) this.abgang();
	}
	neuesSchiff.turn = function(){ // Richtungsfindung
		if (this.aim !== undefined){ 
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){ this.angle += this.a * 100;} else {this.angle -= this.a * 40;}
			} else {
				if (this.aim.between(this.angle, this.angle - 180)){ this.angle -= this.a * 100;} else {this.angle += this.a * 40;}
			}
			if (Math.abs(this.aim - this.angle) <= this.a * 100) this.angle = this.aim;
		}
	}
	neuesSchiff.distanceTo = function(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.x - this.x)*(distanced.x - this.x));
	}
	neuesSchiff.angleTowards = function (angled){
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 270);
	}
	neuesSchiff.pointAt = function(toPointAt){ // Festlegen eines Zielwinkels
		this.aim = this.angleTowards(toPointAt);
	}
	neuesSchiff.pointFrom = function(toPointFrom){ // Festlegen eines Zielwinkels
		this.aim = get360(this.angleTowards(toPointFrom) + 180);
	}
	neuesSchiff.pointsAt = function(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 3, this.angleTowards(Suspect) - 3)) return true;
		return false;
	}
	neuesSchiff.turnArround = function(){ // Initialisieren einer 180° Drehung
		this.aim = get360(this.angle - 180);
	}
	neuesSchiff.nextShip = function(search, range){
		if (search === undefined) search = "anything";
		if (range === undefined) range = 1000;
		for (h = 0; h <= range; h ++){
			for (k = 0; k < sector[sector.at].ships.length; k++){
				if (this.distanceTo(sector[sector.at].ships[k]) <= h && k !== this.ID){
					if (search === "anything" && sector[sector.at].ships[k].active === true || search === "anythingElse" && sector[sector.at].ships[k].fraction !== this.fraction && sector[sector.at].ships[k].active === true || sector[sector.at].ships[k].fraction === search && sector[sector.at].ships[k].active === true) return sector[sector.at].ships[k];
				}
			}
		}
		return false;
	}
	neuesSchiff.follow = function(toFollow, atDistance){
		if (this.distanceTo(toFollow) > atDistance) {
			this.pointAt (toFollow);
			if (this.pointsAt(toFollow)) this.acc();
		} else {this.dec();}
	}
	ship[declaration] = neuesSchiff;
}

function spawnShip(thatOne, atX, atY, atAngle, ctrl, relationShip, abgang){
	var neuerSpawn = ship[thatOne];
	neuerSpawn.x = atX;
	neuerSpawn.y = atY;
	neuerSpawn.angle = atAngle;
	neuerSpawn.ctrl = ctrl;
	neuerSpawn.relationShipID = relationShip;
	neuerSpawn.abgang = abgang;
	neuerSpawn.ID = sector[sector.at].ships.length;
	sector[sector.at].ships.push(neuerSpawn);
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
			if (sector[sector.at].ships[i].ctrl !== player1){
				sector[sector.at].ships[i].turn();
				Game.ctx.strokeStyle = "red";  //infotafel
				Game.ctx.fillStyle = "green";
				Game.ctx.strokeRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth, 6);
				Game.ctx.fillRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth * (sector[sector.at].ships[i].hp / ship[sector[sector.at].ships[i].designation].hp), 6);
				Game.ctx.fillStyle = "blue";
				Game.ctx.fillRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth * (sector[sector.at].ships[i].shield / ship[sector[sector.at].ships[i].designation].shield), 6);
				Game.ctx.strokeStyle = "yellow";
				Game.ctx.fillStyle = "yellow";
			}
		}
	}
}
	
function setupShips(){
	createShip("Testarrow", "none", "testarrow", 100, 100, 1, 0.1, "5nm machinegun");
	createShip("Humanian Shuttle", "humanian", "humanian_shuttle", 100, 0, 1, 0.05, "5nm machinegun");
	createShip("Humanian Protobaseship Helonia","humanian", "protobaseship_helonia", 8000, 0, 5, 0.03, "1.4 mm kolexial gun");
	createShip("Republic Base", "republic", "rep_hq", 2000000, 1000000, 3, 0, "5nm machinegun");
	createShip("Fat Man", "none", "fat dude", 1000, 500, 2, 0.02, "5nm machinegun");
	createShip("Qubanic Colonizer","qubanic", "qubanic colonizer", 2800, 0, 1, 0.001,"none");
}