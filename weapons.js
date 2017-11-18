var projectile = [];

function createWeapon(designation, skin, alpha, pen, reload, ammo){
	Hellaxy.weapons[designation] = new Weapon(designation, skin, alpha, pen, reload, ammo);
}

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
		neuesProjektil.width = this.skin.naturalWidth;
		neuesProjektil.height = this.skin.naturalHeight;
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
			if (this.x.between(obj.x - this.width/2 - obj.width/2, obj.x + this.width/2 + obj.width/2)){
				if (this.y.between(obj.y - this.height/2 - obj.height/2, obj.y + this.height/2 + obj.height/2)) return true;
			}
			return false;
		}
		
		
		neuesProjektil.sound = function(of){
			var currentSound;
			if (of === "fire"){
				if (this.mass.between(0, 645)) currentSound = Helon.ress.audio.shot_1;
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.shot_2;
			}
			if (of === "pen"){
				if (this.mass.between(0, 645)) currentSound = Helon.ress.audio.hit_1;
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.hit_2;
			}
			if (of === "bounce"){
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.bounce_1;
			}
			if (currentSound !== undefined && intervalReact(true, 100, currentSound.src + "delay")) currentSound.play();
		}
		
		
		neuesProjektil.act = function(){
			this.y -= Math.cos(this.angle * Math.PI / 180) * this.v;
			this.x += Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
			if (this.x < 0 || this.y < 0 || this.x > Hellaxy.sector.width || this.y > Hellaxy.sector.height){
				projectile.splice(this.ID(),1);
				return;
			}
			for (var h = 0; h < Hellaxy.sector.ships.length; h++){ //Prozess bei Treffer
				var SHIP = Hellaxy.sector.ships[h];
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
		
		projectile.push(neuesProjektil);
		projectile[projectile.length - 1].sound("fire");
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
	triangle_beam = new Weapon ("triangle_beam", "triangle", 100, 3, 1000, 100);
	spike_artillery = new Weapon ("spike_artillery", "spikes_1", 120, 3, 1000, 100);
	emp_director_1 = new Weapon ("emp_director_1", "emp_1", 50, 3, 1000, 100);
	emp_director_2 = new Weapon ("emp_director_2", "emp_1", 50, 3, 200, 500);
	emp_director_small = new Weapon ("emp_director_small", "emp_2", 3, 2, 100, 400);
	
	createWeapon("machinegun_5nm", "shot_light_1", 4, 2, 100, 300);
	createWeapon("kolexialgun_14nm", "shot_medium_tripple", 36, 10, 200, 600);
	createWeapon("ophianian_beam", "beam_ophianian", 1000, 5, 4000, 66);
	createWeapon("triangle_beam", "triangle", 100, 3, 1000, 100);
	createWeapon("spike_artillery", "spikes_1", 120, 3, 1000, 100);
	createWeapon("emp_director_1", "emp_1", 50, 3, 1000, 100);
	createWeapon("emp_director_2", "emp_1", 50, 3, 200, 500);
	createWeapon("emp_director_small", "emp_2", 3, 2, 100, 400);
	
	console.log(Hellaxy.weapons);
}