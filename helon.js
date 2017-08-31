var Helon = {task : function(){}};

Helon.exportCanvas = function(){
	window.onload = function() {
		var canvas = document.getElementById("Canvas");
		Helon.ctx = canvas.getContext("2d");
		Helon.ctx.fillRect(0, 0, 1280, 720);
	}
}

Helon.setStyle(to){
	if (to === undefined || to === "standart"){
		Helon.ctx.font = "24px Consolas";
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillStyle = "yellow";
	}
}

Helon.loadData(){
	if (setupInput !== undefined) setupInput();
	if (loadImages !== undefined) loadImages();
	if (loadAudio !== undefined) loadAudio();
}

Helon.setTask(to){
	Helon.task = to;
}

Helon.loop(){
	Helon.task();
	requestAnimationFrame(Helon.loop);
}

Helon.start(){
	Helon.exportCanvas();
	Helon.setStyle();
	Helon.ctx.fillText("Helon-Engine", 200, 400);
	setTimeout(Helon.loop, 3000);
}