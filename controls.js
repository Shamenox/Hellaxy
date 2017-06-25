function player1(){
	player1Pos = i;
	playerShip = SECTOR.ships[i];
	frame.x = SHIP.x - 640;
	frame.y = SHIP.y - 360;
	frame.adjust();
	if (!click){
		if (key.a) SECTOR.ships[i].angle -= 40 * SECTOR.ships[i].a; //Drehung
		if (key.d) SECTOR.ships[i].angle += 40 * SECTOR.ships[i].a;
	} else {
		this.pointAt({x : cursor.x + frame.x, y : cursor.y + frame.y});
		this.turn();
	}
	if (key.w) {
		SECTOR.ships[i].acc();
	}
	if (key.s) {
		SECTOR.ships[i].dec();
	}
	if (key.space) SECTOR.ships[i].wp1.fire();
}

var npc = new Ship();
function setupNpcs(){
	npc.simpleRoamer = function(){
		this.acc();
		if (intervalReact(this.x < 150 || this.x > SECTOR.width - 150 || this.y < 150 || this.y > SECTOR.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("anythingElse", 400) !== false){
			if (this.hp >= SHIP.mass / 2){
				this.pointAt(this.nextShip("anythingElse", 400));
				if (this.pointsAt(this.nextShip("anythingElse", 400))) {
					this.fireSmall()
					if (this.special1 !== undefined) this.special1.exe();
				}
			}
			if (this.hp < SHIP.mass / 2){
				this.pointFrom(this.nextShip("anythingElse", 400));
			}
		}
	}
	npc.defender = function(){
		var of = SECTOR.ships[this.relationShipID];
		if (of.active === true){
			if (of.nextShip("anythingElse", 300) === false){
				this.follow(of, 50);
			} else {
				this.follow(of.nextShip("anythingElse", 300), 20);
				if (this.pointsAt(of.nextShip("anythingElse", 300))) this.fireSmall();
			}
		} else {this.ctrl = npc.simpleRoamer;}
	}
	npc.striver = function(){
		this.acc();
		if (this.hp < ship[this.designation].hp / 2) this.turnArround();
	}
	npc.test = function(){
		if (intervalReact(true, 3000, "testturn"))this.turnArround();
		//this.pointAt(SECTOR.ships[0]);
		if (this.pointsAt(SECTOR.ships[0])) this.fireSmall();
	}
	
	npc.ophianian_annector = function(){
		if (intervalReact(this.x < 150 || this.x > background.naturalWidth - 150 || this.y < 150 || this.y > background.naturalHeight - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("humanian", 400) === false){
			this.follow(sector.Central_Sector.planets[0], 10);
		}else{
			this.pointAt(this.nextShip("humanian", 400), 300);
			this.special1.exe();
			if (this.nextShip("humanian", 400) === sector.Central_Sector.ships[this.ID - 7]){
				if (this.pointsAt(central_sector.ships[this.ID - 7])) this.acc();
			}else{
				if (this.pointsAt(this.nextShip("humanian", 400))) this.fireSmall();
			}
		}
	}
}