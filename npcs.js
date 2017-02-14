var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(){
		this.acc();
		if (intervalReact(this.x < 150 || this.x > background.naturalWidth - 150 || this.y < 150 || this.y > background.naturalHeight - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("anything", 400) !== false){
			if (this.hp >= ship[this.designation].hp / 2){
				this.pointAt(this.nextShip("anything", 400));
				if (this.pointsAt(this.nextShip("anything", 400))) this.fireSmall();
			}
			if (this.hp < ship[this.designation].hp / 2){
				this.pointFrom(this.nextShip("anything", 400));
			}
		}
	}
	npc.test = function(){
		//if (intervalReact(true, 3000, "testturn"))this.turnArround();
		this.pointAt(sector[sector.at].ships[0]);
		console.log(this.pointsAt(sector[sector.at].ships[0]));
	}
}