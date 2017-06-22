var image = {
	quantity : 0,
	loaded : 0
};
function createImage(ID, location) {
	image.quantity += 1;
    var img = new Image();
    img.src = "ress/" + location + "/" + ID + ".png";
	img.addEventListener("load",function(e){
	    image.loaded +=1;
	    if (image.loaded === image.quantity) {
			start();
			console.log(image.quantity,image.loaded);
		}
	})
    image[ID] = img;
}
function loadImages() {
	createImage("blank", "sys");
	createImage("blackscreen", "sys");
	createImage("whitescreen", "sys");
	createImage("black", "sys");
	createImage("cursor", "sys");
	
	createImage("central", "bgs");
	createImage("omar", "bgs");
	createImage("outer", "bgs");
	createImage("testmap", "bgs");
	
	createImage("chestanian fortress", "planets");
	createImage("haufen", "planets");
	createImage("humania", "planets");
	createImage("pontes", "planets");
	createImage("test", "planets");
	
	createImage("beam_ophianian", "projectiles");
	createImage("explosion", "projectiles");
	createImage("shot_light_1", "projectiles");
	createImage("shot_medium_tripple", "projectiles");
	createImage("shot_medium_1", "projectiles");
	createImage("testarrow", "projectiles");
	
	createImage("chestanian colonizer", "ships");
	createImage("chestanian fighter", "ships");
	createImage("chestanian quintalfighter", "ships");
	createImage("cylon basestar", "ships");
	createImage("helon baseship_mkii", "ships");
	createImage("helon raider_mkiii", "ships");
	createImage("humanian protobaseship helonia", "ships");
	createImage("humanian shuttle", "ships");
	createImage("humanian satalite", "ships");
	createImage("none fatman", "ships");
	createImage("none testarrow", "ships");
	createImage("ophianic annector-star", "ships");
	createImage("ophianic chunk", "ships");createImgae("ophianic chunk", "ships");
	createImage("qubanic colonizer", "ships");
	createImage("republic hq", "ships");
	createImage("samus ship", "ships");
	
	
	
    console.log(image);
}

var audio = {};
function loadAudio(){
audio.shot_1 = new Audio("ress/audio/shot_1.mp3");
audio.hit_1 = new Audio("ress/audio/hit_1.mp3");
audio.bounce_1 = new Audio("ress/audio/bounce_1.mp3");
audio.engine1 = new Audio("ress/audio/engine1.mp3");
audio.theme1 = new Audio("ress/audio/theme1.mp3");
audio.explosion1 = new Audio("ress/audio/bomb 3-soundbible.com-1260663209.wav");

}

