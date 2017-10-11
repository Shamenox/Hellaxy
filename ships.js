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
		this.sector = {ships : []};
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
		if (inSector === undefined) inSector = Hellaxy.Sector;
		if (ctrl === undefined) ctrl = "none";
		var neuerSpawn = this.clone();
		neuerSpawn.x = atX;
		neuerSpawn.y = atY;
		neuerSpawn.angle = atAngle;
		neuerSpawn.aim = atAngle;
		neuerSpawn.ctrl = ctrl;
		neuerSpawn.relationShipID = relationShip;
		neuerSpawn.abgang = abgang;
		neuerSpawn.sector = inSector;
		inSector.ships.push(neuerSpawn);
	}
	
	
	clone(){
		var clone = new Ship();
		Ships.pop();
		for (var property in this){
			clone[property] = this[property];
			for (var i = 1; i < 3; i++){
				if (property == ["wp" + i]){
					clone["wp" + i] = new Weapon(this["wp" + i].designation, this["wp" + i].skinName, this["wp" + i].alpha, this["wp" + i].pen, this["wp" + i].reload, this["wp" + i].ammo);
					clone["wp" + i].ship = clone;
				}
				if (property == ["sp" + i]){
					clone["sp" + i] = new Special(this["sp" + i].reload, this["sp" + i].ammo, this["sp" + i].action, this["sp" + i].exe);
					clone["sp" + i].ship = clone;
				}
			}
		}
		return clone;
	}
	
	
	ID(){
		for (var id = 0; id < this.sector.ships.length; id++){
			if (this.sector.ships[id] === this) return id;
		}
		console.log("ID not found");
		return 0;
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
			this.angle -= 60 * this.a;
		}
		if (dir === "right"){
			this.angle += 60 * this.a;
		}
		
		if (dir === undefined || dir === "target"){ 
			if (Math.abs(this.aim - this.angle) <= this.a * 60){
				this.angle = this.aim;
				return;
			}
			if (this.angle <= 180){
				if (this.aim.between(this.angle, this.angle + 180)){
						this.angle += this.a * 60;
					}
				else {
					this.angle -= this.a * 60;
				}
			}
			else {
				if (this.aim.between(this.angle, this.angle - 180)){ 
					this.angle -= this.a * 60;
				} 
				else{
					this.angle += this.a * 60;
				}
			}
		}
	}
	
	
	fire(slot){
		if (this["wp" + slot] === undefined || this.skin === Helon.ress.explosion) return;
		this["wp" + slot].fire();
	}
	
	useSpecial(slot){
		if (this["sp" + slot] === undefined) return;
		this["sp" + slot].exe();
	}
	
	
	collidesWith(Suspect) {
		if (this.skin === undefined || Suspect === undefined || this.fraction === Suspect.fraction) return false;
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
		this.skin = Helon.ress.images.explosion;
		Helon.ress.audio.explosion1.play();
		if (this.abgang !== undefined) this.abgang();
		setTimeout(function(ship){ship.sector.ships.splice(ship.ID(), 1);}, 2000, this);
		this.explode = function(){};
	}
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.y - this.y)*(distanced.y - this.y));
	}
	
	
	angleTowards(angled){
		if (this.x === angled.x && this.y === angled.y) return 0;
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 270);
	}
	
	
	pointAt(toPointAt){ // Festlegen eines Zielwinkels
		this.aim = this.angleTowards(toPointAt);
	}
	
	
	pointsAt(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 5, this.angleTowards(Suspect) - 5)) return true;
		return false;
	}
	
	pointsFrom(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 175, this.angleTowards(Suspect) - 175)) return true;
		return false;
	}
	
	
	pointFrom(toPointFrom){ // Festlegen eines Zielwinkels
		this.aim = get360(this.angleTowards(toPointFrom) + 180);
	}
	
	
	turnArround(){ // Initialisieren einer 180� Drehung
		this.aim = get360(this.angle - 180);
	}
	
	
	nextShip(search, range){
		if (range === undefined) range = 1000;
		for (var h = 0; h <= range; h +=5){
			for (var k = 0; k < this.sector.ships.length; k++){
				if (this.distanceTo(this.sector.ships[k]) <= h && k !== this.ID()){
					if (search === undefined) return Hellaxy.Sector.ships[k];
					if (search === "anythingElse"){
						if (this.sector.ships[k].fraction !== this.fraction) return Hellaxy.Sector.ships[k];
					}
					else {
						if (search === this.fraction && search === this.sector.ships[k].fraction && this.sector.ships[k].mass > this.mass) return Hellaxy.Sector.ships[k];
						if (search !== this.fraction && search === this.sector.ships[k].fraction) return Hellaxy.Sector.ships[k];
					}
				}
			}
		}
		return false
	}
	
	
	follow(toFollow, atDistance){
		this.pointAt (toFollow);
		this.turn();
		if (this.distanceTo(toFollow) > atDistance) {
			if (this.pointsAt(toFollow)) this.acc();
		}
		else {
			this.dec();
		}
	}
	
	
	transferTo(sector, atX, atY, atAngle, place){
		var neuerTransfer = this.clone();
		neuerTransfer.sector = sector;
		neuerTransfer.x = atX + Math.floor((Math.random() * 20) - 10);
		neuerTransfer.y = atY + Math.floor((Math.random() * 20) - 10);
		neuerTransfer.angle = atAngle;
		sector.ships.push(neuerTransfer);
		if (this.ctrl === player1){
			if (typeof Hellaxy.Sector.theme.pause === "function") Hellaxy.Sector.theme.pause();
			Hellaxy.Sector = sector;
			projectile.splice(0, projectile.length);
		}
		console.log(this.ID(), place);
		if (place !== undefined) place--;
		this.sector.ships.splice(this.ID(), 1);
		console.log(this.ID(), place);
	}
	
	
	act(place){
		var SECTOR = this.sector;
		if (this.hp < 1) this.explode();
		if (this.ctrl !== "none") this.ctrl();
		this.y -= this.vy;
		this.x += this.vx;
		if (this.vx > this.a * 80) this.vx = this.a * 80;
		if (this.vy > this.a * 80) this.vy = this.a * 80;
		if (this.vx < this.a * -80) this.vx = this.a * -80;
		if (this.vy < this.a * -80) this.vy = this.a * -80;
		this.angle = get360(this.angle);
		if (this.x < this.skin.naturalWidth/2) this.x = this.skin.naturalWidth/2, this.vx = 0; //Zur�cksetzen der Pos und V bei Randkollision
		if (this.y < this.skin.naturalHeight/2) this.y = this.skin.naturalHeight/2, this.vy = 0;
		if (this.x > SECTOR.width - this.skin.naturalWidth/2) this.x = SECTOR.width - this.skin.naturalWidth/2 , this.vx = 0;
		if (this.y > SECTOR.height - this.skin.naturalHeight/2 - 120) this.y = SECTOR.height - this.skin.naturalHeight/2 - 120, this.vy = 0;
		for (var h = 0; h < SECTOR.ships.length; h++){                                                   //Kollisions�berpr�fung
			if (this.collidesWith(SECTOR.ships[h]) && h !== this.ID) collide(this, SECTOR.ships[h]);
		}
		for (var h = 0; h < SECTOR.portals.length; h++){
			if (this.collidesWith(SECTOR.portals[h])){
				this.transferTo(SECTOR.portals[h].dest, SECTOR.portals[h].atX, SECTOR.portals[h].atY, SECTOR.portals[h].atAngle, place);
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
	a.hp -= collision.potDmg * (b.mass / collision.potM) * 8;
	b.hp -= collision.potDmg * (a.mass / collision.potM) * 8;
	a.hp = Math.round(a.hp);
	b.hp = Math.round(b.hp);
}

	
function setupShips(){  //designation, fraction, hp, shield, armour, a, wp1-3, sp1-4
	testarrow = new Ship({designation : "testarrow", fraction : "none", hp : 100, shield : 100, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_shuttle = new Ship({designation : "shuttle", fraction : "humanian", hp : 100, shield : 0, armour : 1, a : 0.1, wp1 : machinegun_5nm});
	humanian_protobaseship_helonia = new Ship({designation : "protobaseship_helonia", fraction : "humanian", hp : 12000, shield : 0, armour : 5, a : 0.03, wp1 : kolexialgun_14nm});
	humanian_satalite = new Ship({designation : "satalite", fraction : "humanian", hp : 15, shield : 0, armour : 1, a : 0});
	fatman = new Ship({designation : "fatman", fraction : "none", hp : 1000, shield : 500, armour : 2, a : 0.02, wp1 : machinegun_5nm});
	republic_hq = new Ship({designation : "hq", fraction : "republic", hp : 1000000, shield : 2000000, armour : 3});
	qubanian_colonizer = new Ship({designation : "colonizer", fraction : "qubanian", hp : 2000, shield : 0, armour : 1, a : 0.008});
	qubanian_colony = new Ship({designation : "colony", fraction : "qubanian", hp : 2444, shield : 444, armour : 1, a : 0, wp1 : machinegun_5nm, sp1 : flak_around});
	ophianic_annectorstar = new Ship({designation : "annector", fraction : "ophianic", hp : 16666, shield : 0, armour : 2, a : 0.005, wp1 : ophianian_beam, sp1 : spawn_ophianianChunk});
	ophianic_chunk = new Ship({designation : "chunk", fraction : "ophianic", hp : 300, armour : 1, a : 0.09});
	chestanian_colonizer = new Ship({designation : "colonizer", fraction : "chestanian", hp : 3600, armour : 3, a : 0.02, wp1 : spike_artillery});
	chestanian_spiketank = new Ship({designation : "spiketank", fraction : "chestanian", hp : 1200, armour : 3, a : 0.03, wp1 : spike_artillery});
	chestanian_glider = new Ship({designation : "glider", fraction : "chestanian", hp : 500, armour : 2, a : 0.06, wp1 : emp_director_1});
	chestanian_quintalglider = new Ship({designation : "quintalglider", fraction : "chestanian", hp : 2500, armour : 2, a : 0.05, wp1 : emp_director_2});
	birchanian_glider = new Ship({designation : "glider", fraction : "birchanian", hp : 10, armour : 1, a : 0.12, wp1 : emp_director_small});
	
	console.log(Ships);
}