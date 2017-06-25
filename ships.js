class Ship {
	constructor(specs){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
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
		for (var property in specs){
			this[property] = specs[property];
		}
		this.mass = this.hp;
		this.maxshield = this.shield;
		this.skin = image[this.fraction + " " + this.designation];
	}
	
	
	spawn(inSector, atX, atY, atAngle, ctrl, relationShip, abgang){ //inSector, atX, atY, atAngle, ctrl, relationShip, abgang
		if (inSector === undefined) inSector = SECTOR;
		var neuerSpawn = this.clone();
		neuerSpawn.x = atX;
		neuerSpawn.y = atY;
		neuerSpawn.angle = atAngle;
		neuerSpawn.ctrl = ctrl;
		neuerSpawn.relationShipID = relationShip;
		neuerSpawn.abgang = abgang;
		neuerSpawn.ID = inSector.ships.length;
		inSector.ships.push(neuerSpawn);
	}
	
	
	clone(){
		var clone = new Ship();
		for (var property in this){
			clone[property] = this[property];
		}
		return clone;
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
			for (var k = 0; k < SECTOR.ships.length; k++){
				if (this.distanceTo(SECTOR.ships[k]) <= h && k !== this.ID){
					if (search === undefined && SECTOR.ships[k].active === true || search === "anythingElse" && SECTOR.ships[k].fraction !== this.fraction && SECTOR.ships[k].active === true || SECTOR.ships[k].fraction === search && SECTOR.ships[k].active === true) return SECTOR.ships[k];
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
}

	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	testarrow = new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_shuttle = new Ship({designation : "shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_protobaseship_helonia = new Ship({designation : "protobaseship helonia", fraction : "humanian", hp : 8000, shield : 0, armour : 5, a : 0.03, wp1 : kolexialgun_14nm});
	humanian_satalite = new Ship({designation : "satalite", fraction : "humanian", hp : 15, shield : 0, armour : 1, a : 0, wp1 : "none"});
	fatman = new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, a : 0.02, wp1 : machinegun_5nm});
	republic_hq = new Ship({designation : "hq", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	qubanic_colonizer = new Ship({designation : "colonizer", fraction : "qubanic", hp : 2000, shield : 0, armour : 1, a : 0.003});
	ophianian_annectorstar = new Ship({designation : "annector-star", fraction : "ophianian", hp : 16666, shield : 0, armour : 2, a : 0.005, wp1 : ophianian_beam, sp1 : spawn_ophianianChunk});
	ophianian_chunk = new Ship({designation : "chunk", fraction : "ophianian", hp : 200, armour : 1, a : 0.07});
}