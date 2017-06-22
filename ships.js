class Ship {
	constructor(specs){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
		this.designation = designation;
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.a = 0;
		this.angle = 0;
		this.shield = 0;
		this.armour = 1;
		this.aim = 0;
		this.ctrl = "none";
		this.active = true;
		this.skin = image[this.fraction + " " + this.designation]
		for (var property in specs){
			this.property = specs.property;
		}
	}
	
	
	acc(){
		this.vy += Math.cos(this.angle * Math.PI / 180) * this.a;
		this.vx += Math.cos((this.angle - 90) * Math.PI / 180) * this.a;
	}
	
	
	dec(){
		if (this.angle < 180 && this.vx > 0 || this.angle > 180 && this.vx < 0) this.vx -= Math.cos((this.angle - 90) * Math.PI / 180) * this.a;
		if (this.angle.between(90, 270) && this.vy < 0 || !this.angle.between(90, 270) && this.vy > 0) this.vy -= Math.cos(this.angle * Math.PI / 180) * this.a;
	}
	
	
	fire(slot){
		if (this["wp" + slot] === undefined) return;
		if (intervalReact(this["wp" + slot].ammo > 0, this["wp" + slot].reload, "wp" + slot + this.ID)) this["wp" + slot].fire();
	}
	
	
	collidesWith(Suspect) {
		if (Suspect === undefined || this.fraction === Suspect.fraction) return false;
		if (Suspect.fraction === "portal"){
			if (this.x.between(Suspect.x - this.skin.naturalWidth/2, Suspect.x + this.skin.naturalWidth/2 + Suspect.width)){
				if (this.y.between(Suspect.y - this.skin.naturalHeight/2, Suspect.y + this.skin.naturalHeight/2 + Suspect.height)) return true;
			}
			return false;
		}
		if (this.x.between(Suspect.x - this.skin.naturalWidth/2 - Suspect.skin.naturalWidth/2, Suspect.x + this.skin.naturalWidth/2 + Suspect.skin.naturalWidth/2)){
			if (this.y.between(Suspect.y - this.skin.naturalHeight/2 - Suspect.skin.naturalHeight/2, Suspect.y + this.skin.naturalHeight/2 + Suspect.skin.naturalHeight/2)) return true;
		}
		return false;
	}
	
	
	explode(){
		this.active = "explosion";
		audio.explosion1.play();
		if (this.abgang !== undefined) this.abgang();
		setTimeout(function(){this.active = false;}, 2000);
	}
	
	
	turn(){ // Richtungsfindung
		if (!stop){ 
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){ this.angle += this.a * 100;} else {this.angle -= this.a * 40;}
			} else {
				if (this.aim.between(this.angle, this.angle - 180)){ this.angle -= this.a * 100;} else {this.angle += this.a * 40;}
			}
			if (Math.abs(this.aim - this.angle) <= this.a * 100) this.angle = this.aim;
		}
	}
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.x - this.x)*(distanced.x - this.x));
	}
	
	
	angleTowards(angled){
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 270);
	}
	
	
	pointAt(toPointAt){ // Festlegen eines Zielwinkels
		this.aim = this.angleTowards(toPointAt);
	}
	
	
	pointsAt(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 3, this.angleTowards(Suspect) - 3)) return true;
		return false;
	}
	
	
	pointFrom(toPointFrom){ // Festlegen eines Zielwinkels
		this.aim = get360(this.angleTowards(toPointFrom) + 180);
	}
	
	
	turnArround(){ // Initialisieren einer 180° Drehung
		this.aim = get360(this.angle - 180);
	}
	
	
	nextShip(search, range){
		if (range === undefined) range = 1000;
		for (var h = 0; h <= range; h ++){
			for (var k = 0; k < sector[sector.at].ships.length; k++){
				if (this.distanceTo(sector[sector.at].ships[k]) <= h && k !== this.ID){
					if (search === undefined && sector[sector.at].ships[k].active === true || search === "anythingElse" && sector[sector.at].ships[k].fraction !== this.fraction && sector[sector.at].ships[k].active === true || sector[sector.at].ships[k].fraction === search && sector[sector.at].ships[k].active === true) return sector[sector.at].ships[k];
				}
			}
		}
		return false
	}
	
	
	follow(toFollow, atDistance){
		if (this.distanceTo(toFollow) > atDistance) {
			this.pointAt (toFollow);
			if (this.pointsAt(toFollow)) this.acc();
		}
		else this.dec();
	}
	
	
	spawn(inSector, atX, atY, atAngle, ctrl, relationShip, abgang){ //inSector, atX, atY, atAngle, ctrl, relationShip, abgang
		if (inSector === undefined) inSector = sector.at;
		var neuerSpawn = this.clone();
		neuerSpawn.x = atX;
		neuerSpawn.y = atY;
		neuerSpawn.angle = atAngle;
		neuerSpawn.ctrl = ctrl;
		neuerSpawn.relationShipID = relationShip;
		neuerSpawn.abgang = abgang;
		neuerSpawn.ID = sector[inSector].ships.length;
		sector[inSector].ships.push(neuerSpawn);
	}
}


