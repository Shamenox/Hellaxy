var projectile = [];

class Weapon {
	constructor(skin, alpha, pen, reload, ammo){
		this.ID = ID;
		this.skin = skin;
		this.alpha = alpha;
		this.pen = pen;
		this.reload = reload;
		this.ammo = ammo;
		this.fire = function(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + SHIP.ID)){
			this.ammo --;
			spawnProjectile(this);
		} 
	}
	
	clone(){
		var clone = {};
		for (var property in this){
			clone.property = this.property
		}
		return clone;
	}
	
	spawnProjectile(){
		neuesProjektil = {};
		neuesProjektil.active = true;
		neuesProjektil.skin = this.skin;
		neuesProjektil.pen = this.pen;
		neuesProjektil.alpha = this.alpha;
		neuesProjektil.angle = SHIP.angle
		neuesProjektil.x = SHIP.x;
		neuesProjektil.y = SHIP.y;
		neuesProjektil.v = this.pen * 10;
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

function setupWeapons(){  //skin, alpha, pen, reload, ammo
	5nm_machinegun = new Weapon(image.shot light 1, 4, 1, 100, 200);
	1.4mm_kolexialgun = new Weapon (image.shot medium tripple, 36, 10, 200, 600);
	Ophianian Beam = new Weapon (image.beam ophianian, 1000, 5, 4000, 66);
}