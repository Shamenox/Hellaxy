var sector = {};
function createSector (options) {
	//declaration, bg, theme
	var neuersector = {};
	neuersector.background = image[options.bg];
	neuersector.ships = [];
	neuersector.isSetup = false;
	if (options.theme !== "none") neuersector.theme = audio[options.theme];
	if (options.theme === "none") neuersector.theme = "none";
	sector[options.name] = neuersector;
}

function setupSectors () {

sector.at = "loading";

sector.act = function(){
	background = sector[sector.at].background;
	if (sector[sector.at].theme !== "none") sector[sector.at].theme.play();
	if (sector[sector.at].events !== undefined) sector[sector.at].events();
	if (sector[sector.at].setup !== undefined){
		if (!sector[sector.at].isSetup){ 
			sector[sector.at].setup();
			sector[sector.at].isSetup = true;	
		}
	}
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
    button(400, 100, 480, 100, "Test Mode", "yellow", function(){sector.at = "testmap"})
	button(400, 250, 480, 100, "Campaign Mode", "yellow", function(){/sector.at = "campaigns"/})
	button(400, 400, 480, 100, "Free-Roam Mode (experimental)", "yellow", function(){})
	button(400, 550, 480, 100, "Controls", "yellow", function(){sector.at = "controls"})
}

createSector({ name: "controls",
	bg: "blackscreen",
	theme: "none"});
sector.controls.events = function() {
	Game.ctx.fillText("Forwards = W", 100,100);
	Game.ctx.fillText("Turn Left = A", 100,150);
	Game.ctx.fillText("Turn Right = D", 100,200);
	Game.ctx.fillText("Backwards = S", 100,250);
	Game.ctx.fillText("Light Weapon = Space", 100,300);
	Game.ctx.fillText("Medium Weapon = E", 100,350);
	Game.ctx.fillText("Heavy Weapon = Q", 100,400);
	Game.ctx.fillText("Info-Screen = I", 100,450);
	Game.ctx.fillText("Special Abilities = 1 - 4", 100,500);
	button(400, 600, 480, 100, "Back", "yellow", function(){sector.at = "menue"})
}

createSector({ name : "testmap",
	bg : "testmap",
	theme : "none"});
sector.testmap.setup = function(){
	spawnShip("Humanian Protobaseship Helonia", 200, 250, 180, "player1");
	spawnShip("Humanian Shuttle", 300, 100, 0, npc.test);
	spawnShip("Humanian Shuttle", 400, 100, 0, "none");
	spawnShip("Testarrow", 100, 100, 0, "none");
	spawnShip("Testarrow", 500, 450, 90, npc.simpleRoamer);
	spawnShip("Testarrow", 600, 450, 180, npc.simpleRoamer);
	spawnShip("Testarrow", 700, 500, 90, npc.simpleRoamer);
	spawnShip("Testarrow", 800, 500, 180, npc.simpleRoamer);
	spawnShip("Testarrow", 900, 450, 90, npc.simpleRoamer);
	//spawnShip("Republic Base", 600, 400, 90, "none");
	//spawnShip("Fat Man", 700, 300, 90, npc.simpleRoamer);
}


/*createScene({ name: "credits",
	bg: "whitescreen",
	theme: "none",
	font: standartFont,
	edgeL: 0,
	edgeR: 1280,
	ground: 220,
	scale: 1,
	gamemode: "interface"});
scene.credits.events = function() {
	Game.ctx.fillText("Credits:",100,100);
	Game.ctx.fillText("Concept : Shamenox",100,200);
	Game.ctx.fillText("Characters : Shamenox, TheKaramboli",100,300);
	Game.ctx.fillText("Artwork : Shamenox, TheKaramboli",100,400);
	Game.ctx.fillText("Programming : Shamenox, Miterosan",100,500);
	button(400, 600, 480, 100, "Back", "yellow", function(){scene.at = "menue"})
} */

}// No touchy!
// :p hehe ~miterosan
