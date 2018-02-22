class Planet{
	constructor(designation, x, y){   //designation, x, y
	this.designation = designation;
	this.skin = SPRITE[designation];
	this.width = this.skin.naturalWidth;
	this.height = this.skin.naturalHeight;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.fraction = "planet";
	}
	
	explode(){
		var spanX = this.skin.naturalWidth;
		var spanY = this.skin.naturalHeight;
		this.skin = Helon.ress.images.explosion;
		this.skin.width = spanX;
		this.skin.height = spanY;
		Helon.ress.audio.explosion1.play();
		setTimeout(function(planet){planet.sector.planets.splice(planet.ID(), 1);}, 2000, this);
		this.explode = function(){};
	}
	
	ID(){
		for (var id = 0; id < this.sector.planets.length; id++){
			if (this.sector.planets[id] === this) return id;
		}
		console.log("ID not found");
		return 0;
	}
}



class Location{
	constructor(designation, inSector, x, y, width, height){
		this.designation = designation;
		this.sector = inSector;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}


function createSector(ID, width, height){
	Hellaxy.sectors[ID] = new Sector(ID, width, height);
}


function setSector(ID){
	Hellaxy.sector = Hellaxy.sectors[ID];
}


function addPlanet(designation, x, y, inSector){
	if (inSector === undefined) {
		inSector = Hellaxy.sector;
	} else {
		inSector = Hellaxy.sectors[inSector];
	}
	inSector.addPlanet(designation, x, y);
}


function addLocation(designation, x, y, width, height, inSector){
	if (inSector === undefined) inSector = Hellaxy.sector;
	inSector.addLocation(designation, x, y, width, height);
}


function spawnAsteroids(posX, posY, width, height, inSector){
	if (inSector === undefined) inSector = Hellaxy.sector;
	inSector.spawnAsteroids(posX, posY, width, height);
}


class Sector{
	constructor(ID, width, height){                //ID, width, height
		this.ID = ID;
		this.width = width;
		this.height = height;
		this.bg = SPRITE[ID];
		this.ships = [];
		this.planets = [];
		this.portals = [];
		this.locations = [];
		this.offset = {x : 0, y : 0};
		if (Helon.ress.audio["theme_"+ID] !== undefined){
			this.theme = Helon.ress.audio["theme_"+ID];
		}
		else this.theme = "none";
	}
	
	
	addPortal(x, y, width, height, atSector, atX, atY, withAngle){
		var neuesPortal = {};
		neuesPortal.x = x;
		neuesPortal.y = y;
		neuesPortal.height = height;
		neuesPortal.width = width;
		neuesPortal.dest = atSector;
		neuesPortal.atX = atX,
		neuesPortal.atY = atY;
		neuesPortal.atAngle = withAngle;
		neuesPortal.fraction = "portal";
		this.portals.push(neuesPortal);
	}
	
	
	addPlanet(designation, x, y){
		var neuerPlanet = new Planet(designation, x, y);
		neuerPlanet.sector = this;
		for (var pla = 0; pla < this.planets.length; pla++){
			if (this.planets[pla].designation === neuerPlanet.designation) return;
		}
		this.planets.push(neuerPlanet);
		Hellaxy.planets[designation] = neuerPlanet;
		Hellaxy.locations[designation] = neuerPlanet;
	}
	
	
	addLocation(designation, x, y, width, height){
		var neueLocation = new Location(designation, this, x, y, width, height);
		this.locations.push(neueLocation);
		Hellaxy.locations[designation] = neueLocation;
	}
	
	
	spawnAsteroids(posX, posY, width, height){
		for (var i = 0; i < width / 80; i++){
			for (var h = 0; h < height / 80; h++){
				this.spawnShip("asteroid_asteroid" + Math.floor((Math.random() * 3) + 1), posX + i * 80 + Math.floor((Math.random() * 50) - 25), posY + h * 80 + Math.floor((Math.random() * 50) - 25), Math.floor((Math.random() * 359)), npc["asteroid" + Math.floor((Math.random() * 3) + 1)]);
			}
		}
	}
	
	
	spawnShip(designation, atX, atY, atAngle, ctrl, abgang){ //designation, atX, atY, atAngle, ctrl, abgang
		if (ctrl === undefined) ctrl = "none";
		if (atAngle === undefined) atAngle = 0;
		var neuerSpawn = Hellaxy.ships[designation].clone();
		neuerSpawn.x = atX;
		neuerSpawn.y = atY;
		neuerSpawn.angle = atAngle;
		neuerSpawn.aim = atAngle;
		if (ctrl !== undefined) neuerSpawn.ctrl = ctrl;
		if (abgang !== undefined) neuerSpawn.abgang = abgang;
		neuerSpawn.sector = this;
		neuerSpawn.staticID = this.ships.length + Helon.tics;
		this.ships.push(neuerSpawn);
		this.refreshIDs();
	}

	
	displayShips(){
		for (var i = 0; i < this.ships.length; i++){
			var SHIP = this.ships[i];
			display(SHIP);
		}
	}
	
	
	displayBg(){
		for (var posY = 0; posY < 800; posY += 100 * Hellaxy.scale){
			for (var posX = 0; posX < 1380; posX += 100 * Hellaxy.scale){
				Helon.ctx.drawImage(this.bg, posX - (this.offset.x * Hellaxy.scale % 100), posY - (this.offset.y * Hellaxy.scale % 100), 100 * Hellaxy.scale, 100 * Hellaxy.scale);
			}
		}
	}
	
	
	displayPortals(){
		for (var h = 0; h < this.portals.length; h++){
			for (var i = this.portals[h].x * Hellaxy.scale; i < (this.portals[h].x + this.portals[h].width) * Hellaxy.scale; i += 100){
				for (var j = this.portals[h].y * Hellaxy.scale; j < (this.portals[h].y + this.portals[h].height) * Hellaxy.scale; j += 100){
				 Helon.ctx.drawImage(Hellaxy.sectors[this.portals[h].dest].bg, i - this.offset.x * Hellaxy.scale, j - this.offset.y * Hellaxy.scale);
				}
			}
		}
	}
	
	
	hasShip(fraction){
		for (var k = 0; k < this.ships.length; k++){
			if (this.ships[k].fraction === fraction) return true;
		}
		return false;
	}
	
	
	refreshIDs(){
		for (var id = 0; id < this.ships.length; id++){
			this.ships[id].ID = id;
		}
	}
	
	
	displayPlanets(){
		for (var i = 0; i < this.planets.length; i++){
			display(this.planets[i]);
		}
	}
	
	
	display(){
		this.displayBg();
		this.displayPlanets();
		this.displayPortals();
		displayProjectiles();
		this.displayShips();
	}
	
	
	adjustOffset(){
		if (this.offset.x > this.width - 1280 / Hellaxy.scale) this.offset.x = this.width - 1280 / Hellaxy.scale;
		if (this.offset.y > this.height - 720 / Hellaxy.scale) this.offset.y = this.height - 720 / Hellaxy.scale;
		if (this.offset.x < 0) this.offset.x = 0;
		if (this.offset.y < 0) this.offset.y = 0;
	}
	
	
	focus(on){
		this.offset.x = on.x - 640 / Hellaxy.scale;
		this.offset.y = on.y - 360 / Hellaxy.scale;
		this.adjustOffset();
	}
	
	
	act(){
		this.display();
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].act(i);
		}
		actProjectiles();
		if (this.events !== undefined) this.events();
	}
}




