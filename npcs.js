var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(on){
		on.acc();
		if (on.x < 200) on.pointAt({x : background.naturalHeight, y : on.y}), on.dec();
		if (on.x > background.naturalWidth - 200) on.pointAt({x : 0, y : on.y}), on.dec();
		if (on.y < 200) on.pointAt({x : on.x , y : background.naturalHeight}), on.dec();
		if (on.y > background.naturalHeight - 200) on.pointAt({x : on.x , y : 0}), on.dec();	
	}
	npc.test = function(on){
		on.pointAt({x : 300, y : 500});
	}
}