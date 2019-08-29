class Screen{
	constructor(ID, bg, theme, action, scale){
		this.ID = setProp(ID, "Nameless screen " + Helon.screens.length);
		this.scale = setProp(scale, 1);
		this.offsetX = 0;
		this.offsetY = 0;
		this.bg = getImg(bg);
		this.theme = getAudio(theme);
		this.act = setProp(action, function(){});
		this.bodies = [];
		
		Helon.screens[ID] = this;
	}
	
	act(){};
	
	
	
	add(bod){
		bod.screen = this;
		this.bodies.push(bod);
	}
	
	
	
	set(){
		Helon.screen = this;
	}
	
	
	
	display(){
		Helon.ctx.drawImage(this.bg, 0, 0);
		for (var i = 0; i < this.bodies.length; i++){
			this.bodies[i].draw();
		}
		loop(this.theme);
		this.act();
	}
}