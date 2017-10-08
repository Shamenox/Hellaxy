class Special {
	constructor(reload, ammo, act){
		this.reload = reload;
		this.ammo = ammo;
		this.action = act;
	}
	
	exe(){
		if (intervalReact(this.ammo > 0, this.reload, "special" + this.ship.ID())){
			this.ammo --;
			this.action();
		}
	}
}

function setupSpecials(){
	spawn_ophianianChunk = new Special( 6000, 66, function(){ophianic_chunk.spawn(this.ship.sector, this.ship.x, this.ship.y, this.ship.angle, npc.rammer)});
}