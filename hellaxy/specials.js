class Special {
	constructor(designation, reload, ammo, act){
		this.designation = setProp(designation, "nameless Special" + Hellaxy.weapons.length);
		this.reload = setProp(reload, 1000);
		this.ammo = setProp(ammo, 20);
		this.action = setProp(act, function(){});
		
		Hellaxy.weapons[designation] = this;
	}
	
	exe(){
		if (intervalReact(this.ammo > 0, this.reload, "special" + this.ship.staticID)){
			this.ammo --;
			this.action();
		}
	}
}



function setupSpecials(){

	new Special("spawn_ophianianChunk", 6000, 66, function(){/*spawnShip("ophianic_chunk", this.ship.x, this.ship.y, this.ship.angle, npc.rammer, function(){},this.ship.sector.designation)*/});
	
	
	new Special("flak_around", 1000, 10, function(){ /*
		this.reload = this.ship.wp1.reload;
		this.ammo = this.ship.wp1.ammo;
		if (this.flakState === undefined) this.flakState = 1;
		for (var p = 0; p <= 9; p++){
			this.ship.wp1.spawnProjectile();
			if (this.flakState === 1){
				projectile[projectile.length - 1].angle += p * 40;
			} else {
				projectile[projectile.length - 1].angle += p * 40 + 20;
			}
		}
		this.flakState = this.flakState * -1;
		this.ship.wp1.ammo -= 2;
		projectile[projectile.length - 1].sound("fire"); */
	})
	
	
	new Special("asteroidBreak", 1000, 1, function(){ /*
		if (chance(12)) spawnShip("ophianic_chunk", this.ship.x, this.ship.y, this.ship.angle, npc.rammer);
		if (chance(38)) spawnShip("tonium_chunk", this.ship.x, this.ship.y, this.ship.angle, npc.fairy); */
	});
}