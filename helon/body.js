class Body{
	/** A movable object that can be displayed on the Canvas element
	*/
	constructor(){
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.angle = 0;
		this.vangle = 0;
		this.skin = new Image();
		this.width = 0;
		this.height = 0;
		this.screen = new Screen();
	}
	
	
	
	setSkin(to){
		this.skin = getImg(to);
		this.width = this.skin.naturalWidth;
		this.height = this.skin.naturalHeight;
	}
	
	
	
	draw(){

		Helon.ctx.translate(this.x, this.y); // Drehung
		Helon.ctx.rotate(this.angle * Math.PI / 180);
		Helon.ctx.translate(-this.x, -this.y);
		Helon.ctx.drawImage(this.skin, this.x - 0.5*this.width, this.y - 0.5*this.height, this.width, this.height); // Display
		Helon.ctx.translate(this.x, this.y); // Rückdrehung
		Helon.ctx.rotate(-this.angle * Math.PI / 180);
		Helon.ctx.translate(-this.x, -this.y);
	}
	
	
	
	drawAs(that){

		Helon.ctx.translate(this.x, this.y); // Drehung
		Helon.ctx.rotate(this.angle * Math.PI / 180);
		Helon.ctx.translate(-this.x, -this.y);
		Helon.ctx.drawImage(that, this.x - 0.5*that.width, this.y - 0.5*that.height, that.width, that.height); // Display
		Helon.ctx.translate(this.x, this.y); // Rückdrehung
		Helon.ctx.rotate(-this.angle * Math.PI / 180);
		Helon.ctx.translate(-this.x, -this.y);
	}
	
	
	
	distanceTo(distanced){
		return Math.sqrt((distanced.x - this.x)*(distanced.x - this.x) + (distanced.y - this.y)*(distanced.y - this.y));
	}
	
	
	
	angleTowards(angled){
		if (this.x === angled.x && this.y === angled.y) return 0;
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 270);
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
	
	
	
	overlaps(Suspect) {
		if (this.skin === undefined || Suspect === undefined || this.fraction === Suspect.fraction) return false;
		if (Suspect.fraction === "portal"){
			if (this.x.between(Suspect.x - this.skin.width/2, Suspect.x + this.skin.width/2 + Suspect.width)){
				if (this.y.between(Suspect.y - this.height/2, Suspect.y + this.height/2 + Suspect.height)) return true;
			}
			return false;
		}
		if (this.x.between(Suspect.x - this.width/2 - Suspect.width/2, Suspect.x + this.width/2 + Suspect.width/2)){
			if (this.y.between(Suspect.y - this.height/2 - Suspect.height/2, Suspect.y + this.height/2 + Suspect.height/2)) return true;
		}
		return false;
	}
}