class Sector{
	constructor(width, height, bg, theme){                 //width, height, bg, theme
		this.width = width;
		this.height = height;
		this.bg = image[bg];
		this.theme = theme;
		this.ships = [];
		this.planets = [];
		this.portals = []; 
		if (theme !== undefined){
			this.theme = audio[theme];
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
		this.planets.push(neuerPlanet);
	}
	
	
	displayShips(){
		for (var i = 0; i < this.ships.length; i++){
			SHIP = this.ships[i];
			if (SHIP === "explosion") Game.ctx.drawImage(image.explosion, SHIP.x - frame.x, SHIP.y - frame.y, SHIP.skin.naturalWidth, SHIP.skin.naturalWidth);
			if (SHIP.active === true){
				Game.ctx.translate(SHIP.x - frame.x, SHIP.y - frame.y); // Drehung
				Game.ctx.rotate(SHIP.angle * Math.PI / 180);
				Game.ctx.translate(-(SHIP.x - frame.x), -(SHIP.y - frame.y));
				Game.ctx.drawImage(SHIP.skin, SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - frame.y - SHIP.skin.naturalHeight/2); // Display
				Game.ctx.translate(SHIP.x - frame.x, SHIP.y -frame.y); // Rückdrehung
				Game.ctx.rotate(-SHIP.angle * Math.PI / 180);
				Game.ctx.translate(-(SHIP.x - frame.x), -(SHIP.y - frame.y));
				if (SHIP.ctrl !== player1){
					Game.ctx.strokeStyle = "red";  //infotafel
					Game.ctx.fillStyle = "green";
					Game.ctx.strokeRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth, 6);
					Game.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.hp / [SHIP.fraction + " " + SHIP.designation].hp), 6);
					Game.ctx.fillStyle = "blue";
					Game.ctx.fillRect(SHIP.x - frame.x - SHIP.skin.naturalWidth/2, SHIP.y - 12 - frame.y - SHIP.skin.naturalHeight/2, SHIP.skin.naturalWidth * (SHIP.shield / [SHIP.fraction + " " + SHIP.designation].shield), 6);
					Game.ctx.strokeStyle = "yellow";
					Game.ctx.fillStyle = "yellow";
				}
			}
		}
	}
	
	
	displayBg(){
		for (var posY = 0; posY < this.height; posY += 100){
			for (var posX = 0; posX < this.width; posX += 100){
				Game.ctx.drawImage(this.bg, posX - frame.x, posY - frame.y);
			}
		}
	}
	
	
	displayPortals(){
		for (var h = 0; h < this.portals.length; h++){
			for (var i = this.portals[h].x; i < this.portals[h].x + this.portals[h].width; i += 100){
				for (var j = this.portals[h].y; j < this.y + this.height; j += 100){
				 Game.ctx.drawImage(this.dest.bg, i - frame.x, j - frame.y);
				}
			}
		}
	}
	
	
	displayPlanets(){
		for (var i = 0; i < this.planets.length; i++){
			Game.ctx.drawImage(this.planets[i].skin, this.planets[i].x - frame.x -this.planets[i].skin.naturalWidth/2, this.planets[i].y - frame.y - this.planets[i].skin.naturalHeight/2);
		}
	}
	
	
	act(){
		this.displayBg();
		this.displayPlanets();
		this.displayPortals();
		this.displayShips();
		if (this.events !== undefined) this.events();
		if (this.theme !== "none") this.theme.play();
	}
}




