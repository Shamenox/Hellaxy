var LEVEL;

class Campaign {
	constructor(){
		this.levels = [];
		this.at = 0;
	}
	
	
	addLevel(setup, conditions, events){
		this.levels.push(new Level(this, setup, conditions, events));
	}
	
	
	act(){
		if (LEVEL.events !== undefined) LEVEL.events();
	}
}



function campaignManager(){
	Hellaxy.campaign.act();
	Hellaxy.sector.act();
	 if (LEVEL.target !== undefined) cursor.pointAt({
		x : LEVEL.target.x - Hellaxy.Sector.offset.x,
		y : LEVEL.target.y - Hellaxy.Sector.offset.y,
	});
	if (intervalReact(key.esc, 500, "esc")){
		Hellaxy.screen = paused;
		Hellaxy.task = screenManager;
	}
	if (Hellaxy.msgs.length !== 0){
		Hellaxy.screen = messager;
		Hellaxy.task = screenManager;
	}
	for (var cond in LEVEL.conditions){
			if (LEVEL.conditions[cond] === false) return;
		}
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.fillText("Mission completed!!!", 450, 200);
	Helon.ctx.fillText("Press 'E' to continue", 450, 250);
	if (intervalReact(key.e, 500, "msgDelay")) LEVEL.end();
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
		Hellaxy.screen = menue;
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

humanian = new Campaign();  
quicktest = new Campaign();  
freeroaming = new Campaign(); 
chestanian = new Campaign();  
qubanian = new Campaign();                                                                                                //<-- Kampagnendeklarierung

function setupLevels(){
	quicktest.addLevel(function(){
			Hellaxy.sector = testmap;
			spawnShip("humanian_protobaseship_helonia", 200, 250, 180, player1);
			humanian_shuttle.spawn(testmap, 300, 100, 0, npc.defender);
			humanian_shuttle.spawn(testmap, 400, 100, 0, npc.defender);
			testarrow.spawn(testmap, 100, 100, 0, "none", function(){addMsg("Test123");});
			testarrow.spawn(testmap, 400, 400, 0, npc.simpleRoamer);
			fatman.spawn(testmap, 700, 1300, 90, npc.simpleRoamer);
			testmap.spawnAsteroids(600, 600, 400, 400);
		},
		{
			no : false
		}
	);
	
	freeroaming.addLevel(function(){
			Hellaxy.sector = central_sector;
			humanian_shuttle.spawn(omar_sector, 1050, 1100, 0, npc.defender);
		},
		{
			no : false
		}
	);
	
	humanian.addLevel(function(){
			Hellaxy.sector = central_sector;
			central_sector.addPlanet("humania", 1000, 1000);
			central_sector.addPlanet("pontes", 1420, 2550);
			humanian_shuttle.spawn(central_sector, 1000, 1000, 0, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
			central_sector.ships[0].mass++;
			humanian_shuttle.spawn(central_sector, 1050, 1100, 0, npc.defender);
			humanian_shuttle.spawn(central_sector, 950, 1100, 0, npc.defender);
			humanian_shuttle.spawn(central_sector, 1050, 1050, 0, npc.defender);
			humanian_shuttle.spawn(central_sector, 1000, 1050, 0, npc.defender);
			humanian_shuttle.spawn(central_sector, 950, 1050, 0, npc.defender);
			qubanian_colonizer.spawn(central_sector, 200, 200, 135, function(){this.follow(central_sector.planets[0], 200);}, function(){addMsg("Unknown Object eliminated! Return to base!"); LEVEL.conditions.ufoeliminated = true;});
			addMsg("Log in: 2007. Cycle; 236; 1.Humanian Squadron Commander Blue ID:29344");
			addMsg("Humanian HQ: Attention!");
			addMsg("Welcome to your first flight as our first ever Space Pilot Commander.");
			addMsg("According to your Intruments you six should all be fine out there.");
			addMsg("Dont get carried away. The Reason we starded the Mission early");
			addMsg("was because that unknown trabant");
			addMsg("that appeared on our radars one month ago");
			addMsg("has suddenly starded to move towards Humania.");
			addMsg("Your mission is to guard our Orbit");
			addMsg("and eliminate said Object if necessary.");
			addMsg("You control your Shuttle by clicking in the direction you want to head");
			addMsg("or alternatively via the WASD interface.");
			addMsg("The Space bar triggers your high-tech 5nm machinegun twin.");
			addMsg("Be aware that our new shuttles are agile but fragile!");
			addMsg("So make sure to not ram or guide them into anything!");
			addMsg("Good luck out there!");
		},
		{
			ufoeliminated : false
		}
	);
	
	
	humanian.addLevel(function(){
		Hellaxy.sector = central_sector;
		central_sector.addPlanet("haufen1", 600, 1800);
		humanian_protobaseship_helonia.spawn(central_sector, 1200, 1000, 180, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		humanian_shuttle.spawn(central_sector, 1050, 1100, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1000, 1000, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 950, 1100, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1050, 1050, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1000, 1050, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 950, 1050, 0, npc.defender);
		humanian_satalite.spawn(central_sector, 1100, 1100);
		addMsg("Log in: 2008. Cycle; 43; 1.Humanian Protobaseship 'Helonia' ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Admire your new flagship commander!");
		addMsg("We invested a lot of ressources to build this gigantic, well armoured");
		addMsg("piece of engineering. Treat it with care!");
		addMsg("Our space project was an absolute Sucess!");
		addMsg("Thats why we erected an Space hangar in our orbit");
		addMsg("to enable further research.");
		addMsg("We still dont know much about our interplanetary environtment.");
		addMsg("We registered an interesting sonar pattern not far from Humania.");
		addMsg("Your order is to gather some samples from that location");
		addMsg("and to bring them to our orbital hangar for analysis.");
		addMsg("If you have a defined target location your cursor will now");
		addMsg("turn into a direction indicator by clicking.");
		addMsg("Good luck!");
		this.target = central_sector.planets[2];
		},
		{
			gotback : false,
			pile1 : false,
			pile2 : false,
			pile3 : false
		},
		function(){
			if (!LEVEL.conditions.pile1 && player1ship.collidesWith(central_sector.planets[2])){
				central_sector.addPlanet("haufen2", 4000, 2000);
				addMsg("Great!");
				addMsg("Interesting, the sample seems to contain some kind of ");
				addMsg("matter-changing substance...");
				addMsg("We just registered two more signals of same specifications.");
				addMsg("They are both located right from you.");
				addMsg("Please get us samples from both new anomalies for comparasion.");
				this.target = central_sector.planets[3];
				LEVEL.conditions.pile1 = true;
			}
			if (!LEVEL.conditions.pile2 && player1ship.collidesWith(central_sector.planets[3])){
				central_sector.addPlanet("haufen3", 4150, 1300);
				addMsg("We were rigth, this celestial body consists of the exactly ");
				addMsg("same material as the first one.");
				addMsg("Get a sample from the last signal for final confirmation!");
				this.target = central_sector.planets[4];
				LEVEL.conditions.pile2 = true;
			}
			if (!LEVEL.conditions.pile3 && player1ship.collidesWith(central_sector.planets[4])){
				addMsg("Yes, its the exactly same structure as the other ones.");
				addMsg("But this 'planet' emmits some kind of a live-signal.");
				addMsg("Alert, the samples we already gathered changed their structure ");
				addMsg("to something very radical attacking the testtubes!");
				addMsg("There is also something ascending from the 'planet´s' core.");
				addMsg("Eliminate it if neccessary and return home ASAP!");
				ophianic_chunk.spawn(central_sector, 4120, 1310, 270, npc.simpleRoamer);
				ophianic_chunk.spawn(central_sector, 4150, 1300, 270, npc.simpleRoamer);
				ophianic_chunk.spawn(central_sector, 3190, 1320, 270, npc.simpleRoamer);
				this.target = this.target = central_sector.planets[0];
				LEVEL.conditions.pile3 = true;
			}
			if (LEVEL.conditions.pile3 && !LEVEL.conditions.gotback && player1ship.collidesWith(central_sector.planets[0])) {
				addMsg("This shapeshifting substance seems to be oozing out of these");
				addMsg("'erupting' protoplanets all over the System...");
				addMsg("However this is a mystery for our scientists to figure out.");
				LEVEL.conditions.gotback = true;
			}
		}
	);
	
	
	humanian.addLevel(function(){
		Hellaxy.sector = central_sector;
		humanian_protobaseship_helonia.spawn(central_sector, 1200, 1000, 180, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		ophianic_annectorstar.spawn(central_sector, 2000, 1100, 270, npc.ophianian_annector);
		humanian_shuttle.spawn(central_sector, 1050, 1100, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1000, 1000, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 950, 1100, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1050, 1050, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 1000, 1050, 0, npc.defender);
		humanian_shuttle.spawn(central_sector, 950, 1050, 0, npc.defender);
		humanian_satalite.spawn(central_sector, 1100, 1100, 0, function(){this.x = 1100; this.y = 1100;}, function(){addMsg("They´re invading our Planet! Please you have to stop them!!!")});
		addMsg("Log in: 2008. Cycle; 102; 1.Humanian Protobaseship 'Helonia' ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Something enormously huge as appeared on our Radars.");
		addMsg("It is located right from you nearing at alarming speed");
		addMsg("From what we experienced last time");
		addMsg("Armed Combat is inevidable.");
		addMsg("Your armour should allow you to wether the storm, but");
		addMsg("try to take care of your Squadron.");
		addMsg("For Humania!");
		},
		{
			dmgd : false,
			escaped : false,
		},
		function(){
			if (central_sector.ships[0].hp < 2400 && this.conditions.dmgd === false ){
				addMsg("Thats it, there is no hope for the Planet...");
				addMsg("We have no other choice, please forgive us.");
				addMsg("Start the FTL-engines!");
				central_sector.ships[0].ctrl = function(){this.pointFrom(this.sector.ships[1]); this.a = 1; this.turn(); this.acc(); if (this.y < central_sector.offset.y || this.x > central_sector.offset.x) LEVEL.conditions.escaped = true;};
				this.conditions.dmgd = true;
			}
		}
	);
	
	qubanian.addLevel(function(){
		Hellaxy.sector = central_sector;
		central_sector.addPlanet("quba", 444, 444);
		central_sector.addPlanet("blank", 2550, 2100);
		qubanian_colonizer.spawn(central_sector, 500, 500, 90, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		addMsg("Log in: 2007. Cycle; 143; 1.Colonization Msission ID:214");
		addMsg("Attention! This is mission-control!");
		addMsg("We are proud to have finally made it into space!");
		addMsg("Your task, commander, is to guide our new colonization-vessel");
		addMsg("to the recently discoverd habitable zone without a scratch.");
		addMsg("We updated its coordinates into your cursor-interface.");
		addMsg("Best of luck, commander!");
		LEVEL.target = Hellaxy.planets["blank"];
		},
		{
			colonized : false,
		},
		function(){
			if (!this.conditions.colonized && player1ship.collidesWith(Hellaxy.planets["blank"])){
				qubanian_colony.spawn(central_sector, 2378, 2078, 0, "none");
				addMsg("Congratulations Commander!");
				addMsg("We are recieving first transmissions from our new colony.");
				addMsg("Let´s begin upgrading its infrastructure!");
				LEVEL.conditions.colonized = true;
			}
		}
	);
	
	
	qubanian.addLevel(function(){
		Hellaxy.sector = central_sector;
		qubanian_colony.spawn(central_sector, 2378, 2078, 0, player1, function(){LEVEL.conditions.destroyed = true});
		addMsg("Log in: 2007. Cycle; 144; Colony Defence Act ID:214");
		addMsg("Attention! This is Qubanian HQ!");
		addMsg("We just recieved a dread from an alien-lifeform!");
		addMsg("They call themselves Birchanians and announced that they");
		addMsg("will destroy our newly errected colony, as it is within ther territory.");
		addMsg("We tried to negotiate with them on a friendly basis,");
		addMsg("But they wont change their mind...");
		addMsg("Unfortunatly our only weaponary in this colony");
		addMsg("is a light antispacecraft firescreen.");
		addMsg("As the commander you can order to fire all cannons with your '1'-key.");
		addMsg("Birchanian warships are on their way.");
		addMsg("We will do everything we can for you!");
		},
		{
			destroyed : false,
		},
		function(){
			if (central_sector.ships.length < 4){
				birchanian_glider.spawn(central_sector, 3050, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3100, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3150, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3050, 3050, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3100, 3100, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3150, 3150, 315, npc.rammer);
			}
		}
	);
	
	
	qubanian.addLevel(function(){
		Hellaxy.sector = central_sector;
		central_sector.addPlanet("quba", 444, 444);
		central_sector.addPlanet("blank", 2200, 1900);
		qubanian_colonizer.spawn(central_sector, 500, 500, 90, player1, 0, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		central_sector.ships[central_sector.ships.length - 1].mass++;
		qubanian_colonizer.spawn(central_sector, 550, 500, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 550, 550, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 500, 550, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 600, 500, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 600, 550, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 550, 600, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 600, 600, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		qubanian_colonizer.spawn(central_sector, 550, 600, 90, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		addMsg("Log in: 2007. Cycle; 150;  Super Colonization ID:217");
		addMsg("Attention! This is mission-control!");
		addMsg("What the Birchanians have done so arrogantly is unforgivable!");
		addMsg("We cant coexist with them for any longer.");
		addMsg("To prove our superiority once and for all we build another 9");
		addMsg("Colonizators to errect a gigantic cluster-colony.");
		addMsg("Guide our colonizator squadron again into the habitable zone.");
		addMsg("But be carefull, The Birchanians are constantly sending warships!");
		LEVEL.target = planets["blank"];
		},
		{
			colonized : false,
			send : false,
			defended : false,
		},
		function(){
			if (!this.conditions.colonized && player1ship.collidesWith(planets["blank"])){
				qubanian_colony.spawn(central_sector, 2250, 1950, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2378, 1950, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2506, 1950, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2250, 2078, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2378, 2078, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2506, 2078, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2250, 2206, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2378, 2206, 0, npc.turret);
				qubanian_colony.spawn(central_sector, 2506, 2206, 0, npc.turret);
				LEVEL.conditions.colonized = true;
				addMsg("We made it! The super cluster colony");
				addMsg("and all of its anti-spacecraft cannons are online.");
				addMsg("Now we´ll show them!");
			}
			if (intervalReact(!this.conditions.colonized, 20000, "attackrate")){
				birchanian_glider.spawn(central_sector, 3150, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3050, 3050, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3100, 3100, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3150, 3150, 315, npc.rammer);
			}
			if (LEVEL.conditions.colonized === true && !LEVEL.conditions.send){
				birchanian_glider.spawn(central_sector, 3050, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3100, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3150, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3050, 3050, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3100, 3100, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 3150, 3150, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2950, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2800, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2750, 3000, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2950, 2950, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2800, 2800, 315, npc.rammer);
				birchanian_glider.spawn(central_sector, 2750, 2750, 315, npc.rammer);
				LEVEL.conditions.send = true;
			}
			if (LEVEL.conditions.send === true && central_sector.ships.length < 23 && !LEVEL.conditions.defended){
				addMsg("Most of the Birchanian units are destroyed.");
				addMsg("Space superiority is ours. Well done commander!");
				LEVEL.conditions.defended = true;
			}
		}
	);
	

	
	
	
	chestanian.addLevel(function(){
		Hellaxy.sector = outer_sector;
		outer_sector.addPlanet("chestanian_fortress", 1625, 18000);
		chestanian_colonizer.spawn(outer_sector, 1800, 18500, 90, player1, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		addMsg("Log in: 2008. Cycle; 102; 1.Humanian Protobaseship 'Helonia' ID:29344");
		},
		{
			colonized : false,
		},
		function(){}
	);
	
}