class Projectile extends Body{
	constructor(wp){
		super();
		this.setSkin(wp.skin);
		this.mass = wp.skin.naturalHeight * wp.skin.naturalWidth;
		this.pen = wp.pen;
		this.alpha = wp.alpha;
		this.angle = wp.ship.angle
		this.x = wp.ship.x;
		this.y = wp.ship.y;
		this.v = wp.pen * 5;
		this.vy = Math.cos(this.angle * Math.PI / 180) * this.v;
		this.vx = Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
		this.emitter = wp.ship;
		this.hits = function (obj) {
			if (this.emitter === obj) return false; //Prüfen ob Ziel das eigene Schiff ist
			if (obj.fraction !== "none" && obj.fraction === this.emitter.fraction) return false;
			if (this.x.between(obj.x - this.width/2 - obj.width/2, obj.x + this.width/2 + obj.width/2)){
				if (this.y.between(obj.y - this.height/2 - obj.height/2, obj.y + this.height/2 + obj.height/2)) return true;
			}
			return false;
		}
		this.emitter.sector.add(this);
		this.sound("fire");
	}
	
	
	
		
		sound(of){
			var currentSound;
			if (of === "fire"){
				currentSound = Helon.ress.audio.shot_1;
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.shot_2;
			}
			if (of === "pen"){
				currentSound = Helon.ress.audio.hit_1;
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.hit_2;
			}
			if (of === "bounce"){
				if (this.mass.between(645, 2049)) currentSound = Helon.ress.audio.bounce_1;
			}
			play(currentSound);
		}
		
		/*
		act(){ //	 Enthält alte Systeme!!!!!!!
			this.y -= Math.cos(this.angle * Math.PI / 180) * this.v;
			this.x += Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
			if (this.x < 0 || this.y < 0 || this.x > Hellaxy.sector.width || this.y > Hellaxy.sector.height){
				this.emitter.sector.projectiles.splice(this.ID(),1);
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
						for (var m = 0; m < Hellaxy.sector.ships.length; m++){
							if (this.hits(Hellaxy.sector.ships[m])) {
								if (this.pen >= Hellaxy.sector.ships[m].armour && m !== h){
									if (Hellaxy.sector.ships[m].shield <= 0) Hellaxy.sector.ships[m].hp -= this.alpha;
									if (Hellaxy.sector.ships[m].shield > 1) Hellaxy.sector.ships[m].shield -= this.alpha;
									if (Hellaxy.sector.ships[m].maxShield > 0 && Hellaxy.sector.ships[m].maxShield < 1) Hellaxy.sector.ships[m].hp -= this.alpha * Hellaxy.sector.ships[m].shield;
								}
							}
						}
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
		} */
		
		
		ID(){
			for (var id = 0; id < this.emitter.screen.projectiles.length; id++){
				if (this.emitter.screen.projectiles[id] === this) return id;
			}
			console.log("Projectile ID not found");
			return 0;
		}
}