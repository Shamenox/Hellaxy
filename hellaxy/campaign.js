class Campaign {
	constructor(designation){
		this.designation = designation;
		this.levels = [];
		this.at = 0;
		Hellaxy.campaigns[designation] = this;
		lastStat.campaign = this;
	}
	
	
	addLevel(setup){
		new Level(setup, this);
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
	constructor(belong){
		this.campaign = setProp(belong, lastStat.campaign);
		this.linearEvents = [];
		this.continousEvents = [];
		this.currentLinearEvents = [];
		this.currentContinousEvents = [];
		this.over = false;
		this.campaign.levels.push(this);
		lastStat.level = this;
	}
	
	
	
	add(event){
		if (event.constructor.name !== "Event") return;
		this.linearEvents.push(event);
	}
	
	
	
	addPermanent(event){
		if (event.constructor.name !== "Event") return;
		this.continuosEvents.push(event);
	}
	
	
	
	start(){
		resetAudio();
		for (var i = 0; i < this.linearEvents.length; i++){
			this.currentLinearEvents[i] = this.linearEvents[i];
		}
		for (var i = 0; i < this.continousEvents.length; i++){
			this.currentContinousEvents[i] = this.continousEvents[i];
		}
	}
	
	
	
	check(){
		if (this.currentLinearEvents.length === 0){
			this.over = true;
			msg("Level complete!!! Continue with 'E'");
		}
		if (this.over){
			if (intervalReact(key.e, 500, "msgDelay")) this.end();
		}
		else{
			if (intervalReact(key.esc && Helon.screen.ID !== "messager", 500, "esc")){
				setScreen("paused");
			}
			if (Hellaxy.msgs.length !== 0){
				setScreen("messager");
			}

			if (exists(this.currentLinearEvents[0].obj)) cursor.pointAt({
				x : this.currentLinearEvents[0].obj.x - Helon.screen.offsetX,
				y : this.currentLinearEvents[0].obj.y - Helon.screen.offsetY,
			});
			while (this.currentLinearEvents.length > 0){
				console.log("while begonnen");
				if (!this.currentLinearEvents[0].isSetup){
					this.currentLinearEvents[0].effect();
					this.currentLinearEvents[0].isSetup = true;
				}
				if (this.currentLinearEvents[0].condition()){
					this.currentLinearEvents.splice(0,1);
				}
				else{
					console.log("while verlassen");
					break;
				}
			}
			/*
			for (var i = 0; i < this.currentContinousEvents.length; i++ ){
				if (this.currentContinousEvents[i].condition) this.currentContinousEvents[i].effect();
				else continue;
			} */
		}
	}
	
	
	
	cancel(){
		console.log("Ending level");
		for (var i = 0; i < this.linearEvents.length; i++){
			this.linearEvents[i].isSetup = false;
		}
		Helon.screen.projectiles = [];
		Hellaxy.msgs = [];
		this.target = "none";
		this.over = false;
		Helon.screen.ships = [];
		Hellaxy.campaign = {};
		Hellaxy.level = {};
		resetAudio();
		setScreen("menue");
	}
	
	
	
	end(){
		console.log("Level complete");
		this.cancel()
		this.campaign.at += 1;
	}
}



class Event{
	constructor(effect, condition){
		if (!exists(effect) || typeof effect !== "function") return;
		this.effect = effect;
		this.condition = setProp(condition, function(){return true;});
		this.obj = false;
		this.isSetup = false;
		lastStat.event = this;
		lastStat.level.add(this);
	}
	
	effect(){}
}

















