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
		Hellaxy.level = this;
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
			if (intervalReact(key.esc, 500, "esc")){
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
				if (this.currentLinearEvents[0].condition){
					this.currentLinearEvents[0].reward();
					this.currentLinearEvents.splice(0,1);
					i--;
				}
				else break;
			}
			for (var i = 0; i < this.currentContinousEvents.length; i++ ){
				if (this.currentContinousEvents[i].condition) this.currentContinousEvents[i].reward();
				else continue;
			}
		}
	}
	
	
	
	cancel(){
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
		console.log("Ending level");
		this.cancel()
		this.campaign.at += 1;
	}
}



class Event{
	constructor(reward, condition){
		if (!exists(reward) || typeof reward !== "function") return;
		this.reward = reward;
		this.condition = setProp(condition, true);
	}
	
	reward(){}
}

















