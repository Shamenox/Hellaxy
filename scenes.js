var scene = {};
function createScene (options) {
	//declaration, bg, theme, font, edgeL, edgeR, ground, scaling, gamemode
	var neueszene = {};
	neueszene.background = image[options.bg];
	if (options.theme !== "none") neueszene.theme = audio[options.theme];
	if (options.theme === "none") neueszene.theme = "none";
	neueszene.font = options.font;
	neueszene.edgeL = options.edgeL;
	neueszene.edgeR = options.edgeR;
	neueszene.groundlevel = options.ground;
	neueszene.scale = options.scale;
	neueszene.mode = options.gamemode;
	scene[options.name] = neueszene;
}

function setupScenes () {
scene.act = function(){
	scene[scene.at].font();
	background = scene[scene.at].background;
	if (scene[scene.at].theme !== "none") scene[scene.at].theme.play();
	if (scene[scene.at].events !== undefined) scene[scene.at].events();
}

createScene({ name: "loading",
	bg: "whitescreen",
	theme: "none",
	font: labelFont,
	edgeL: 0,
	edgeR: 1280,
	ground: 220,
	scale: 1,
	gamemode: "interface"});
scene.loading.events = function() {
	Game.ctx.fillText("Loading... please wait", 200, 200);
	Game.ctx.rect(40,400,1200,100);
	Game.ctx.fillStyle = "yellow";
	Game.ctx.fillRect(50,410,1180*(image.loaded/image.quantity),80);
	Game.ctx.rect(50,410,1180*(image.loaded/image.quantity),80);
	Game.ctx.stroke();
}

createScene({ name: "whitescreen",
	bg: "whitescreen",
	theme: "none",
	font: labelFont,
	edgeL: 0,
	edgeR: 1280,
	ground: 220,
	scale: 1,
	gamemode: "adventure"});

createScene({ name: "menue",
		bg: "whitescreen",
		theme: "none",
		font: labelFont,
		edgeL: 0,
		edgeR: 1280,
		ground: 220,
		scale: 1,
		gamemode: "interface"});
scene.menue.events = function() {
    button(400, 100, 480, 100, "Start", "yellow", function(){scene.at = "kiirosroom"})
	button(400, 250, 480, 100, "Controls", "yellow", function(){scene.at = "controls"})
}

createScene({ name: "credits",
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
}

createScene({ name: "controls",
	bg: "whitescreen",
	theme: "none",
	font: standartFont,
	edgeL: 0,
	edgeR: 1280,
	ground: 220,
	scale: 1,
	gamemode: "interface"});
scene.controls.events = function() {
	Game.ctx.fillText("Upwards = W", 100,100);
	Game.ctx.fillText("Left = A", 100,150);
	Game.ctx.fillText("Right = D", 100,200);
	Game.ctx.fillText("Downwards = S", 100,250);
	Game.ctx.fillText("Use = E", 100,300);
	Game.ctx.fillText("Inventory = I", 100,350);
	Game.ctx.fillText("Escape = Escape", 100,400);
	button(400, 600, 480, 100, "Back", "yellow", function(){scene.at = "menue"})
}

}// No touchy!
// :p hehe ~miterosan
