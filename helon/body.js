class Body{
	/** A movable object that can be displayed on the Canvas element
	*/
	constructor(){
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.a = 0;
		this.angle = 0;
		this.vangle = 0;
		this.skin = new Image();
		this.mass = 1;
		this.width = 1;
		this.height = 1;
		this.screen = {};
	}
		
	
	
	
	
	angleTowards(angled){
		if (this.x === angled.x && this.y === angled.y) return 0;
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 270);
	}
	
	
	
	collideWith(bod){
		var v1 = this.getVges();
		var v2 = bod.getVges();
		
		
		/*
		var potM = this.mass + bod.mass;
		var v1neu = (((this.mass- bod.mass)* v1 + 2 * bod.mass * v2) / potM) ;
		var v2neu = (((bod.mass - this.mass)* v2 + 2 * this.mass * v1) / potM) ;
		//var v1neu = ((2 * this.mass * v1 + 2 * bod.mass * v2) / potM) - v1;
		//var v2neu = ((2 * this.mass * v1 + 2 * bod.mass * v2) / potM) - v2;
		v1neu = v1neu * 0.75;
		v2neu = v2neu * 0.75; */ // Mein Attempt
		
		//@author Darius
		var m = 0.5; // Mischkoeffizient (0 - 1)
		var v = 0.5; // Verlustkoeffizient (0 - 1)
		var vabsu = (((this.mass * v1) - (bod.mass * v2)) / this.mass + bod.mass) * v * m;
		var v1e = (((this.mass - bod.mass) * v1 + 2* bod.mass * v2) / (this.mass + bod.mass)) * (1 - m);
		var v2e = (((bod.mass - this.mass) * v2 + 2* this.mass * v1) / (this.mass + bod.mass)) * (1 - m);
		var v1neu = vabsu + v1e;
		var v2neu = vabsu + v2e;
		
		
		
		this.vy = v1neu * Math.cos(bod.angleTowards(this) * Math.PI / 180);
		this.vx = v1neu * Math.cos((bod.angleTowards(this) - 90) * Math.PI / 180);
		bod.vy = v1neu * Math.cos(this.angleTowards(bod) * Math.PI / 180);
		bod.vx = v1neu * Math.cos((this.angleTowards(bod) - 90) * Math.PI / 180);

		this.move();
		bod.move();
		//this.move();
		//bod.move();
	}
	
	
	
	draw(){
		if (!this.isVisible()) return;
		var x = (this.x - this.screen.offsetX) * this.screen.scale;
		var y = (this.y - this.screen.offsetY) * this.screen.scale;
		Helon.ctx.translate(x, y); // Drehung
		Helon.ctx.rotate(this.angle * Math.PI / 180);
		Helon.ctx.translate(-x, -y);
		Helon.ctx.drawImage(this.skin, (x - this.width/2 * this.screen.scale), (y - this.height/2 * this.screen.scale), this.width * this.screen.scale, this.height * this.screen.scale); // Display
		Helon.ctx.translate(x, y); // Rückdrehung
		Helon.ctx.rotate(-this.angle * Math.PI / 180);
		Helon.ctx.translate(-x, -y);
	}
	
	
	
	drawAs(that){
		if (!this.isVisible()) return;
		var x = (this.x - this.screen.offsetX) * this.screen.scale;
		var y = (this.y - this.screen.offsetY) * this.screen.scale;
		Helon.ctx.translate(x, y); // Drehung
		Helon.ctx.rotate(this.angle * Math.PI / 180);
		Helon.ctx.translate(-x, -y);
		Helon.ctx.drawImage(that, (x - this.width/2 * this.screen.scale), (y - this.height/2 * this.screen.scale), this.width * this.screen.scale, this.height * this.screen.scale); // Display
		Helon.ctx.translate(x, y); // Rückdrehung
		Helon.ctx.rotate(-this.angle * Math.PI / 180);
		Helon.ctx.translate(-x, -y);
	}
	
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.y - this.y)*(distanced.y - this.y));
	}
	
	
	
	drop(){
		this.screen.drop(this);
	}
	
	
	
	getVges(){
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	}
	
	
	
	isVisible(){
		if (this.x < this.screen.offsetX - 100  / this.screen.scale) return false;
		if (this.x > this.screen.offsetX + 2200  / this.screen.scale) return false;
		if (this.y < this.screen.offsetY - 100  / this.screen.scale) return false;
		if (this.y >this.screen.offsetY + 1200  / this.screen.scale) return false;
		return true;
	}
	
	
	
	move(){
		this.x += this.vx;
		this.y -= this.vy;
		this.angle += this.vangle;
		this.angle = get360(this.angle);
	}
	
	
	
	pointsAt(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 5, this.angleTowards(Suspect) - 5)) return true;
		return false;
	}
	
	
	
	pointAt(da){
		this.angle = this.angleTowards(da);
	}
	
	
	
	pointFrom(da){
		this.angle = get360(this.angleTowards(da) - 180);
	}
	
	
	
	pointsFrom(Suspect){
		if (this.angle.between(this.angleTowards(Suspect) + 175, this.angleTowards(Suspect) - 175)) return true;
		return false;
	}
	
	
	
	setSkin(to){
		this.skin = getImg(to);
		this.width = this.skin.naturalWidth;
		this.height = this.skin.naturalHeight;
	}
	
	
	
	overlaps(Suspect) {
		if (this.x.between(Suspect.x - this.width/2 - Suspect.width/2, Suspect.x + this.width/2 + Suspect.width/2)){
			if (this.y.between(Suspect.y - this.height/2 - Suspect.height/2, Suspect.y + this.height/2 + Suspect.height/2)) return true;
		}
		return false;
	}
}