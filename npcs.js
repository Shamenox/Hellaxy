var npc = {};
function setupNpcs(){
	npc.simpleRoamer = function(){
		this.acc();
		if (intervalReact(this.x < 200 || this.x > background.naturalWidth - 200 || this.y < 200 || this.y > background.naturalHeight - 200, 6000, "turnarround" + this.ID)) this.turnArround();
		if (this.nextShip("anything", 400) !== false){
			this.pointAt(this.nextShip("anything", 400));
			this.fireSmall();
		}
	}
	npc.test = function(){
		if (intervalReact(true, 3000, "testturn"))this.turnArround();
	}
}