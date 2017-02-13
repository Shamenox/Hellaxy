var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(on){
		on.acc();
		if (intervalReact(on.x < 200 || on.x > background.naturalWidth - 200 || on.y < 200 || on.y > background.naturalHeight - 200, 6000, "turnarround" + on.ID)) on.turnArround();
		if (on.nextShip("anything", 200) !== false){
			on.follow(on.nextShip());
			on.fireSmall();
		}
	}
	npc.test = function(on){
		if (intervalReact(true, 3000, "testturn"))on.turnArround();
		console.log(on.nextShip("anything", 100));
	}
}