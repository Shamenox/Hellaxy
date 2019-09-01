var npc = {};
var player1ship = {};


function setupControls(){
	
	
	player1 = function(){
		player1ship = this;
		Hellaxy.sector.focus(this);
		if (!click){
			if (key.a && !key.d) this.turn("left"); //Drehung
			if (key.d && !key.a) this.turn("right");
			if (!key.d && !key.a) this.turn("stop");
		} else {
			this.turn({x : cursor.x / this.screen.scale + this.screen.offsetX, y : cursor.y / this.screen.scale + this.screen.offsetY});
			if (key.a) this.acc("left");
			if (key.d) this.acc("right");
		}
		if (key.w) {
			this.acc();
		}
		if (key.s) {
			this.dec();
		}
		if (key.space) this.fire(1);
		if (key.e) this.fire(2);
		if (key.q) this.fire(3);
		if (key.minus) this.screen.zoomOut();
		if (key.plus) this.screen.zoomIn();
		if (key.one) this.useSpecial(1);
		GUI(this);
	}
}
	/*
	npc.simpleRoamer = function(){ 
		this.acc();
		this.turn();
		if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
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
	
	npc.aggressor = function(){ 
		this.acc();
		this.turn();
		if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		var trgt = this.nextShip("anythingElse", 600);
		if (trgt !== false){
			this.follow(trgt, 400);
			if (this.pointsAt(trgt)){
				this.fire(1);
				this.fire(2);
				this.fire(3);
			}
		}
	}
	
	npc.asteroid1 = function(){
		this.turn("left");
	}
	
	npc.asteroid2 = function(){
		this.turn("right");
	}
	
	npc.asteroid3 = function(){
	}
	
	npc.rammer = function(){ 
		this.acc();
		this.turn();
		if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		var trgt = this.nextShip("anythingElse", 900);
		if (trgt !== false){
			this.pointAt(trgt);
			if (this.pointsAt(trgt)) {
				this.fire(1);
				this.fire(2);
				this.fire(3);
			}
		}
	}
	
	npc.defender = function(){
		var of = this.nextShip(this.fraction);
		if (of !== false){
			var trgt = of.nextShip("anythingElse", 500);
			if (trgt === false){
				this.follow(of, 100);
			}
			if (trgt !== false){
				this.follow(trgt, 300);
				if (this.pointsAt(trgt)){
					this.fire(1);
					this.fire(2);
					this.fire(3);
				}
			}
		} else {
			this.acc();
			this.turn();
			if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		}
	}
	
	npc.fairy = function (){
		var nearby = this.nextShips(this.fraction, 400);
		if (nearby.length > 3){
			for (var e = 0; e < 4; e++){
				nearby[e].vanish();
			}
			spawnShip(this.fraction + "_" + this.mergeTo, this.x, this.y, this.angle, npc.fairy);
			this.vanish();
			console.log("Stern erschienen!");
		} else{
			nearby = this.nextShip("anythingElse");
			if (nearby !== false){
				if (nearby.fraction === "ophianic"){
					this.pointAt(nearby);
					this.acc();
					this.fire(1);
				} else{
					this.follow(nearby, 350);
				}
			} else{
				this.acc();
				if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
			}
		}
		this.turn();
	}
	
	npc.turret = function(){
		var trgt = this.nextShip("anythingElse");
		if (trgt !== false){
			this.pointAt(trgt);
			this.turn();
			if (this.pointsAt(trgt)) {
				this.fire(1);
				this.fire(2);
				this.fire(3);
				this.useSpecial(1);
			}
		}
	}
	
	npc.patrol = function(){
		this.acc();
		this.turn();
		if (intervalReact(true, 3000, this.ID))this.turnArround();
	}

	npc.ophianian_annector = function(){
		this.turn();
		var trgt = this.nextShip("humanian");
		if (intervalReact(this.x < 150 || this.x > Hellaxy.sector.width - 150 || this.y < 150 || this.y > Hellaxy.sector.height - 320, 5000, "turnarround" + this.ID)) this.turnArround();
		if (trgt === false){
			this.follow(Hellaxy.planets.humania, 50);
		}
		else {
			this.pointAt(trgt);
			this.sp1.exe();
			if (trgt.designation === "satalite"){
				if (this.pointsAt(trgt)) this.acc();
			}
			else{
				if (this.pointsAt(trgt)) this.fire(1);
			}
		}
	} */