var ship = {};
function createShip(specs){
	var neuesSchiff = {};
	neuesSchiff.x = 0;
	neuesSchiff.y = 0;
	neuesSchiff.vx = 0;
	neuesSchiff.vy = 0;
	neuesSchiff.angle = 0;
	neuesSchiff.ctrl = "none";
	neuesSchiff.designation = specs.designation;
	neuesSchiff.fraction = specs.fraction;
	neuesSchiff.active = true;
	neuesSchiff.hp = specs.hp;
	neuesSchiff.shield = specs.shield;
	neuesSchiff.armour = specs.armour;
	neuesSchiff.a = specs.acc;
	neuesSchiff.skin = image[specs.texture];
	if (specs.wp1 !== undefined) neuesSchiff.lightWp = cloneWeapon(specs.wp1);
	if (specs.wp2 !== undefined) neuesSchiff.mediumWp = cloneWeapon(specs.wp2);
	if (specs.wp3 !== undefined) neuesSchiff.heavyWp = cloneWeapon(specs.wp3);
	if (specs.sp1 !== undefined) neuesSchiff.special1 = cloneSpecial(specs.sp1);
	if (specs.sp2 !== undefined) neuesSchiff.special2 = cloneSpecial(specs.sp2);
	if (specs.sp3 !== undefined) neuesSchiff.special3 = cloneSpecial(specs.sp3);
	if (specs.sp4 !== undefined) neuesSchiff.special4 = cloneSpecial(specs.sp4);
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
				spawnProjectile(this.lightWp);
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
		if (this.aim !== undefined && !stop){ 
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
	ship[specs.designation] = neuesSchiff;
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
	
function setupShips(){  //declaration, fraction, texture, hp, shield, armour, acc, wp1, wp2, wp3
	createShip({designation : "Testarrow", fraction : "none", texture : "testarrow", hp : 100, shield : 100, armour : 1, acc : 0.1, wp1 : "5nm machinegun"});
	createShip({designation : "Humanian Shuttle", fraction : "humanian", texture : "humanian_shuttle", hp : 100, shield : 0, armour : 1, acc : 0.1, wp1 : "5nm machinegun"});
	createShip({designation : "Humanian Protobaseship Helonia", fraction : "humanian", texture : "protobaseship_helonia", hp : 8000, shield : 0, armour : 5, acc : 0.03, wp1 : "1.4 mm kolexial gun"});
	createShip({designation : "Fat Man", fraction : "none", texture : "fat dude", hp : 1000, shield : 500, armour : 2, acc : 0.02, wp1 : "5nm machinegun"});
	createShip({designation : "Republic Base", fraction : "republic", texture : "rep_hq", hp : 1000000, shield : 2000000, armour : 3, acc : 0, wp1 : "none"});
	createShip({designation : "Qubanic Colonizer", fraction : "qubanic", texture : "qubanic colonizer", hp : 2000, shield : 0, armour : 1, acc : 0.001});
	createShip({designation : "Ophianian Annector-Star", fraction : "ophianian", texture : "ophianian annector-star", hp : 16666, shield : 0, armour : 2, acc : 0.005, wp1 : "Ophianian Beam (H)", sp1 : "spawn_ophianianChunk",});
	createShip({designation : "Ophianian Chunk", fraction : "ophianian", texture : "ophianian chunk", hp : 200, shield : 0, armour : 1, acc : 0.07, wp1 : "none"});
	
}