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


function createSpecial(designation, reload, ammo, act){
	Hellaxy.weapons[designation] = new Special(reload, ammo, act);
}

function setupSpecials(){
	flak_around = new Special( 1000, 10, function(){
		this.reload = this.ship.wp1.reload;
		this.ammo = this.ship.wp1.ammo;
		for (var p = 0; p <= 10; p++){
			this.ship.wp1.spawnProjectile();
			projectile[projectile.length - 1].angle += p * 40;
		}
		this.ship.wp1.ammo -= 4;
		projectile[projectile.length - 1].sound("fire");
	})
	
	createSpecial("spawn_ophianianChunk", 6000, 66, function(){spawnShip("ophianic_chunk", this.ship.x, this.ship.y, this.ship.angle, npc.rammer, function(){},this.ship.sector.designation)});
	createSpecial("flak_around", 1000, 10, function(){
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
		projectile[projectile.length - 1].sound("fire");
	})
}