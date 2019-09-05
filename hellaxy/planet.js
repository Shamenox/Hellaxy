class Planet extends Body{
	constructor(designation, x, y, sector){
		if (!exists(designation)){
			console.log("error: tried to place unknown planet");
			return;
		}
		super();
		this.designation = designation;
		this.setSkin("planet_" + designation);
		this.x = setProp(x, 0);
		this.y = setProp(y, 0);
		console.log(sector);
		if (!exists(sector)) sector = lastStat.sector;
		console.log(sector);
		sector.add(this);
	}
}