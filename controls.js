﻿var npc = new Ship();
var player1ship = new Ship();


function setupControls(){
	
	player1 = function(){
		player1ship = this;
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
		if (key.space) this.fire(1);
		if (key.e) this.fire(2);
		if (key.q) this.fire(3);
		if (key.one) this.useSpecial(1);
		GUI(this);
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
	
	npc.rammer = function(){ 
		this.acc();
		this.turn();
		if (intervalReact(this.x < 150 || this.x > Hellaxy.Sector.width - 150 || this.y < 150 || this.y > Hellaxy.Sector.height - 320, 5000, "turnarround" + this.ID())) this.turnArround();
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
		} else {this.ctrl = npc.simpleRoamer;}
	}
	
	npc.turret = function(){
		if (this.nextShip("anythingElse", 500) !== false){
			this.pointAt(this.nextShip("anythingElse", 400));
			if (this.pointsAt(this.nextShip("anythingElse", 400)) || this.a === 0) {
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
		if (intervalReact(true, 3000, this.ID()))this.turnArround();
	}

	npc.ophianian_annector = function(){
		this.turn();
		var trgt = this.nextShip("humanian", 500);
		if (intervalReact(this.x < 150 || this.x > Hellaxy.Sector.width - 150 || this.y < 150 || this.y > Hellaxy.Sector.height - 320, 5000, "turnarround" + this.ID())) this.turnArround();
		if (trgt === false){
			this.follow(central_sector.planets[0], 50);
		}
		else {
			this.pointAt(trgt);
			this.sp1.exe();
			if (trgt === this.sector.ships[this.ID() + 7]){
				if (this.pointsAt(this.sector.ships[this.ID() + 7])) this.acc();
			}
			else{
				if (this.pointsAt(trgt)) this.fire(1);
			}
		}
	} 
}