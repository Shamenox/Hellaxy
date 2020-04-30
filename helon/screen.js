class Screen{
	constructor(ID, bg, theme, action, scale){	//ID, bg, theme, action, scale
		this.ID = setProp(ID, "Nameless screen " + Helon.screens.length);
		this.scale = setProp(scale, 1);
		this.offsetX = 0;
		this.offsetY = 0;
		this.height = 1080;
		this.width = 1920;
		this.bg = getImg(bg);
		this.theme = getAudio(theme);
		this.act = setProp(action, function(){});
		this.bodies = [];
		
		Helon.screens[ID] = this;
	}
	
	
	
	act(){
	};
	
	
	
	add(bod){
		if (!exists(bod)){
			console.log("Alert: Tried to add missing body to:" + this.ID);
			return;
		}
		bod.screen = this;
		this.bodies.push(bod);
		if (bod.constructor.name !== "Body") this[bod.constructor.name.toLowerCase() + "s"].push(bod);
	}
	
	
	
	clear(){
		for (var i = 0; i < this.bodies.length; i++){
			drop(this.bodies[i]);
		}
	}
	
	
	
	drop(bod){
		if (!exists(bod)){
			console.log("Alert: Tried to drop missing body from:" + this.ID);
			return;
		}
		for (var i = 0; i < this.bodies.length; i++){
			if (bod === this.bodies[i]){
				this.bodies.splice(i, 1);
				if (bod.constructor.name !== "Body"){
					if (this[bod.constructor.name.toLowerCase() + "s"] == undefined) continue;
					for (var h = 0; h < this[bod.constructor.name.toLowerCase() + "s"].length; h++){
						if (this[bod.constructor.name.toLowerCase() + "s"][h] === bod) this[bod.constructor.name.toLowerCase() + "s"].splice(h, 1);
					}
				}
				break;
			}
		}
	}
	
	
	
	set(){
		Helon.screen = this;
	}
	
	
	
	focus(on){
		this.offsetX = on.x - 960 / this.scale;
		this.offsetY = on.y - 540 / this.scale;
		this.adjustOffset();
	}
	
	
	
	display(){
		Helon.ctx.drawImage(this.bg, 0, 0);
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].draw();
		}
		loop(this.theme);
	}
	
	
	physics(){
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].move();
			if (this.bodies[i].x < -200 ||this.bodies[i].y < -200 ||this.bodies[i].x > this.width + 200 || this.bodies[i].y > this.height + 200) this.drop(this.bodies[i]);
		}
	}
}