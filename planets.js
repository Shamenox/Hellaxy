class Planet{
	constructor(designation, skin, inSector, x, y){   //designation, inSector, x, y
	this.designation = designation;
	this.skin = image[designation];
	this.x = x;
	this.y = y;
	this.fraction = "planet";
	planet[designation].sector = inSector;
	inSector.planets.push(this);
	}
}