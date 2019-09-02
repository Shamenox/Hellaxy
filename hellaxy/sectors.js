function setSector(ID){
	Hellaxy.sector = Hellaxy.sectors[ID];
}

class Sector extends Screen{
	constructor(ID, width, height){    	//ID, width, height
		super(ID, "bg_"+ID, "theme_"+ID);
		this.width = setProp(width, 1000);
		this.height = setProp(height, 1000);
		this.scale = 1;
		this.ships = [];
		this.planets = [];
		this.projectiles = [];
		this.portals = [];
		this.locations = [];
		
		Hellaxy.sectors[ID] = this;
	}
	
	
	
	
	actShips(){
		for (var i = 0; i < this.ships.length; i++){
			if (typeof this.ships[i].ctrl === "function") this.ships[i].ctrl();
		}
	}
	
	
	
	adjustOffset(){
		if (this.offsetX > this.width - 1920 / this.scale) this.offsetX = this.width - 1920 / this.scale;
		if (this.offsetY > this.height - 980 / this.scale) this.offsetY = this.height - 980 / this.scale;
		if (this.offsetX < 0) this.offsetX = 0;
		if (this.offsetY < 0) this.offsetY = 0;
	}
	
	
	
	display(){
		for (var posY = 0; posY < 1200; posY += 100 * this.scale){
			for (var posX = 0; posX < 2000; posX += 100 * this.scale){
				Helon.ctx.drawImage(this.bg, posX - (this.offsetX * this.scale % 100), posY - (this.offsetY * this.scale % 100), 100 * this.scale, 100 * this.scale);
			}
		}
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].draw();
		}
		loop(this.theme);
		this.act();
	}
	
	
	
	physics(){
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].x += this.bodies[i].vx;
			this.bodies[i].y -= this.bodies[i].vy;
			this.bodies[i].angle = get360(this.bodies[i].angle);
			this.bodies[i].angle += this.bodies[i].vangle;
			if (this.bodies[i].x < -200 ||this.bodies[i].y < -200 ||this.bodies[i].x > this.width + 200 || this.bodies[i].y > this.height + 200) this.drop(this.bodies[i]);
		}
	}
	
	
	
	refreshIDs(){
		for (var id = 0; id < this.ships.length; id++){
			this.ships[id].ID = id;
		}
	}
	
	
	
	zoomIn(){
		if (intervalReact(this.scale < 1.75, 250, "zoom")) this.scale += 0.25;
	}


	zoomOut(){
		if (intervalReact(this.scale > 0.5, 250, "zoom")) this.scale -= 0.25;
	}
	
	/*
	
	
	addPortal(x, y, width, height, atSector, atX, atY, withAngle){			Als Body Extension!!! Mit eigener Draw Funktion. Dann per Screen Display anzeigen lassen!
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
		this.add(neuesPortal);
		this.portals.push(neuesPortal);
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
		for (var i = 0; i < width / 90; i++){
			for (var h = 0; h < height / 90; h++){
				this.spawnShip("asteroid_asteroid" + Math.floor((Math.random() * 3) + 1), posX + i * 90 + Math.floor((Math.random() * 50) - 25), posY + h * 90 + Math.floor((Math.random() * 50) - 25), Math.floor((Math.random() * 359)), npc["asteroid" + Math.floor((Math.random() * 3) + 1)]);
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
	
	
	
	hasShip(fraction){
		for (var k = 0; k < this.ships.length; k++){
			if (this.ships[k].fraction === fraction) return true;
		}
		return false;
	}
	
	
	*/
	
	
	/*
	act(){
		this.display();
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].act(i);
		}
		actProjectiles();
		if (this.events !== undefined) this.events();
	} */
}

/*
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

*/



function setupSectors () {
	
	new Sector("testmap", 2200, 2200);
	//Hellaxy.sectors.testmap.addPlanet("testmoon", 900, 400);

	new Sector("central", 4500, 3700);
	
	new Sector("omar", 4500, 2000);
	
	new Sector("outer", 7500, 20000);
	
	new Sector("imperial", 7500, 20000);
	
	/*
	Hellaxy.sectors.central.addPortal(0, 2500, 100, 350, "omar", 4200, 780, 270);
	Hellaxy.sectors.omar.addPortal(4400, 600, 100, 350, "central", 250, 2750, 90);
	
	Hellaxy.sectors.omar.addPortal(2100, 0, 350, 100, "outer", 5250, 19500, 0);
	Hellaxy.sectors.outer.addPortal(5150, 19700, 350, 300, "omar", 2250, 300, 180);
	
	Hellaxy.sectors.central.addPortal(2000, 0, 400, 100, "imperial", 3000, 19500, 0);
	Hellaxy.sectors.imperial.addPortal(2800, 19700, 400, 300, "central", 2200, 300, 180); */
	
}// No touchy!
// :p hehe ~miterosan */