var image = {
	quantity : 0,
	loaded : 0
};
function createImage(path) {
	image.quantity += 1;
    var img = new Image();
    img.src = path;
	img.addEventListener("load",function(e){
	    image.loaded +=1;
	    if (image.loaded === image.quantity) {
			sector.at = "title";
			console.log(image.quantity,image.loaded);
		}
	})
    return img;
}
function loadImages() {

    for (var res in resources) {
        if (resources.hasOwnProperty(res)) {
            image[res] = createImage(resources[res]);
        }
    }

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

