planets = {};

class Planet{
	constructor(designation, x, y){   //designation, x, y
	this.designation = designation;
	this.skin = SPRITE[designation];
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

class Sector{
	constructor(ID, width, height){                //ID, width, height
		this.ID = ID;
		this.width = width;
		this.height = height;
		this.bg = SPRITE[ID];
		this.ships = [];
		this.planets = [];
		this.portals = []; 
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
		planets[designation] = neuerPlanet;
	}
	
	
	spawnAsteroids(posX, posY, width, height){
		for (var i = 0; i < width / 80; i++){
			for (var h = 0; h < height / 80; h++){
				Hellaxy.asteroid["v" + Math.floor((Math.random() * 3) + 1)].spawn(this, posX + i * 80 + Math.floor((Math.random() * 50) - 25), posY + h * 80 + Math.floor((Math.random() * 50) - 25), Math.floor((Math.random() * 359)), npc["asteroid" + Math.floor((Math.random() * 3) + 1)]);
			}
		}
	}

	
	displayShips(){
		for (var i = 0; i < this.ships.length; i++){
			var SHIP = this.ships[i];
			display(SHIP);
			if (SHIP.ctrl !== player1 && SHIP.hp > 0){
				Helon.ctx.strokeStyle = "red";  //infotafel
				Helon.ctx.fillStyle = "green";
				Helon.ctx.strokeRect(SHIP.x - this.offset.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - this.offset.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth, 6);
				Helon.ctx.fillRect(SHIP.x - this.offset.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - this.offset.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.hp / SHIP.mass), 6);
				Helon.ctx.fillStyle = "blue";
				Helon.ctx.fillRect(SHIP.x - this.offset.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - this.offset.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.shield / SHIP.maxshield), 6);
				Helon.ctx.strokeStyle = "yellow";
				Helon.ctx.fillStyle = "yellow";
			}
		}
	}
	
	
	displayBg(){
		for (var posY = 0; posY < 730; posY += 100){
			for (var posX = 0; posX < 1380; posX += 100){
				Helon.ctx.drawImage(this.bg, posX - (this.offset.x % 100), posY - (this.offset.y % 100));
			}
		}
	}
	
	
	displayPortals(){
		for (var h = 0; h < this.portals.length; h++){
			for (var i = this.portals[h].x; i < this.portals[h].x + this.portals[h].width; i += 100){
				for (var j = this.portals[h].y; j < this.portals[h].y + this.portals[h].height; j += 100){
				 Helon.ctx.drawImage(this.portals[h].dest.bg, i - this.offset.x, j - this.offset.y);
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
		if (this.offset.x < 0) this.offset.x = 0;
		if (this.offset.y < 0) this.offset.y = 0;
		if (this.offset.x > this.width - 1280) this.offset.x = this.width - 1280;
		if (this.offset.y > this.height - 720) this.offset.y = this.height - 720;
	}
	
	
	focus(on){
		this.offset.x = on.x - 640;
		this.offset.y = on.y - 360;
		this.adjustOffset();
	}
	
	
	act(){
		this.display();
		for (var i = 0; i < this.ships.length; i++){
			this.ships[i].act(i);
		}
		if (this.events !== undefined) this.events();
		if (this.theme !== "none") this.theme.play();
	}
}




function setupSectors () {

	testmap = new Sector("testmap", 2200, 2200);
	testmap.addPlanet("testmoon", 900, 400);

	central_sector = new Sector("central", 4500, 3700);
	
	omar_sector = new Sector("omar", 4500, 2000);
	
	outer_sector = new Sector("outer", 7500, 20000);
	
	imperial_sector = new Sector("imperial", 7500, 20000);
	
	
	central_sector.addPortal(0, 2500, 100, 350, omar_sector, 4200, 780, 270);
	omar_sector.addPortal(4400, 600, 100, 350, central_sector, 250, 2750, 90);
	
	omar_sector.addPortal(2100, 0, 350, 100, outer_sector, 5250, 19500, 0);
	outer_sector.addPortal(5150, 19700, 350, 300, omar_sector, 2250, 300, 180);
	
	central_sector.addPortal(2000, 0, 400, 100, imperial_sector, 3000, 19500, 0);
	imperial_sector.addPortal(2800, 19700, 400, 300, central_sector, 2200, 300, 180);
	
}// No touchy!
// :p hehe ~miterosan