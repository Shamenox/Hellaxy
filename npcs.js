var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(){
		this.acc();
		if (intervalReact(this.x < 150 || this.x > background.naturalWidth - 150 || this.y < 150 || this.y > background.naturalHeight - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("anythingElse", 400) !== false){
			if (this.hp >= ship[this.designation].hp / 2){
				this.pointAt(this.nextShip("anythingElse", 400));
				if (this.pointsAt(this.nextShip("anythingElse", 400))) this.fireSmall();
			}
			if (this.hp < ship[this.designation].hp / 2){
				this.pointFrom(this.nextShip("anythingElse", 400));
			}
		}
	}
	npc.defender = function(){
		var of = sector[sector.at].ships[this.relationShipID];
		if (of.active === true){
			if (of.nextShip("anythingElse", 400) === false){
				this.follow(of, 100);
			} else {
				this.follow(of.nextShip("anythingElse", 400), 20);
				if (this.pointsAt(of.nextShip("anythingElse", 400))) this.fireSmall();
			}
		} else {this.ctrl = npc.simpleRoamer;}
	}
	npc.test = function(){
		if (intervalReact(true, 3000, "testturn"))this.turnArround();
		//this.pointAt(sector[sector.at].ships[0]);
		if (this.pointsAt(sector[sector.at].ships[0])) this.fireSmall();
	}
}