function setupSectors () {
	loading = new Sector(1080, 1920, "blackscreen");
	loading.events = function() {
		Game.ctx.fillText("Loading... please wait", 200, 200);
		Game.ctx.rect(40,400,1200,100);
		Game.ctx.fillStyle = "yellow";
		Game.ctx.fillRect(50,410,1180*(image.loaded/image.quantity),80);
		Game.ctx.rect(50,410,1180*(image.loaded/image.quantity),80);
		Game.ctx.stroke();
	}
	
	title = new Sector(1080, 1920, "blackscreen", "theme1");
	title.events = function(){
		Game.ctx.font = "144px Consolas";
		Game.ctx.fillText("Hellaxy", 350, 240);
		Game.ctx.font = "24px Consolas";
		if (!intervalReact(true, 1000, "title")) Game.ctx.fillText("> Press Space <", 540, 540);
		if (key.space) SECTOR = menue;
	}

	menue = new Sector(1080, 1920, "blackscreen", "theme1");
	menue.events = function() {
		button(400, 100, 480, 100, "Quicktest Mode", "yellow", function(){SECTOR = testmap; CAMPAIGN = system})
		button(400, 250, 480, 100, "Campaign Mode", "yellow", function(){SECTOR = campaign;})
		button(400, 400, 480, 100, "Free-Roam Mode", "yellow", function(){SECTOR = freeroam;})
		button(400, 550, 480, 100, "Controls", "yellow", function(){SECTOR = "controls";})
	}

	campaign = new Sector(1080, 1920, "blackscreen", "theme1");
	campaign.events = function() {
		Game.ctx.fillText("Campaign Mode", 540, 50);
		Game.ctx.fillText("Select your campaign:", 490, 80);
		Game.ctx.fillText("Humanian:   Lvl " + humanian.at, 200, 150);
		if (humanian.levels[humanian.at] !== undefined) {button(500, 115, 130, 50, "Continue", "yellow", function(){CAMPAIGN = humanian});} else {Game.ctx.fillText("Complete!", 500, 150);}
		button(700, 115, 130, 50, "New", "yellow", function(){humanian.at = 0; CAMPAIGN = humanian;});
		button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = menue;})
	}

	freeroam = new Sector(1080, 1920, "blackscreen", "theme1");
	freeroam.events = function() {
		var hor = 1;
		var ver = 1;
		Game.ctx.fillText("Freeroam Mode", 540, 50);
		Game.ctx.fillText("Select your ship:", 490, 80);
		/* for (var dec in ship){
			Game.ctx.drawImage(ship[dec].skin, hor*130, ver*130, 128, 128);
			if (click && cursor.x.between(hor*130, hor*150 + 128) && cursor.y.between(ver*130, ver*130 + 128)){
				sector.at = "Central_Sector";
				spawnShip(ship[dec].designation, 100, 100, 180, player1, 0, function(){endLevel(true);});
				return;
			}
			hor++;
			if (hor > 8) hor = 1, ver++;
		} */
		button(400, 650, 480, 50, "Back", "yellow", function(){sector.at = "menue";})
	}

	controls = new Sector(1080, 1920, "blackscreen", "theme1");
	controls.events = function() {
		Game.ctx.fillText("Accelerate forwards = W", 100,100);
		Game.ctx.fillText("Turn Left = A", 100,150);
		Game.ctx.fillText("Turn Right = D", 100,200);
		Game.ctx.fillText("Deccelerate = S", 100,250);
		Game.ctx.fillText("Light Weapon = Space", 100,300);
		Game.ctx.fillText("Medium Weapon = E", 100,350);
		Game.ctx.fillText("Heavy Weapon = Q", 100,400);
		Game.ctx.fillText("Info-Screen = I", 100,450);
		Game.ctx.fillText("Special Abilities = 1 - 4", 100,500);
		Game.ctx.fillText("Pause Game / Skip Dialog = esc", 100,550);
		button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = menue;});
	}

	testmap = new Sector(2200, 2200, "testmap");
	testmap.addPlanet("testmoon", 900, 400);

	central_sector = new Sector(4500, 3700, "central", "theme1");
	omar_sector = new Sector(4500, 4700, "omar", "theme1");
	outer_sector = new Sector(7500, 27000, "outer", "theme1");
	
	central_sector.addPortal(0, 1000, 110, 2000, omar_sector, 4300, 1000, 270);

	
}// No touchy!
// :p hehe ~miterosan

function start(){
	SECTOR = title;
}
