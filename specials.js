class Special {
	constructor(reload, ammo, action, exe){
		this.reload = reload;
		this.ammo = ammo;
		this.action = action;
		if (exe === undefined) this.exe = function(){
			if (intervalReact(this.ammo > 0, this.reload, "special" + SHIP.ID)){
				this.ammo --;
				this.action();
			}
			else neuesSpecial.exe = exe;
		}
	}
}

function setupSpecials(){
spawn_ophianianChunk = new Special( 6000, 66, function(){});
}