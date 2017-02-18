var special = {};
function createSpecial(designation, reload, ammo, action, exe){
	var neuesSpecial = {};
	neuesSpecial.designation = designation;
	neuesSpecial.reload = reload;
	neuesSpecial.ammo = ammo;
	neuesSpecial.action = action;
	if (exe === undefined) neuesSpecial.exe = function(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + SHIP.ID)){
			this.ammo --;
			this.action();
		} else neuesSpecial.exe = exe;
	}
	special[designation] = neuesSpecial;
}

function cloneSpecial(designation){
	if (designation === "none") return undefined;
	clonedSpecial = {};
	clonedSpecial.designation = designation;
	clonedSpecial.reload = special[designation].reload;
	clonedSpecial.ammo = special[designation].ammo;
	clonedSpecial.action = special[designation].action;
	clonedSpecial.exe = special[designation].exe;
	return clonedSpecial;
}

function setupSpecials(){
createSpecial("spawn_ophianianChunk", 6000, 66, function(){spawnShip("Ophianian Chunk", SHIP.x, SHIP.y, SHIP.angle, npc.defender, SHIP.ID)});
}