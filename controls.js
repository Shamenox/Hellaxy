var npc = new Ship();


function setupControls(){
	
	player1 = function(){
		Hellaxy.Sector.focus(this);
		if (!click){
			if (key.a) this.turn("left"); //Drehung
			if (key.d) this.turn("right");
		} else {
			this.pointAt({x : cursor.x + Hellaxy.Sector.offset.x, y : cursor.y + Hellaxy.Sector.offset.y});
			this.turn("target");
		}
		if (key.w) {
			this.acc();
		}
		if (key.s) {
			this.dec();
		}
		if (key.space) this.wp1.fire(), console.log(projectile);;
	}
	
	npc.simpleRoamer = function(){ 
		this.acc();
		this.turn();
		if (intervalReact(this.x < 150 || this.x > Hellaxy.Sector.width - 150 || this.y < 150 || this.y > Hellaxy.Sector.height - 320, 5000, "turnarround" + this.ID())) this.turnArround();
		if (this.nextShip("anythingElse", 400) !== false){
			if (this.hp >= this.mass / 2){
				this.pointAt(this.nextShip("anythingElse", 400));
				if (this.pointsAt(this.nextShip("anythingElse", 400))) {
					this.fire(1);
					this.fire(2);
					this.fire(3);
				}
			}
			if (this.hp < this.mass / 2){
				this.pointFrom(this.nextShip("anythingElse", 400));
			}
		}
	}
	
	npc.defender = function(){
		var of = Hellaxy.Sector.ships[this.relationShipID];
		if (of.active === true){
			if (of.nextShip("anythingElse", 300) === false){
				this.follow(of, 50);
			} else {
				this.follow(of.nextShip("anythingElse", 300), 20);
				if (this.pointsAt(of.nextShip("anythingElse", 300))) this.fireSmall();
			}
		} else {this.ctrl = npc.simpleRoamer;}
	}
	/*
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
	} */
}