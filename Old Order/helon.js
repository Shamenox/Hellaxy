var Helon = {
	task : function(){}
};

window.onload = function(){

	var canvas = document.getElementById("Canvas");
	Helon.ctx = canvas.getContext("2d");
	menueManager = {
		current : loading,
		act : function(){
			this.current.act();
		},
	}
	Helon.setTask(menueManager.act);
	Helon.start();
}

Helon.setStyle = function(to){
	if (to === undefined || to === "standart"){
		Helon.ctx.font = "24px Consolas";
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillStyle = "yellow";
	}
}


Helon.loadData = function(){
	if (loadImages !== undefined) loadImages();
	if (loadAudio !== undefined) loadAudio();
}

Helon.setTask = function(to){
	Helon.task = to;
}

Helon.loop = function(){
	Helon.task();
	requestAnimationFrame(Helon.loop);
}

Helon.start = function(){
	Helon.loadData();
	Helon.ctx.fillRect(0, 0, 1280, 720);
	Helon.setStyle();
	Helon.ctx.fillText("Helon-Engine", 200, 400);
	setTimeout(Helon.loop, 3000);
}