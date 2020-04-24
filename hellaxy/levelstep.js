class LevelStep{
	constructor(effect, condition, toLvl){
		if (!exists(effect) || typeof effect !== "function") return;
		this.effect = trySet(effect, function(){});
		this.isOver = trySet(condition, function(){return true;});
		this.target = false;
		this.timer = 0;
		this.hadEffect = false;
		lastStat.LevelStep = this;
		if (toLvl != undefined) toLvl.addLevel(this);
		else lastStat.level.addStep(this);
	}
	
	
	
	
	//Everything this level stage does or needs for preparation
	effect(){}
	
	
	//Condition to check if the next step can begin (TRUE or UNDEFINED when nothing else needs to happen)
	isOver(){}
}





