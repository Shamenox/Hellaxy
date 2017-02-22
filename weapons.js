var weapon = {};
var projectile = [];
function createWeapon(designation, texture, alpha, pen, reload, ammo, Fsound, Psound, Bsound, fire){
	var neueWaffe = {};
	neueWaffe.designation = designation;
	neueWaffe.texture = texture;
	neueWaffe.alpha = alpha;
	neueWaffe.pen = pen;
	neueWaffe.reload = reload;
	neueWaffe.ammo = ammo;
	neueWaffe.sound = Fsound;
	neueWaffe.scratch = Psound;
	neueWaffe.bounce = Bsound;
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
	clonedWeapon.sound = weapon[designation].sound;
	clonedWeapon.scratch = weapon[designation].scratch;
	clonedWeapon.bounce = weapon[designation].bounce;
	clonedWeapon.fire = weapon[designation].fire;
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
	neuesProjektil.sound = from.scratch;
	neuesProjektil.bounce = from.bounce;
	neuesProjektil.hits = function (obj) {
		if (this.emitter.fraction === obj.fraction) return false; //Pr�fen ob Ziel das eigene Schiff ist
		if (this.x.between(obj.x - this.texture.naturalWidth/2 - obj.skin.naturalWidth/2, obj.x + this.texture.naturalWidth/2 + obj.skin.naturalWidth/2)){
			if (this.y.between(obj.y - this.texture.naturalHeight/2 - obj.skin.naturalHeight/2, obj.y + this.texture.naturalHeight/2 + obj.skin.naturalHeight/2)) return true;
		}
		return false;
	}
	neuesProjektil.emitter = SHIP;
	projectile.push(neuesProjektil);
	from.sound.pause();
	from.sound.play();
}

function displayProjectiles(){
	for (i = 0; i < projectile.length; i++){
		if (projectile[i].active){
			Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // Drehung
			Game.ctx.rotate(projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
			Game.ctx.drawImage(projectile[i].texture, projectile[i].x - frame.x - projectile[i].texture.naturalWidth/2, projectile[i].y - frame.y - projectile[i].texture.naturalHeight/2); // Display
			Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // R�ckdrehung
			Game.ctx.rotate(-projectile[i].angle * Math.PI / 180);
			Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
		}
	}
}

function setupWeapons(){
	createWeapon("5nm machinegun", image.shot_light1, 4, 1, 100, 200, audio.shot_light, audio.hit_light, audio.bounce_light);
	createWeapon("1.4 mm kolexial gun", image.shot_light_tripple, 36, 10, 200, 600, audio.shot_light, audio.hit_light, audio.bounce_light);
	createWeapon("Ophianian Beam (H)", image.beam_ophianian_h, 1000, 5, 4000, 66, audio.shot_light, audio.hit_light, audio.bounce_light);
}