var weapon = {};
var projectile = [];
function createWeapon(designation, texture, alpha, pen, reload, ammo, sound){
	var neueWaffe = {};
	neueWaffe.designation = designation;
	neueWaffe.texture = texture;
	neueWaffe.alpha = alpha;
	neueWaffe.pen = pen;
	neueWaffe.reload = reload;
	neueWaffe.ammo = ammo;
	neueWaffe.sound = audio[sound];
	weapon[designation] = neueWaffe;
}

function spawnProjectile(from, size){
	neuesProjektil = {};
	neuesProjektil.active = true;
	neuesProjektil.texture = from[size+"Wp"].texture;
	neuesProjektil.pen = from[size+"Wp"].pen;
	neuesProjektil.alpha = from[size+"Wp"].alpha;
	neuesProjektil.angle = from.angle
	neuesProjektil.x = from.x;
	neuesProjektil.y = from.y;
	neuesProjektil.v = from[size+"Wp"].pen * 10;
	neuesProjektil.hits = function (obj) {
		var hit = false;
		if (this.x.between(obj.x, obj.x + obj.skin.naturalWidth)){
			if (this.y.between(obj.y, obj.y + obj.skin.naturalHeight)) hit = true;
			if ((this.y + this.texture.naturalHeight).between(obj.y, obj.y + obj.skin.naturalHeight)) hit = true;
		}
		if ((this.x + this.texture.naturalWidth).between(obj.x, obj.x + obj.skin.naturalWidth)){
			if (this.y.between(obj.y, obj.y + obj.skin.naturalHeight)) hit = true;
			if ((this.y + this.texture.naturalHeight).between(obj.y, obj.y + obj.skin.naturalHeight)) hit = true;
		}
		if (this.emitter === obj) hit = false; //Prüfen ob Ziel das eigene Schiff ist
		return hit;
	}
	neuesProjektil.emitter = from;
	projectile[projectile.length] = neuesProjektil;
	from[size+"Wp"].sound.pause();
	from[size+"Wp"].sound.play();
}

function displayProjectiles(){
	for (i = 0; i < projectile.length; i++){
		if (projectile[i].active){
			Game.ctx.translate(projectile[i].x + projectile[i].texture.naturalWidth/2 - frame.x, projectile[i].y + projectile[i].texture.naturalWidth/2 - frame.y); // Drehung
			Game.ctx.rotate(projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x + projectile[i].texture.naturalWidth/2 - frame.x), -(projectile[i].y + projectile[i].texture.naturalWidth/2 - frame.y));
			Game.ctx.drawImage(projectile[i].texture, projectile[i].x - frame.x, projectile[i].y - frame.y); // Display
			Game.ctx.translate(projectile[i].x + projectile[i].texture.naturalWidth/2 - frame.x, projectile[i].y + projectile[i].texture.naturalWidth/2 - frame.y); // Rückdrehung
			Game.ctx.rotate(-projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x + projectile[i].texture.naturalWidth/2 - frame.x), -(projectile[i].y + projectile[i].texture.naturalWidth/2 - frame.y));
		}
	}
}

function setupWeapons(){
	createWeapon("5nm machinegun", image.shot_light1, 1, 1, 100, 100, "shot_light");
}