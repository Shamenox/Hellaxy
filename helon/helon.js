var Helon = {};
Helon.ress = {};
Helon.tics = 0;
Helon.muted = false;
Helon.ress.audio = {};
Helon.ress.images = {
	quantity : 0,
	loaded : 0
};
Helon.apps = [];
Helon.app = function(){};
Helon.screens = [];
Helon.screen = new Screen();






function setScreen(ID){
	Helon.screen = Helon.screens[ID];
}



Helon.createScreen = function(ID, bg, theme, action){
	Helon.screens[ID] = new Screen(ID, bg, theme, action);
}



Helon.listApps = function(){
	if (Helon.apps.length === 0) console.log("No applications found! \nCheck your references!");
	for (var i = 0; i<Helon.apps.length; i++){
		console.log(i + ": " + Helon.apps[i].name);
	}
}



Helon.loop = function(){
	Helon.app();
	Helon.screen.display();
	cursor.display();
	Helon.tics++;
	requestAnimationFrame(Helon.loop);
}



Helon.stop = function(){
	Helon.app = function(){};
};




Helon.exit = function(){
	Helon.loop = function(){};
};



Helon.setUp = function(){
	loadCursor();
	Helon.createScreen("Lobby", "blackscreen", "none", function(){
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("There is nothing to see here...", 400, 200);
	});
	setScreen("Lobby");
	Helon.loop();
}



Helon.load = function(slot){
	Helon.apps[slot].startUp();
	Helon.app = Helon.apps[slot].main;
	console.log("Application " + Helon.apps[slot].name + " started");
}



Helon.loadRess = function(){
	var refs = audio_ref.split("	");
	for (var i = 0; i < refs.length; i++){
			if (refs[i] === "") continue;
			Helon.ress.audio[refs[i]] = new Audio("audio/" + refs[i] + ".mp3");
		}
	var refs = image_ref.split("	");
	for (var i = 0; i < refs.length; i++){
		if (refs[i] === "") continue;
		Helon.ress.images.quantity += 1;
		Helon.ress.images[refs[i]] = new Image();
		Helon.ress.images[refs[i]].src = "images/" + refs[i] + ".png";
		Helon.ress.images[refs[i]].addEventListener("load",function(e){
			Helon.ress.images.loaded +=1;
		});
	}
}



Helon.showRess = function(){
	console.log(Helon.ress);
}



Helon.start = function(){
	Helon.ctx.fillRect(0, 0, 1920, 1080);
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.font = "32px Consolas";
	Helon.ctx.fillText("Helon Engine", 200, 600);
	Helon.ctx.fillStyle = "black";
	Helon.loadRess();
	setTimeout(Helon.setUp, 3000);
	
	if (Helon.apps.length > 0){
		Helon.app = function(){
			Helon.ctx.fillRect(0, 0, 1920, 1080);
			bar(80,400,1760,120,Helon.ress.images.loaded/Helon.ress.images.quantity);
			if (Helon.ress.images.quantity !== 0 && Helon.ress.images.loaded === Helon.ress.images.quantity) {
				console.log(Helon.ress.images);
				if (Helon.apps.length === 1){
					Helon.load(0);
				}
				else{
					alert("Multiple executables found! \nChoose one with Helon.load(slot) or view options with Helon.listApps() !");
				}
			}	
		}
	}
	else{
		alert("No executable Application found");
	}
	
}
