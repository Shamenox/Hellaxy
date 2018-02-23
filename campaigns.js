var LEVEL;

class Campaign {
	constructor(designation){
		this.designation = designation;
		this.levels = [];
		this.at = 0;
	}
	
	
	addLevel(setup, conditions, events){
		this.levels.push(new Level(this, setup, conditions, events));
	}
	
	
	act(){
		if (LEVEL.events !== undefined) LEVEL.events();
		for (var cond in LEVEL.conditions){
			if (LEVEL.conditions[cond] === false) return;
		}
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.fillText("Mission completed!!!", 450, 200);
		Helon.ctx.fillText("Press 'E' to continue", 450, 250);
		if (intervalReact(key.e, 500, "msgDelay")) LEVEL.end();
	}
}


function createCampaign(designation){
	Hellaxy.campaigns[designation] = new Campaign(designation);
}



class Level {
	constructor(belong, setup, conditions, events){
		this.campaign = belong;
		this.setup = setup;
		this.isSetup = false;
		this.conditions = conditions;
		if (events !== undefined) this.events = events;
	}
	
	
	cancel(){
		if (typeof Hellaxy.sector.theme.play === "function") Hellaxy.sector.theme.pause();
		projectile.splice(0, projectile.length);
		Hellaxy.msgs.splice(0, Hellaxy.msgs.length);
		this.target = "none";
		this.isSetup = false;
		Hellaxy.sector.ships = [];
		setScreen("menue");
		Hellaxy.task = screenManager;
		for (var cond in this.conditions){
			this.conditions[cond] = false;
		}
	}
	
	
	end(){
		this.cancel()
		this.campaign.at += 1;
	}

}


function createLevel(belong, setup, conditions, events){
	Hellaxy.campaigns[belong].levels.push(new Level(Hellaxy.campaigns[belong], setup, conditions, events));
}







function campaignManager(){
	Hellaxy.sector.act();
	Hellaxy.campaign.act();
	loop(Hellaxy.sector.theme);
	 if (LEVEL.target !== undefined) cursor.pointAt({
		x : LEVEL.target.x - Hellaxy.Sector.offset.x,
		y : LEVEL.target.y - Hellaxy.Sector.offset.y,
	});
	if (intervalReact(key.esc, 500, "esc")){
		setScreen("paused");;
		Hellaxy.task = screenManager;
	}
	if (Hellaxy.msgs.length !== 0){
		setScreen("messager");
		Hellaxy.task = screenManager;
	}
}


function start(at, withShip){
	Hellaxy.sector = at.sector;
	spawnShip(withShip, at.x + 100, at.y + 100, 0, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
	Hellaxy.sector.ships[Hellaxy.sector.ships.length - 1].mass++;
}