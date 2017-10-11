var projectile = [];

class Weapon {
	constructor(designation, skin, alpha, pen, reload, ammo){  //skin, alpha, pen, reload, ammo
		this.designation = designation;
		this.skin = Helon.ress.images[skin];
		this.skinName = skin;
		this.alpha = alpha;
		this.pen = pen;
		this.reload = reload;
		this.ammo = ammo;
	}
	
	
	spawnProjectile(){
		
		var neuesProjektil = {};
		neuesProjektil.skin = this.skin;
		neuesProjektil.mass = this.skin.naturalHeight * this.skin.naturalWidth;
		neuesProjektil.pen = this.pen;
		neuesProjektil.alpha = this.alpha;
		neuesProjektil.angle = this.ship.angle
		neuesProjektil.x = this.ship.x;
		neuesProjektil.y = this.ship.y;
		neuesProjektil.v = this.pen * 10;
		neuesProjektil.emitter = this.ship;
		neuesProjektil.hits = function (obj) {
			if (this.emitter === obj) return false; //Prüfen ob Ziel das eigene Schiff ist
			if (obj.fraction !== "none" && obj.fraction === this.emitter.fraction) return false;
			if (this.x.between(obj.x - this.skin.naturalWidth/2 - obj.skin.naturalWidth/2, obj.x + this.skin.naturalWidth/2 + obj.skin.naturalWidth/2)){
				if (this.y.between(obj.y - this.skin.naturalHeight/2 - obj.skin.naturalHeight/2, obj.y + this.skin.naturalHeight/2 + obj.skin.naturalHeight/2)) return true;
			}
			return false;
		}
		
		
		neuesProjektil.sound = function(of){
			var currentSound;
			if (of === "fire"){
				if (this.mass <= 644) currentSound = Helon.ress.audio.shot_1;
			}
			if (of === "pen"){
				if (this.mass <= 644) currentSound = Helon.ress.audio.hit_1;
			}
			if (of === "bounce"){
				if (this.mass <= 644) currentSound = Helon.ress.audio.bounce_1;
			}
			if (intervalReact(true, 100, currentSound.src + "delay")) currentSound.play();
		}
		
		
		neuesProjektil.act = function(){
			this.y -= Math.cos(this.angle * Math.PI / 180) * this.v;
			this.x += Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
			if (this.x < 0 || this.y < 0 || this.x > Hellaxy.Sector.width || this.y > Hellaxy.Sector.height){
				projectile.splice(this.ID(),1);
				return;
			}
			for (var h = 0; h < Hellaxy.Sector.ships.length; h++){ //Prozess bei Treffer
				var SHIP = Hellaxy.Sector.ships[h];
				if (this.hits(SHIP)) {
					if (this.pen >= SHIP.armour){
						this.v = 0;
						if (SHIP.shield <= 0) SHIP.hp -= this.alpha;
						if (SHIP.shield > 1) SHIP.shield -= this.alpha;
						if (SHIP.maxShield > 0 && SHIP.maxShield < 1) SHIP.hp -= this.alpha * SHIP.shield;
						this.sound("pen");
						projectile.splice(this.ID(),1);
						return;
					}
					if (this.pen < SHIP.armour){
						for (var j = 180; j > 0; j--){
							this.angle -=1;
							if (this.angle === -1) this.angle = 359;
						}
						this.y -= Math.cos(this.angle * Math.PI / 180) * this.v;
						this.x += Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
						this.sound("bounce");
						if (this.hits(SHIP)){
							projectile.splice(this.ID(),1);
							return;
						}
					}
				}
			}
		}
		
		
		neuesProjektil.ID = function(){
			for (var id = 0; id < projectile.length; id++){
				if (projectile[id] === this) return id;
			}
			console.log("ID not found");
			return 0;
		}
		
		
		neuesProjektil.sound("fire");
		
		projectile.push(neuesProjektil);
	}
	
	
	fire(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + this.ship.ID())){
			this.ammo --;
			this.spawnProjectile();
		} 
	}
}

function displayProjectiles(){
	for (var i = 0; i < projectile.length; i++){
		display(projectile[i]);
		projectile[i].act();
	}
}

function setupWeapons(){  //skin, alpha, pen, reload, ammo
	machinegun_5nm = new Weapon("machinegun_5nm", "shot_light_1", 4, 2, 100, 300);
	kolexialgun_14nm = new Weapon ("kolexialgun_14nm", "shot_medium_tripple", 36, 10, 200, 600);
	ophianian_beam = new Weapon ("ophianian_beam", "beam_ophianian", 1000, 5, 4000, 66);
	spike_artillery = new Weapon ("spike_artillery", "spikes_1", 120, 3, 1000, 100);
	emp_director_1 = new Weapon ("emp_director_1", "emp_1", 50, 3, 1000, 100);
	emp_director_2 = new Weapon ("emp_director_1", "emp_1", 50, 3, 200, 500);
	emp_director_small = new Weapon ("emp_director_1", "emp_2", 3, 2, 100, 400);
}