class Sector{
	constructor(ID, width, height){                //ID, width, height
		this.ID = ID;
		this.width = width;
		this.height = height;
		this.bg = image[ID];
		this.ships = [];
		this.planets = [];
		this.portals = []; 
		if (theme !== undefined){
			this.theme = audio[ID];
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
		neuesPortal.withAngle = withAngle;
		neuesPortal.fraction = "portal";
		this.portals.push(neuesPortal);
	}
	
	
	addPlanet(designation, skin, x, y){
		var neuerPlanet = new Planet(designation, skin, x, y);
		neuerPlanet.sector = this.bg;
		this.planets.push(neuerPlanet);
	}
	
	
	displayShips(){
		for (var i = 0; i < this.ships.length; i++){
			SHIP = this.ships[i];
			SHIP.act();
			if (SHIP === "explosion") Helon.ctx.drawImage(image.explosion, SHIP.x - frame.x, SHIP.y - frame.y, SHIP.skin.naturalWidth, SHIP.skin.naturalWidth);
			if (SHIP.active === true){
				Helon.ctx.translate(SHIP.x - frame.x, SHIP.y - frame.y); // Drehung
				Helon.ctx.rotate(SHIP.angle * Math.PI / 180);
				Helon.ctx.translate(-(SHIP.x - frame.x), -(SHIP.y - frame.y));
				Helon.ctx.drawImage(SHIP.skin, SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - frame.y - SHIP.skin.naturalHeight/2); // Display
				Helon.ctx.translate(SHIP.x - frame.x, SHIP.y -frame.y); // Rückdrehung
				Helon.ctx.rotate(-SHIP.angle * Math.PI / 180);
				Helon.ctx.translate(-(SHIP.x - frame.x), -(SHIP.y - frame.y));
				if (SHIP.ctrl !== player1){
					Helon.ctx.strokeStyle = "red";  //infotafel
					Helon.ctx.fillStyle = "green";
					Helon.ctx.strokeRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth, 6);
					Helon.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.hp / SHIP.mass), 6);
					Helon.ctx.fillStyle = "blue";
					Helon.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.shield / SHIP.maxshield), 6);
					Helon.ctx.strokeStyle = "yellow";
					Helon.ctx.fillStyle = "yellow";
				}
			}
		}
	}
	
	
	displayBg(){
		for (var posY = 0; posY < this.height; posY += 100){
			for (var posX = 0; posX < this.width; posX += 100){
				Helon.ctx.drawImage(this.bg, posX - frame.x, posY - frame.y);
			}
		}
	}
	
	
	displayPortals(){
		for (var h = 0; h < this.portals.length; h++){
			for (var i = this.portals[h].x; i < this.portals[h].x + this.portals[h].width; i += 100){
				for (var j = this.portals[h].y; j < this.y + this.height; j += 100){
				 Helon.ctx.drawImage(this.dest.bg, i - frame.x, j - frame.y);
				}
			}
		}
	}
	
	
	displayPlanets(){
		for (var i = 0; i < this.planets.length; i++){
			Helon.ctx.drawImage(this.planets[i].skin, this.planets[i].x - frame.x -this.planets[i].skin.naturalWidth/2, this.planets[i].y - frame.y - this.planets[i].skin.naturalHeight/2);
		}
	}
	
	
	act(){
		this.displayBg();
		this.displayPlanets();
		this.displayPortals();
		this.displayShips();
		displayProjectiles();
		if (this.events !== undefined) this.events();
		if (this.theme !== "none") this.theme.play();
		frame.adjust();
	}
}




function setupSectors () {

	testmap = new Sector("testmap", 2200, 2200);
	testmap.addPlanet("testmoon", 900, 400);

	central_sector = new Sector("central", 4500, 3700);
	
	omar_sector = new Sector("omar", 4500, 4700);
	
	outer_sector = new Sector("outer", 7500, 27000);
	
	central_sector.addPortal(0, 1000, 110, 2000, omar_sector, 4300, 1000, 270);

	
}// No touchy!
// :p hehe ~miterosan

function start(){
	SECTOR = title;
}
