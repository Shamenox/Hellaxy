class Projectile extends Body{
	constructor(wp){
		super();
		this.setSkin(wp.skin);
		this.mass = wp.skin.naturalHeight * wp.skin.naturalWidth;
		this.size = Math.sqrt(this.mass);
		this.pen = wp.pen;
		this.alpha = wp.alpha;
		this.angle = wp.ship.angle
		this.x = wp.ship.x;
		this.y = wp.ship.y;
		this.v = wp.pen * 5;
		this.vy = Math.cos(this.angle * Math.PI / 180) * this.v;
		this.vx = Math.cos((this.angle - 90) * Math.PI / 180) * this.v;
		this.emitter = wp.ship;
		this.tics = 50;
		this.emitter.sector.add(this);
		this.sound("fire");
	}
	
	
	
		
		sound(of){
			var currentSound;
			if (of === "fire"){
				currentSound = "shot1";
				if (this.mass.between(645, 2049)) currentSound = "shot2";
			}
			if (of === "pen"){
				currentSound = "hit1";
				if (this.mass.between(645, 2049)) currentSound = "hit2";
			}
			if (of === "bounce"){
				if (this.mass.between(645, 2049)) currentSound = "bounce1";
			}
			play(currentSound);
		}
		
		
		
		hits(obj) {
			if (this.emitter === obj) return false; //Prüfen ob Ziel das eigene Schiff ist
			if (obj.fraction !== "none" && obj.fraction === this.emitter.fraction) return false;
			if (this.x.between(obj.x - this.width/2 - obj.width/2, obj.x + this.width/2 + obj.width/2)){
				if (this.y.between(obj.y - this.height/2 - obj.height/2, obj.y + this.height/2 + obj.height/2)) return true;
			}
			return false;
		}
		
		
		
		hit(obj){
			if (obj.fraction === this.emitter.fraction) return;
			if (this.pen >= obj.armour){
				if (obj.shield <= 0) obj.hp -= this.alpha;
				if (obj.shield > 1) obj.shield -= this.alpha;
				if (obj.maxShield > 0 && obj.maxShield < 1) obj.hp -= this.alpha * obj.shield;
				this.sound("pen");
				this.drop();
				return;
			}
			else{
				this.angle = get360(this.angle + 180);
				this.move();
				this.sound("bounce");
			}
		}
		
		
		
		ID(){
			for (var id = 0; id < this.emitter.screen.projectiles.length; id++){
				if (this.emitter.screen.projectiles[id] === this) return id;
			}
			console.log("Projectile ID not found");
			return 0;
		}
		
		
		
	move(){
		super.move();
		this.tics--;
	}
}