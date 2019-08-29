class Campaign {
	constructor(designation){
		this.designation = designation;
		this.levels = [];
		this.at = 0;
		Hellaxy.campaigns[designation] = this;
	}
	
	
	addLevel(setup, conditions, events){
		new Level(this, setup, conditions, events);
	}
	
	
	start(){
		Hellaxy.campaign = this;
		Hellaxy.level = this.levels[this.at];
		Hellaxy.level.start();
	}
	
	
	set(at){
		this.at = at;
	}
	
	
	reset(){
		this.at = 0;
	}
}



class Level {
	constructor(belong, setup, conditions, events){
		this.campaign = belong;
		this.setup = setup;
		this.isSetup = false;
		this.conditions = conditions;
		if (events !== undefined) this.events = events;
		belong.levels.push(this);
	}
	
	
	
	start(){
		if (!this.isSetup) this.setup();
	}
	
	
	
	check(){
		if (intervalReact(key.esc, 500, "esc")){
			setScreen("paused");
		}
		if (Hellaxy.msgs.length !== 0){
			setScreen("messager");
		}
		if (this.target !== undefined) cursor.pointAt({
			x : this.target.x - Helon.screen.offsetX,
			y : this.target.y - Helon.screen.offsetY,
		});
		for (var cond in this.conditions){
			if (this.conditions[cond] === false) return;
		}
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("Mission completed!!!", 450, 200);
		Helon.ctx.fillText("Press 'E' to continue", 450, 250);
		if (intervalReact(key.e, 500, "msgDelay")) this.end();
	}
	
	
	
	cancel(){
		Helon.screen.projectiles = [];
		Hellaxy.msgs = [];
		this.target = "none";
		this.isSetup = false;
		Hellaxy.sector.ships = [];
		for (var cond in this.conditions){
			this.conditions[cond] = false;
		}
		Hellaxy.campaign = {};
		Hellaxy.level = {};
		setScreen("menue");
	}
	
	
	
	end(){
		this.cancel()
		this.campaign.at += 1;
	}
}