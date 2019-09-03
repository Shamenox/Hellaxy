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
		this.width = 0;
		this.height = 0;
		this.screen = {};
	}
	
	
	
	setSkin(to){
		this.skin = getImg(to);
		this.width = this.skin.naturalWidth;
		this.height = this.skin.naturalHeight;
	}
	
	
	
	draw(){
		
		if (this.x < this.screen.offsetX - 100  / this.screen.scale) return;
		if (this.x > this.screen.offsetX + 2200  / this.screen.scale) return;
		if (this.y < this.screen.offsetY - 100  / this.screen.scale) return;
		if (this.y >this.screen.offsetY + 1200  / this.screen.scale) return;
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
		
		if (this.x < this.screen.offsetX - 100  / this.screen.scale) return;
		if (this.x > this.screen.offsetX + 2200  / this.screen.scale) return;
		if (this.y < this.screen.offsetY - 100  / this.screen.scale) return;
		if (this.y >this.screen.offsetY + 1200  / this.screen.scale) return;
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
	
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.y - this.y)*(distanced.y - this.y));
	}
	
	
	
	angleTowards(angled){
		if (this.x === angled.x && this.y === angled.y) return 0;
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this.x)) / Math.PI * 180) + 270);
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
	
	
	
	drop(){
		this.screen.drop(this);
	}
	
	
	
	overlaps(Suspect) {
		if (this.x.between(Suspect.x - this.width/2 - Suspect.width/2, Suspect.x + this.width/2 + Suspect.width/2)){
			if (this.y.between(Suspect.y - this.height/2 - Suspect.height/2, Suspect.y + this.height/2 + Suspect.height/2)) return true;
		}
		return false;
	}
}