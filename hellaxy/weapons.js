class Weapon {
	constructor(designation, skin, alpha, pen, reload, ammo){  //skin, alpha, pen, reload, ammo
		if (designation === undefined) return;
		this.designation = designation;
		this.skin = getImg("proj_" + skin);
		this.skinName = skin;
		this.alpha = alpha;
		this.pen = pen;
		this.reload = reload;
		this.ammo = ammo;
		
		Hellaxy.weapons[designation] = this;
	}
	
	
	
	
	clone(){
		var clone = new Weapon();
		for (var property in this){
			clone[property] = this[property];
		}
		return clone;
	}
	
	
	
	fire(){
		if (intervalReact(this.ammo > 0, this.reload, this.designation + this.ship.staticID)){
			this.ammo --;
			new Projectile(this);
		} 
	}
}



function setupWeapons(){  //skin, alpha, pen, reload, ammo
	new Weapon("machinegun_5nm", "shot_light1", 4, 2, 100, 300);
	new Weapon("kolexialgun_14nm", "shot_medium_tripple", 36, 10, 200, 600);
	new Weapon("ophianian_beam", "beam_ophianian", 1000, 5, 4000, 66);
	new Weapon("triangle_beam", "triangle", 150, 3, 1000, 100);
	new Weapon("spike_artillery", "spikes1", 120, 3, 1000, 100);
	new Weapon("emp_director_1", "emp1", 50, 3, 1000, 100);
	new Weapon("emp_director_2", "emp1", 50, 3, 200, 500);
	new Weapon("emp_director_small", "emp2", 3, 2, 100, 400);
	
	console.log("Weapons:", Hellaxy.weapons);
}