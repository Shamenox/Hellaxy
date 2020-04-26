class LevelStep{
	constructor(effect, condition, toLvl){
		if (!exists(effect) || typeof effect !== "function") return;
		
		this.effect = trySet(effect, function(){});
		this.isOver = trySet(condition, function(){return true;});
		this.target = false;
		this.timer = 0;
		this.description = "Not described LevelStep"; //optional
		
		lastStat.levelStep = this;
		if (toLvl != undefined) this.level = toLvl;
		else this.level = lastStat.level;
		this.position = this.level.script.length;
		this.level.addStep(this);
	}
	
	
	
	
	//@Description Everything this level stage does or needs for preparation as one function
	effect(){}
	
	
	//@Description Condition to check if the next step can begin (TRUE or UNDEFINED when nothing else needs to happen)
	isOver(){}
}