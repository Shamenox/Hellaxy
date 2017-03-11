var sector = {at : "loading"};
function createSector (options) {
	//name, bg, theme
	var neuersector = {};
	neuersector.background = image[options.bg];
	if (options.width === undefined) options.width = 1280, options.height = 720;
	neuersector.width = options.width;
	neuersector.height = options.height;
	neuersector.ships = [];
	neuersector.planets = [];
	neuersector.isSetup = false;
	if (options.theme !== "none") neuersector.theme = audio[options.theme];
	if (options.theme === "none") neuersector.theme = "none";
	sector[options.name] = neuersector;
}

function setupSectors () {

	sector.act = function(){
		if (sector[sector.at].setup !== undefined && !sector[sector.at].isSetup){
			sector[sector.at].setup();
			sector[sector.at].isSetup = true;
		}
		background = sector[sector.at].background;
		if (sector[sector.at].theme !== "none") sector[sector.at].theme.play();
		if (sector[sector.at].events !== undefined) sector[sector.at].events();
	}

	createSector({ name: "loading",
		bg: "blackscreen",
		theme: "none",});
	sector.loading.events = function() {
		Game.ctx.fillText("Loading... please wait", 200, 200);
		Game.ctx.rect(40,400,1200,100);
		Game.ctx.fillStyle = "yellow";
		Game.ctx.fillRect(50,410,1180*(image.loaded/image.quantity),80);
		Game.ctx.rect(50,410,1180*(image.loaded/image.quantity),80);
		Game.ctx.stroke();
	}

	createSector({ name : "title",
		bg : "blackscreen",
		theme : "theme1",
		});
	sector.title.events = function(){
		Game.ctx.font = "144px Consolas";
		Game.ctx.fillText("Hellaxy", 350, 240);
		Game.ctx.font = "24px Consolas";
		if (!intervalReact(true, 1000, "title")) Game.ctx.fillText("> Press Space <", 540, 540);
		if (key.space) sector.at = "menue";
	}

	createSector({ name: "menue",
			bg: "blackscreen",
			theme: "none"});
	sector.menue.events = function() {
		button(400, 100, 480, 100, "Quicktest Mode", "yellow", function(){sector.at = "testmap";})
		button(400, 250, 480, 100, "Campaign Mode", "yellow", function(){sector.at = "campaign";})
		button(400, 400, 480, 100, "Free-Roam Mode", "yellow", function(){sector.at = "freeroam";})
		button(400, 550, 480, 100, "Controls", "yellow", function(){sector.at = "controls";})
	}

	createSector({ name: "campaign",
			bg: "blackscreen",
			theme: "theme1"});
	sector.campaign.events = function() {
		Game.ctx.fillText("Campaign Mode", 540, 50);
		Game.ctx.fillText("Select your campaign:", 490, 80);
		Game.ctx.fillText("Humanian:   Lvl " + campaign.humanian.at, 200, 150);
		if (campaign.humanian.levels[campaign.humanian.at] !== undefined) {button(500, 115, 130, 50, "Continue", "yellow", function(){campaign.at = "humanian"});} else {Game.ctx.fillText("Complete!", 500, 150);}
		button(700, 115, 130, 50, "New", "yellow", function(){campaign.humanian.at = 0; campaign.at = "humanian";});
		button(400, 650, 480, 50, "Back", "yellow", function(){sector.at = "menue";})
	}

	createSector({ name: "freeroam",
			bg: "blackscreen",
			theme: "none"});
	sector.freeroam.events = function() {
		var hor = 1;
		var ver = 1;
		Game.ctx.fillText("Freeroam Mode", 540, 50);
		Game.ctx.fillText("Select your ship:", 490, 80);
		for (var dec in ship){
			console.log(dec);
			Game.ctx.drawImage(ship[dec].skin, hor*130, ver*130, 128, 128);
			if (click && cursor.x.between(hor*130, hor*150 + 128) && cursor.y.between(ver*130, ver*130 + 128)){
				sector.at = "Central_Sector";
				spawnShip(ship[dec].designation, 100, 100, 180, player1, 0, function(){endLevel(true);});
				return;
			}
			hor++;
			if (hor > 8) hor = 1, ver++;
		}
		button(400, 650, 480, 50, "Back", "yellow", function(){sector.at = "menue";})
	}

	createSector({ name: "controls",
		bg: "blackscreen",
		theme: "none"});
	sector.controls.events = function() {
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
		button(400, 650, 480, 50, "Back", "yellow", function(){sector.at = "menue";});
	}

	createSector({ name : "testmap",
		bg : "testmap",
		theme : "none",
		width : 2200,
		height : 2200});
	sector.testmap.setup = function(){
		createPlanet("testMoon", "testMoon", "testmap", 900, 400);
		spawnShip("Humanian Protobaseship Helonia", 200, 250, 180, player1);
		spawnShip("Humanian Shuttle", 300, 100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 400, 100, 0, npc.defender, 0);
		spawnShip("Testarrow", 100, 100, 0, "none",0,function(){addMsg("Test123");});
		//spawnShip("Ophianian Annector-Star", 1000, 1000, 0, function(){ this.special1.exe(); this.acc(); this.lightWp.fire();});
		spawnShip("Testarrow", 900, 450, 90, npc.simpleRoamer);
		//spawnShip("Republic Base", 600, 400, 90, "none");
		spawnShip("Fat Man", 700, 1300, 90, npc.simpleRoamer);
	}

	createSector({ name : "Central_Sector",
		bg : "central_sector",
		theme : "none",
		width : 4500,
		height : 3700}
	);
	createSector({ name : "Omar_Sector",
		bg : "omar_sector",
		theme : "none",
		width : 4500,
		height : 4700}
	);
	createSector({ name : "Outer_Sector",
		bg : "outer_sector",
		theme : "none",
		width : 7500,
		height : 27000}
	);
}// No touchy!
// :p hehe ~miterosan
