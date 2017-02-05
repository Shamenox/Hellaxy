function setupEvents(){
	Game.event.irr = false;
	Game.event.check = function(nach){
		if (Game.event.irr) return true;
		console.log("is relevant");
		if (Game.event[nach] === undefined) return false;
		console.log("exists");
		if (Game.event[nach].conditions()) Game.event[nach].triggered = true;
		console.log(Game.event[nach].conditions);
		console.log(Game.event[nach].triggered);
		if (Game.event[nach].triggered) return true;
		if (!Game.event[nach].triggered)return false
	}
// passive Ingame Events vv
createEvent("crowfood", function(){
	if (item.chips.quantity > 1) return true;
	//return false;
});

}
function createEvent(declaration, trigger){
	var neuesEvent = {};
	neuesEvent.declaration = declaration;
	neuesEvent.triggered = false;
	neuesEvent.conditions = trigger;
	Game.event[declaration] = neuesEvent;
}
function triggerEvent(declaration){
	createEvent(declaration, function(){return true});
}