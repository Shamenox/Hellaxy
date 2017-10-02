var Ships = [];

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
		this.ID = null;
		this.ctrl = "none";
		this.active = true;
		for (var property in specs){
			this[property] = specs[property];
		}
		this.mass = this.hp;
		this.maxshield = this.shield;
		this.skin = Helon.ress.images[this.fraction + "_" + this.designation];
		Ships.push(this);
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
	
	
	turn(dir){
		if (dir === "left"){
			this.angle -= 40 * this.a;
		}
		if (dir === "right"){
			this.angle += 40 * this.a;
		}
		
		if (dir === "target"){ 
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){ this.angle += this.a * 100;} else {this.angle -= this.a * 40;}
			} else {
				if (this.aim.between(this.angle, this.angle - 180)){ this.angle -= this.a * 100;} else {this.angle += this.a * 40;}
			}
			if (Math.abs(this.aim - this.angle) <= this.a * 100) this.angle = this.aim;
		}
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
		this.skin = image.explosion;
		audio.explosion1.play();
		if (this.abgang !== undefined) this.abgang();
		setTimeout(function(){SECTOR.ships.splice(this.ID, 1)}, 2000);
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
			for (var k = 0; k < Hellaxy.Sector.ships.length; k++){
				if (this.distanceTo(Hellaxy.Sector.ships[k]) <= h && k !== this.ID){
					if (search === undefined && Hellaxy.Sector.ships[k].active === true || search === "anythingElse" && Hellaxy.Sector.ships[k].fraction !== this.fraction && Hellaxy.Sector.ships[k].active === true || Hellaxy.Sector.ships[k].fraction === search && Hellaxy.Sector.ships[k].active === true) return Hellaxy.Sector.ships[k];
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
	
	act(){
		var SECTOR = Hellaxy.Sector;
		if (this.hp < 0) this.explode(); //Abfrage ob noch aktiv
		if (this.ctrl !== "none") this.ctrl(); // Zugriff durch Spieler/KIs
		this.y -= this.vy; //Bewegung durch Geschwindigkeit
		this.x += this.vx;
		if (this.vx > this.a * 100) this.vx = this.a * 80; //Geschwindigkeitsobergrenze
		if (this.vy > this.a * 100) this.vy = this.a * 80;
		if (this.angle > 359) this.angle = 0; //Einhalten der 360°
		if (this.angle < 0) this.angle = 359;
		if (this.x < this.skin.naturalWidth/2) this.x = this.skin.naturalWidth/2, this.vx = 0; //Zurücksetzen der Pos und V bei Randkollision
		if (this.y < this.skin.naturalHeight/2) this.y = this.skin.naturalHeight/2, this.vy = 0;
		if (this.x > SECTOR.width - this.skin.naturalWidth/2) this.x = SECTOR.width - this.skin.naturalWidth/2 , this.vx = 0;
		if (this.y > SECTOR.height - this.skin.naturalHeight/2 - 120) this.y = SECTOR.height - this.skin.naturalHeight/2 - 120, this.vy = 0;
		for (var h = 0; h < SECTOR.ships.length; h++){                                                   //Kollisionsüberprüfung
			if (this.collidesWith(SECTOR.ships[h]) && h !== this.ID) collide(this, SECTOR.ships[h]);
		}
		for (var h = 0; h < SECTOR.portals.length; h++){
			if (this.collidesWith(SECTOR.portals[h])){
				SECTOR.portals[h].dest.ships.push(this);
				SECTOR.portals[h].dest.ships[SECTOR.portals[h].dest.ships.length - 1].x = SECTOR.portals[h].atX;
				SECTOR.portals[h].dest.ships[SECTOR.portals[h].dest.ships.length - 1].y = SECTOR.portals[h].atY;			
			}
		}
	}
}

function collide(a, b){
	var collision = {};
	collision.potX = a.vx + b.vx;
	collision.potY = a.vy + b.vy;
	collision.potDmg = Math.sqrt(Math.abs(collision.potX)*Math.abs(collision.potX) + Math.abs(collision.potX)*Math.abs(collision.potX));
	collision.potM = a.mass + b.mass;
	a.vx = -collision.potX * (b.mass / collision.potM);
	a.vy = -collision.potY * (b.mass / collision.potM);
	b.vx = collision.potX * (a.mass / collision.potM);
	b.vy = collision.potY * (a.mass / collision.potM);
	a.hp -= collision.potDmg * (b.mass / collision.potM) * 5;
	b.hp -= collision.potDmg * (a.mass / collision.potM) * 5;
	a.hp = Math.round(a.hp);
	b.hp = Math.round(b.hp);
}

	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	testarrow = new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_shuttle = new Ship({designation : "shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_protobaseship_helonia = new Ship({designation : "protobaseship_helonia", fraction : "humanian", hp : 8000, shield : 0, armour : 5, a : 0.03, wp1 : kolexialgun_14nm});
	humanian_satalite = new Ship({designation : "satalite", fraction : "humanian", hp : 15, shield : 0, armour : 1, a : 0, wp1 : "none"});
	fatman = new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, a : 0.02, wp1 : machinegun_5nm});
	republic_hq = new Ship({designation : "hq", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	qubanic_colonizer = new Ship({designation : "colonizer", fraction : "qubanic", hp : 2000, shield : 0, armour : 1, a : 0.003});
	ophianic_annectorstar = new Ship({designation : "annector", fraction : "ophianic", hp : 16666, shield : 0, armour : 2, a : 0.005, wp1 : ophianian_beam, sp1 : spawn_ophianianChunk});
	ophianic_chunk = new Ship({designation : "chunk", fraction : "ophianic", hp : 200, armour : 1, a : 0.07});
	
	console.log(Ships);
}