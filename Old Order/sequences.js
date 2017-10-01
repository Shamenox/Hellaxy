class Sequence{
	constructor(scenes){
		this.scenes = [];
		if (scenes === undefined){
			console.log("Error, scene obj incomplete");
		}
		else {
			for (var ent in scenes){
				this.scenes.push(scenes.ent);
			}
		}
	}
	play(){
		
	}
}