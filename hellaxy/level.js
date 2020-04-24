class Level {
	constructor(belong){
		this.campaign = setProp(belong, lastStat.campaign);
		this.script = [];
		this.runningScript = [];
		this.over = false;
		this.campaign.addLevel(this);
		lastStat.level = this;
	}
	
	
	
	
	
	addStep(step){
		this.script.push(step);
	}
	
	
	
	/* Erstmal gescrapped
	addPermanent(event){
		if (event.constructor.name !== "Event") return;
		this.continuosEvents.push(event);
	}*/
	
	
	
	start(){
		resetAudio();
		for (var i = 0; i < this.script.length; i++){
			this.runningScript[i] = this.script[i];
		}
	}
	
	
	
	check(){
		if (this.runningScript.length === 0){
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
			if (this.runningScript[0].target != false) cursor.pointAt({
				x : this.runningScript[0].target.x - Helon.screen.offsetX,
				y : this.runningScript[0].target.y - Helon.screen.offsetY,
			});
			while (this.runningScript.length > 0){
				if (!this.runningScript[0].hadEffect){
					this.runningScript[0].effect();
					this.runningScript[0].hadEffect = true;
				}
				if (this.runningScript[0].isOver()){
					this.runningScript.splice(0,1);
				}
				else break;
			}
		}
	}
	
	
	
	cancel(){
		console.log("Ending level");
		Helon.screen.projectiles = [];
		Hellaxy.msgs = [];
		this.over = false;
		Helon.screen.ships = [];
		Hellaxy.campaign = {};
		Hellaxy.level = {};
		resetAudio();
		setScreen("menue");
	}
	
	
	
	end(){
		console.log("Level complete");
		this.campaign.at ++;
		this.cancel()
	}
}