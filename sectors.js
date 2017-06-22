class Sector{
	constructor(width, height, bg, theme){                 //width, height, bg, theme
		this.width = width;
		this.height = height;
		this.bg = image[bg];
		this.theme = theme;
		this.ships = [];
		this.planets = [];
		this.portals = []; 
		if (theme === undefined) theme = "none";
		this.theme = audio[theme];
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
		sector[sector.at].portals.push(neuesPortal);
	}
	
	
	display(){
		for (posY = 0; posY < this.height; posY += 100){
			for (posX = 0; posX < this.width; posX += 100){
				Game.ctx.drawImage(this.bg, posX - frame.x, posY - frame.y);
			}
		}
		
		for (i = 0; i < this.planets.length; i++){
			Game.ctx.drawImage(this.planets[i].skin, this.planets[i].x - frame.x -this.planets[i].skin.naturalWidth/2, this.planets[i].y - frame.y - this.planets[i].skin.naturalHeight/2);
		}
		
		for (h = 0; h < this.portals.length; h++){
			for (i = this.portals[h].x; i < this.portals[h].x + this.portals[h].width; i += 100){
				for (j = this.portals[h].y; j < this.y + this.height; j += 100){
				 Game.ctx.drawImage(this.dest.bg, i - frame.x, j - frame.y);
				}
			}
		}
		if (this.events !== undefined) this.events();
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
		button(400, 100, 480, 100, "Quicktest Mode", "yellow", function(){SECTOR = testmap;})
		button(400, 250, 480, 100, "Campaign Mode", "yellow", function(){SECTOR = campaign;})
		button(400, 400, 480, 100, "Free-Roam Mode", "yellow", function(){SECTOR = freeroam;})
		button(400, 550, 480, 100, "Controls", "yellow", function(){SECTOR = "controls";})
	}

	campaign = new Sector(1080, 1920, "blackscreen", "theme1");
	campaign.events = function() {
		Game.ctx.fillText("Campaign Mode", 540, 50);
		Game.ctx.fillText("Select your campaign:", 490, 80);
		Game.ctx.fillText("Humanian:   Lvl " + humanian.at, 200, 150);
		if (campaign.humanian.levels[campaign.humanian.at] !== undefined) {button(500, 115, 130, 50, "Continue", "yellow", function(){CAMPAIGN = "humanian"});} else {Game.ctx.fillText("Complete!", 500, 150);}
		button(700, 115, 130, 50, "New", "yellow", function(){humanian.at = 0; CAMPAIGN = "humanian";});
		button(400, 650, 480, 50, "Back", "yellow", function(){SECTOR = "menue";})
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
	testmoon = new Planet("testmoon", testmap, 900, 400);
	humanian_protobaseship_helonia.spawn(testmap, 200, 250, player1); //inSector, atX, atY, atAngle, ctrl, relationShip, abgang
	humanian_shuttle.spawn(testmap, 300, 100, 0, npc.defender, 0);
	humanian_shuttle.spawn(testmap, 400, 100, 0, npc.defender, 0);
	testarrow.spawn(testmap, 100, 100, 0, "none", 0, function(){addMsg("Test123");});
	fatman.spawn(testmap, 700, 1300, 90, npc.simpleRoamer);

	central_sector = new Sector(4500, 3700, "central", "theme1");
	central_sector.addPortal(0, 1000, 110, 2000, omar_sector, 4300, 1000, 270);

	omar_sector = new Sector(4500, 4700, "omar", "theme1");
	
	outer_sector = new Sector(7500, 27000, "outer", "theme1");
}// No touchy!
// :p hehe ~miterosan

function start(){
	SECTOR = title;
}
