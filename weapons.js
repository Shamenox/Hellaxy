var projectile = [];

class Weapon {
	constructor(skin, alpha, pen, reload, ammo){
		this.skin = skin;
		this.alpha = alpha;
		this.pen = pen;
		this.reload = reload;
		this.ammo = ammo;
	}
	
	
	clone(){
		var clone = new Weapon();
		for (var property in this){
			clone.property = this.property
		}
		return clone;
	}
	
	
	spawnProjectile(){
		var neuesProjektil = {};
		neuesProjektil.skin = this.skin;
		neuesProjektil.pen = this.pen;
		neuesProjektil.alpha = this.alpha;
		neuesProjektil.angle = SHIP.angle
		neuesProjektil.x = SHIP.x;
		neuesProjektil.y = SHIP.y;
		neuesProjektil.v = this.pen * 10;
		neuesProjektil.hits = function (obj) {
			if (this.emitter.fraction === obj.fraction) return false; //Prüfen ob Ziel das eigene Schiff ist
			if (this.x.between(obj.x - this.skin.naturalWidth/2 - obj.skin.naturalWidth/2, obj.x + this.skin.naturalWidth/2 + obj.skin.naturalWidth/2)){
				if (this.y.between(obj.y - this.skin.naturalHeight/2 - obj.skin.naturalHeight/2, obj.y + this.skin.naturalHeight/2 + obj.skin.naturalHeight/2)) return true;
			}
			return false;
		}
		neuesProjektil.sound = function(of){ 
			var mass = this.skin.naturalHeight * this.skin.naturalWidth;
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
		neuesProjektil.act = function(){
			if (this.x < 0 || this.y < 0 || this.x > SECTOR.width || this.y > SECTOR.height){
				projectile.splice(this.ID,1);
				return;
			}
			for (h = 0; h < SECTOR.ships.length; h++){ //Prozess bei Treffer
				if (this.hits(SECTOR.ships[h])) {
					if (this.pen >= SECTOR.ships[h].armour){
						this.v = 0;
						if (SECTOR.ships[h].shield <= 0) SECTOR.ships[h].hp -= this.alpha;
						if (SECTOR.ships[h].shield > 1) SECTOR.ships[h].shield -= this.alpha;
						if (SECTOR.ships[h].maxShield > 0 && SECTOR.ships[h].maxShield < 1) SECTOR.ships[h].hp -= this.alpha * SECTOR.ships[h].shield;
						this.sound("pen");
						projectile.splice(i,1);
						return;
					}
					if (this.pen < SECTOR.ships[h].armour){
						for (j = 180; j > 0; j--){
							this.angle -=1;
							if (this.angle === -1) this.angle = 359;
						}
						this.y -= Math.cos(this.angle * Math.PI / 180) * this.v;
						this.x += Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
						this.sound("bounce");
						if (this.hits(SECTOR.ships[h])){
							projectile.splice(i,1);
							return;
						}
					}
				}
			}
		}
		neuesProjektil.ID = projectile.length;
		projectile.push(neuesProjektil);
	}
	
	
	fire(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + SHIP.ID)){
			this.ammo --;
			this.spawnProjectile();
		} 
	}
}

function displayProjectiles(){
	for (i = 0; i < projectile.length; i++){
		Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // Drehung
		Game.ctx.rotate(projectile[i].angle * Math.PI / 180);
		Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
		Game.ctx.drawImage(projectile[i].skin, projectile[i].x - frame.x - projectile[i].skin.naturalWidth/2, projectile[i].y - frame.y - projectile[i].skin.naturalHeight/2); // Display
		Game.ctx.translate(projectile[i].x - frame.x, projectile[i].y - frame.y); // Rückdrehung
		Game.ctx.rotate(-projectile[i].angle * Math.PI / 180);
		Game.ctx.translate(-(projectile[i].x - frame.x), -(projectile[i].y - frame.y));
	}
}

function setupWeapons(){  //skin, alpha, pen, reload, ammo
	machinegun_5nm = new Weapon(image.shot_light_1, 4, 1, 100, 200);
	kolexialgun_14nm = new Weapon (image.shot_medium_tripple, 36, 10, 200, 600);
	ophianian_beam = new Weapon (image.beam_ophianian, 1000, 5, 4000, 66);
}