function setupSectors () {
	
	createSector("testmap", 2200, 2200);
	Hellaxy.sectors.testmap.addPlanet("testmoon", 900, 400);

	createSector("central", 4500, 3700);
	
	createSector("omar", 4500, 2000);
	
	createSector("outer", 7500, 20000);
	
	createSector("imperial", 7500, 20000);
	
	
	var testmap = Hellaxy.sectors["testmap"];
	var central_sector = Hellaxy.sectors["central"];
	var omar_sector = Hellaxy.sectors["omar"];
	var outer_sector = Hellaxy.sectors["outer"];
	var imperial_sector = Hellaxy.sectors["imperial"];
	
	
	Hellaxy.sectors.central.addPortal(0, 2500, 100, 350, "omar", 4200, 780, 270);
	Hellaxy.sectors.omar.addPortal(4400, 600, 100, 350, "central", 250, 2750, 90);
	
	Hellaxy.sectors.omar.addPortal(2100, 0, 350, 100, "outer", 5250, 19500, 0);
	Hellaxy.sectors.outer.addPortal(5150, 19700, 350, 300, "omar", 2250, 300, 180);
	
	Hellaxy.sectors.central.addPortal(2000, 0, 400, 100, "imperial", 3000, 19500, 0);
	Hellaxy.sectors.imperial.addPortal(2800, 19700, 400, 300, "central", 2200, 300, 180);
}// No touchy!
// :p hehe ~miterosan