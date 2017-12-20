var Helon = {};
Helon.ress = {};
Helon.tics = 0;
Helon.muted = false;
Helon.ress.audio = {};
Helon.ress.images = {
	quantity : 0,
	loaded : 0
};
var SPRITE = {};

Helon.app = function(){
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillRect(0, 0, 1280, 720);
	bar(Helon.ress.images);
}

Helon.loop = function(){
	Helon.app();
	cursor.display();
	Helon.tics++;
	requestAnimationFrame(Helon.loop);
}

window.onload = function(){
	var Canvas = document.getElementById("Canvas");
	Helon.ctx = Canvas.getContext("2d");
	
	Helon.ctx.fillRect(0, 0, 1280, 720);
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.font = "24px Consolas";
	Helon.ctx.fillText("Running on Helon Engine", 200, 400);
	setTimeout(Helon.loop, 2000);
	
	
	for (var i = 0; i < audibles.length; i++){
		Helon.ress.audio[audibles[i]] = new Audio("ress/audio/" + audibles[i] + ".mp3");
	}
	for (var a in images){
		Helon.ress.images.quantity += 1;
		Helon.ress.images[a] = new Image();
		Helon.ress.images[a].src = "ress/" + images[a] + "/" + a + ".png";
		Helon.ress.images[a].addEventListener("load",function(e){
			Helon.ress.images.loaded +=1;
			if (Helon.ress.images.loaded === Helon.ress.images.quantity) {
				console.log(Helon.ress.images);
				SPRITE = Helon.ress.images;
				if (typeof Appstart !== "function"){
					alert("No executable Application found");
				}
				else{
					Appstart();
				}
			}
		})
	}
}