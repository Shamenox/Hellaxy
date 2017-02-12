var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(on){
		on.acc();
		if (on.x < 200) on.pointAt({x : 400, y : on.y});
		if (on.x > background.naturalWidth - 200) on.pointAt({x : 0, y : on.y});
		if (on.y < 200) on.pointAt({x : on.x , y : 400});
		if (on.y > background.naturalHeight - 200) on.pointAt({x : on.x , y : 0});	
	}
	npc.test = function(on){
		on.pointAt({x : 350, y : 300});
	}
}