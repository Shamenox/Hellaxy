class Campaign {
	constructor(designation){
		this.designation = designation;
		this.levels = [];
		this.at = 0;
		Hellaxy.campaigns[designation] = this;
		lastStat.campaign = this;
	}
	
	
	
	
	

	addLevel(lvl){
		if (lvl == undefined){
			lvl = new Level();
			console.log("Added empty Level to campaign: " + this.designation);
		}
		this.levels.push(lvl);
		lastStat.campaign = this;
		lastStat.level = lvl;
	}
	
	
	
	start(){
		Hellaxy.campaign = this;
		Hellaxy.level = this.levels[this.at];
		Hellaxy.level.start();
	}
	
	
	
	skipTo(at){
		for (let i = 0; i < 2;i++){
			this.start();
			Hellaxy.level.skip();
		}
		this.start();
	}
	
	
	
	reset(){
		this.at = 0;
	}
}















