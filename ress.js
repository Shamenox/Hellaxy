images = {
	cursor : "sys",
	arrow : "sys",
	blackscreen : "sys",
	whitescreen : "sys",
	blank : "sys",
	
	central : "bgs",
	omar : "bgs",
	outer : "bgs",
	testmap : "bgs",
	imperial : "bgs",
	
	chestanian_fortress : "planets",
	haufen1 : "planets",
	haufen2 : "planets",
	haufen3 : "planets",
	asteroid_asteroid1 : "planets",
	asteroid_asteroid2 : "planets",
	asteroid_asteroid3 : "planets",
	humania : "planets",
	pontes : "planets",
	quba : "planets",
	qubanian_colony : "planets",
	blank : "planets",
	testmoon : "planets",
	
	beam_ophianian : "projectiles",
	explosion : "projectiles",
	shot_light_1 : "projectiles",
	shot_medium_tripple : "projectiles",
	spikes_1 : "projectiles",
	emp_1 : "projectiles",
	emp_2 : "projectiles",
	triangle : "projectiles",
	testarrow : "projectiles",
	
	chestanian_colonizer : "ships",
	chestanian_spiketank : "ships",
	chestanian_glider : "ships",
	chestanian_quintalglider : "ships",
	birchanian_glider : "ships",
	cylon_basestar : "ships",
	helon_baseship_mkii : "ships",
	helon_raider_mkiii : "ships",
	humanian_protobaseship_helonia : "ships",
	humanian_shuttle : "ships",
	humanian_satalite : "ships",
	none_fatman : "ships",
	none_testarrow : "ships",
	ophianic_annector : "ships",
	ophianic_chunk : "ships",
	ophianic_chunk : "ships",
	qubanian_colonizer : "ships",
	republic_hq : "ships",
	samus_ship : "ships",
}

function loadAudio(){
	Helon.ress.audio.theme1 = new Audio("ress/audio/theme1.mp3");
	Helon.ress.audio.shot_1 = new Audio("ress/audio/shot_1.mp3");
	Helon.ress.audio.hit_1 = new Audio("ress/audio/hit_1.mp3");
	Helon.ress.audio.bounce_1 = new Audio("ress/audio/bounce_1.mp3");
	Helon.ress.audio.shot_2 = new Audio("ress/audio/shot_2.mp3");
	Helon.ress.audio.hit_2 = new Audio("ress/audio/hit_2.mp3");
	Helon.ress.audio.engine1 = new Audio("ress/audio/engine1.mp3");
	Helon.ress.audio.theme1 = new Audio("ress/audio/theme1.mp3");
	Helon.ress.audio.theme_central = new Audio("ress/audio/theme_central.mp3");
	Helon.ress.audio.theme_omar = new Audio("ress/audio/theme_omar.mp3");
	Helon.ress.audio.explosion1 = new Audio("ress/audio/explosion1.mp3");
}