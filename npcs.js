var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(on){
		on.acc();
		if (on.x < 200) on.turnArround();
		if (on.x > background.naturalWidth - 200) on.turnArround();
		if (on.y < 200) on.turnArround();
		if (on.y > background.naturalHeight - 200) on.turnArround();
	}
	npc.test = function(on){
		on.turnArround();
	}
}