function displayShips(){
	for (i = 0; i < sector[sector.at].ships.length; i++){
		SHIP = sector[sector.at].ships[i];
		if (SHIP === "explosion") Game.ctx.drawImage(image.explosion, SHIP.x - frame.x, SHIP.y - frame.y, SHIP.skin.naturalWidth, SHIP.skin.naturalWidth);
		if (SHIP.active === true){
			Game.ctx.translate(SHIP.x - frame.x, SHIP.y - frame.y); // Drehung
			Game.ctx.rotate(SHIP.angle * Math.PI / 180);
			Game.ctx.translate(-(SHIP.x - frame.x), -(SHIP.y - frame.y));
			Game.ctx.drawImage(SHIP.skin, SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - frame.y - SHIP.skin.naturalHeight/2); // Display
			Game.ctx.translate(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y -frame.y); // Rückdrehung
			Game.ctx.rotate(-sector[sector.at].ships[i].angle * Math.PI / 180);
			Game.ctx.translate(-(sector[sector.at].ships[i].x - frame.x), -(sector[sector.at].ships[i].y - frame.y));
			if (SHIP.ctrl !== player1){
				Game.ctx.strokeStyle = "red";  //infotafel
				Game.ctx.fillStyle = "green";
				Game.ctx.strokeRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, sector[sector.at].ships[i].y - 12 - frame.y - SHIP.skin.naturalHeight/2, sector[sector.at].ships[i].skin.naturalWidth, 6);
				Game.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.hp / [SHIP.fraction + " " + SHIP.designation].hp), 6);
				Game.ctx.fillStyle = "blue";
				Game.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.shield / [SHIP.fraction + " " + SHIP.designation].shield), 6);
				Game.ctx.strokeStyle = "yellow";
				Game.ctx.fillStyle = "yellow";
			}
		}
	}
}
	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	testarrow = new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, acc : 0.1, wp1 : "5nm_machinegun"});
	humanian_shuttle = new Ship({designation : "humanian shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, acc : 0.1, wp1 : "5nm_machinegun"});
	humanian_protobaseship_helonia = new Ship({designation : "humanian protobaseship helonia", fraction : "humanian", hp : 8000, shield : 0, armour : 5, acc : 0.03, wp1 : "1.4mm_kolexialgun"});
	humanian_satalite = new Ship({designation : "humanian satalite", fraction : "humanian", hp : 15, shield : 0, armour : 1, acc : 0, wp1 : "none"});
	fatman = new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, acc : 0.02, wp1 : "5nm_machinegun"});
	republic_base = new Ship({designation : "republic_base", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	qubanic_colonizer = new Ship({designation : "qubanic colonizer", fraction : "qubanic", hp : 2000, shield : 0, armour : 1, acc : 0.003});
	ophianian_annector-star = new Ship({designation : "ophianian annector-star", fraction : "ophianian", hp : 16666, shield : 0, armour : 2, acc : 0.005, wp1 : "Ophianian Beam", sp1 : "spawn_ophianianChunk",});
	ophianian_chunk = new Ship({designation : "ophianian chunk", fraction : "ophianian", hp : 200, armour : 1, acc : 0.07});
}