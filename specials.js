class Special {
	constructor(reload, ammo, action, exe){
		this.reload = reload;
		this.ammo =amoo;
		this.action = action;
		if (exe === undefined) this.exe = function(){
			if (intervalReact(this.ammo > 0, this.reload, "special" + SHIP.ID)){
				this.ammo --;
				this.action();
			}
			else neuesSpecial.exe = exe;
		}
	}
	
	clone(){
		var clone = {};
		for (var property in this){
			clone.property = this.property
		}
		return clone;
	}
}

function setupSpecials(){
spawn_ophianianChunk = new Special( 6000, 66, function(){spawnShip("Ophianian Chunk", SHIP.x, SHIP.y, SHIP.angle, npc.defender, SHIP.ID)});
}