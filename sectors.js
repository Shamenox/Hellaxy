class Planet{
	constructor(designation, x, y){   //designation, x, y
	this.designation = designation;
	this.skin = SPRITE[designation];
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.fraction = "planet";
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
		neuerPlanet.sector = this.bg;
		for (var pla = 0; pla < this.planets.length; pla++){
			if (this.planets[pla].designation === neuerPlanet.designation) return;
		}
		this.planets.push(neuerPlanet);
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
		for (var posY = 0; posY < this.height; posY += 100){
			for (var posX = 0; posX < this.width; posX += 100){
				Helon.ctx.drawImage(this.bg, posX - this.offset.x, posY - this.offset.y);
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
			this.ships[i].act();
		}
		if (this.events !== undefined) this.events();
		if (this.theme !== "none") this.theme.play();
	}
}




function setupSectors () {

	testmap = new Sector("testmap", 2200, 2200);
	testmap.addPlanet("testmoon", 900, 400);

	central_sector = new Sector("central", 4500, 3700);
	
	omar_sector = new Sector("omar", 4500, 4700);
	
	outer_sector = new Sector("outer", 7500, 27000);
	
	
	central_sector.addPortal(0, 2500, 100, 350, omar_sector, 4200, 780, 270);
	omar_sector.addPortal(4360, 600, 140, 350, central_sector, 250, 2750, 90);
	
}// No touchy!
// :p hehe ~miterosan