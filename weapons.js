var weapon = {};
var projectile = [];
function createWeapon(designation, texture, alpha, pen, reload, ammo, fire){
	var neueWaffe = {};
	neueWaffe.designation = designation;
	neueWaffe.texture = texture;
	neueWaffe.alpha = alpha;
	neueWaffe.pen = pen;
	neueWaffe.reload = reload;
	neueWaffe.ammo = ammo;
	if (fire === undefined) neueWaffe.fire = function(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + SHIP.ID)){
			this.ammo --;
			spawnProjectile(this);
		} else neueWaffe.fire = fire;
	}
	weapon[designation] = neueWaffe;
}

function cloneWeapon(designation){
	if (designation === "none") return undefined;
	clonedWeapon = {};
	clonedWeapon.designation = designation;
	clonedWeapon.texture = weapon[designation].texture;
	clonedWeapon.alpha = weapon[designation].alpha;
	clonedWeapon.pen = weapon[designation].pen;
	clonedWeapon.reload = weapon[designation].reload;
	clonedWeapon.ammo = weapon[designation].ammo;
	return clonedWeapon;
}

function spawnProjectile(from){
	neuesProjektil = {};
	neuesProjektil.active = true;
	neuesProjektil.texture = from.texture;
	neuesProjektil.pen = from.pen;
	neuesProjektil.alpha = from.alpha;
	neuesProjektil.angle = SHIP.angle
	neuesProjektil.x = SHIP.x;
	neuesProjektil.y = SHIP.y;
	neuesProjektil.v = from.pen * 10;
	neuesProjektil.hits = function (obj) {
		if (this.emitter.fraction === obj.fraction) return false; //Prüfen ob Ziel das eigene Schiff ist
		if (this.x.between(obj.x - this.texture.naturalWidth/2 - obj.skin.naturalWidth/2, obj.x + this.texture.naturalWidth/2 + obj.skin.naturalWidth/2)){
			if (this.y.between(obj.y - this.texture.naturalHeight/2 - obj.skin.naturalHeight/2, obj.y + this.texture.naturalHeight/2 + obj.skin.naturalHeight/2)) return true;
		}
		return false;
	}
	neuesProjektil.sound = function(of){ 
		var mass = this.texture.naturalHeight * this.texture.naturalWidth;
		if (of === "fire"){
			if (mass <= 644) audio.shot_1.play();
		}
		if (of === "pen"){
			if (mass <= 644) audio.hit_1.play();
		}
		if (of === "bounce"){
			if (mass <= 644) audio.bounce_1.play();
		}
	}
	neuesProjektil.emitter = SHIP;
	neuesProjektil.sound("fire");
	projectile.push(neuesProjektil);
}

function displayProjectiles(){
	for (i = 0; i < projectile.length; i++){
		if (projectile[i].active){
			Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // Drehung
			Game.ctx.rotate(projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
			Game.ctx.drawImage(projectile[i].texture, projectile[i].x - frame.x - projectile[i].texture.naturalWidth/2, projectile[i].y - frame.y - projectile[i].texture.naturalHeight/2); // Display
			Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // Rückdrehung
			Game.ctx.rotate(-projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
		}
	}
}

function setupWeapons(){
	createWeapon("5nm machinegun", image.shot1, 4, 1, 100, 200);
	createWeapon("1.4 mm kolexial gun", image.shot1_tripple, 36, 10, 200, 600);
	createWeapon("Ophianian Beam (H)", image.shot_ophianian_h, 1000, 5, 4000, 66, audio.shot_light, audio.hit_light, audio.bounce_light);
}