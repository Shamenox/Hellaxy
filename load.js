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
			sector.at = "title";
			console.log(image.quantity,image.loaded);
		}
	})
    image[ID] = img;
}
function loadImages() {
	createImgae("blank", "sys");
	createImgae("blackscreen", "sys");
	createImgae("whitescreen", "sys");
	createImgae("black", "sys");
	createImgae("cursor", "sys");
	
	createImgae("central", "bgs");
	createImgae("omar", "bgs");
	createImgae("outer", "bgs");
	createImgae("testmap", "bgs");
	
	createImgae("chestanian fortress", "planets");
	createImgae("haufen", "planets");
	createImgae("humania", "planets");
	createImgae("pontes", "planets");
	createImgae("test", "planets");
	
	createImgae("beam ophianian", "projectiles");
	createImgae("explosion", "projectiles");
	createImgae("shot light 1", "projectiles");
	createImgae("shot medium tripple", "projectiles");
	createImgae("shot medium 1", "projectiles");
	createImgae("testarrow", "projectiles");
	
	createImgae("chestanian colonizer", "ships");
	createImgae("chestanian fighter", "ships");
	createImgae("chestanian quintalfighter", "ships");
	createImgae("cylon basestar", "ships");
	createImgae("helon baseship_mkii", "ships");
	createImgae("helon raider", "ships");
	createImgae("humanian protobaseship helonia", "ships");
	createImgae("humanian shuttle", "ships");
	createImgae("humanian satalite", "ships");
	createImgae("none fatman", "ships");
	createImgae("none testarrow", "ships");
	createImgae("ophianic annector-star", "ships");
	createImgae("ophianic chunk", "ships");createImgae("ophianic chunk", "ships");
	createImgae("qubanic colonizer", "ships");
	createImgae("republic hq", "ships");
	createImgae("samus ship", "ships");
	
	
	
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

