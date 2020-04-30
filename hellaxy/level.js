class Level {
	constructor(belong){
		this.script = [];
		this.currentStep = {};
		this.over = false;
		
		this.campaign = setProp(belong, lastStat.campaign);
		this.campaign.addLevel(this);
		lastStat.level = this;
	}
	
	
	
	
	
	addStep(step){
		this.script.push(step);
	}
	
	
	
	setStep(position){
		this.currentStep = {};
		for (var a in this.script[position]){
			this.currentStep[a] = this.script[position][a];
		}
		this.currentStep.effect();
	}
	
	
	
	nextStep(){ 
		if (this.currentStep.position >= this.script.length-1){
			msg("Level complete!!! Continue with 'E'");
			this.over = true;
			return;
		}
		this.setStep(this.currentStep.position+1);
		//console.log(this.currentStep.position + "/" + this.script.length + "over:" + this.over);
	}
	
	
	
	pointAtTarget(){
		if (this.currentStep.target == undefined){
			console.log("Warning: LevelStep Target is undefined! Pointer will not work!");
			return;
		}
		if (this.currentStep.target != false) cursor.pointAt({
			x : this.currentStep.target.x - Helon.screen.offsetX,
			y : this.currentStep.target.y - Helon.screen.offsetY,
		});
	}
	
	
	
	/* Erstmal gescrapped
	addPermanent(event){
		if (event.constructor.name !== "Event") return;
		this.continuosEvents.push(event);
	}*/
	
	
	
	start(){
		resetAudio();
		this.setStep(0);
	}
	
	
	
	skip(){
		for (let i = this.currentStep.position+1 ; i < this.script.length; i++){
			this.setStep(i);
		}
		this.end();
	}
	
	
	
	check(){
		if (this.over && Hellaxy.msgs.length <= 0){
			if (intervalReact(key.e, 500, "msgDelay")) this.end();
		}
		else{
			if (intervalReact(key.esc && Helon.screen.ID !== "messager", 500, "esc")){
				setScreen("paused");
			}
			if (Hellaxy.msgs.length !== 0 && Helon.screen.ID !== "paused"){
				setScreen("messager");
			}
			this.pointAtTarget();
			while (!this.over && this.currentStep.isOver()){
				this.nextStep();
			}
		}
	}
	
	
	
	cancel(){
		Hellaxy.msgs = [];
		if (Helon.screen.ID == "messager") Helon.back(); //Setzt Screen zurück zum Sector
		Helon.screen.clear();
		Hellaxy.campaign = {};
		Hellaxy.level = {};
		this.over = false;
		resetAudio();
		setScreen("menue");
	}
	
	
	
	end(){
		console.log("Level complete: " + this.campaign.designation + " - " + this.campaign.at);
		this.campaign.at ++;
		this.cancel()
	}
}