var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(on){
		on.acc();
		if (on.x < 400) on.pointAt({x : background.naturalHeight, y : on.y});
		if (on.x > background.naturalWidth - 400) on.pointAt({x : 0, y : on.y});
		if (on.y < 400) on.pointAt({x : on.x , y : background.naturalHeight});
		if (on.y > background.naturalHeight - 400) on.pointAt({x : on.x , y : 0});	
	}
}