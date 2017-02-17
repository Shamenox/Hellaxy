var special = {};
function createSpecial(designation, reload, ammo, action){
	var neuesSpecial = {};
	neuesSpecial.designation = designation;
	neuesSpecial.reload = reload;
	neuesSpecial.ammo = ammo;
	neuesSpecial.action = action;
	special[designation] = neuesSpecial;
}

function cloneSpecial(designation){
	if (designation === "none") return undefined;
	clonedSpecial = {};
	clonedSpecial.designation = designation;
	clonedSpecial.reload = special[designation].reload;
	clonedSpecial.ammo = special[designation].ammo;
	neuesSpecial.action = special[designation].action;
	return clonedSpecial;
}

function setupSpecials(){
createSpecial("spawn_ophianianChunk", 3000, 66, function(){spawnShip("Ophianian Chunk", this.x, this.y, this.angle, npc.defender, this.ID)});
}