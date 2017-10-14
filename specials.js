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
	flak_around = new Special( 1000, 10, function(){
		this.reload = this.ship.wp1.reload;
		this.ammo = this.ship.wp1.ammo;
		for (var p = 0; p <= 10; p++){
			this.ship.wp1.spawnProjectile();
			projectile[projectile.length - 1].angle += p * 40;
		}
		this.ship.wp1.ammo -= 6;
		projectile[projectile.length - 1].sound("fire");
	})
}