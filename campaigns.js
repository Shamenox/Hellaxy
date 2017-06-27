class Campaign {
	constructor(){
		this.levels = [];
		this.at = 0;
	}
	
	
	addLevel(setup, conditions, events){
		this.levels.push(new Level(setup, conditions, events));
	}
	
	
	check(){
		LEVEL = this.levels[this.at];
		if (!LEVEL.isSetup) LEVEL.setup(), LEVEL.isSetup = true;
		if (LEVEL.events !== undefined) LEVEL.events();
		for (var cond in LEVEL.conditions){
			if (LEVEL.conditions[cond] === false) return; 
		}
		Game.ctx.fillStyle = "yellow";
		Game.ctx.fillText("Mission completed!!!", 450, 200);
		Game.ctx.fillText("Press Space to continue", 450, 250);
		if (key.space) LEVEL.end();
	}
}



class Level {
	constructor(setup, conditions, events){
		this.setup = setup;
		this.isSetup = false;
		this.conditions = conditions;
		if (events !== undefined) this.events = events;
	}
	
	
	end(){
		projectile.splice(0, projectile.length);
		this.target = "none";
		CAMPAIGN.at += 1;
		CAMPAIGN = { check : function(){}, theme : "none"};
		SECTOR = campaign;
	}
	
	
	cancel(){
		projectile.splice(0, projectile.length);
		this.target = "none";
		CAMPAIGN = { check : function(){}, theme : "none"};
		SECTOR = menue;
	}
}

humanian = new Campaign();                                                                                                          //<-- Kampagnendeklarierung

function setupLevels(){
	humanian.addLevel(function(){
		SECTOR = central_sector;
		central_sector.addPlanet("humania", 1000, 1000);
		central_sector.addPlanet("pontes", 1420, 2550);															//designation, inSector, x, y
		humanian_shuttle.spawn(central_sector, 1000, 1000, 0, player1, 0, function(){addMsg("Report critical Damage"); LEVEL.end();}); 			//inSector, atX, atY, atAngle, ctrl, relationShip, abgang
		humanian_shuttle.spawn(central_sector, 1050, 1100, 0, npc.defender, 0);
		humanian_shuttle.spawn(central_sector, 950, 1100, 0, npc.defender, 0);
		humanian_shuttle.spawn(central_sector, 1050, 1050, 0, npc.defender, 0);
		humanian_shuttle.spawn(central_sector, 1000, 1050, 0, npc.defender, 0);
		humanian_shuttle.spawn(central_sector, 950, 1050, 0, npc.defender, 0);
		qubanic_colonizer.spawn(central_sector, 400, 400, 135, function(){this.follow(central_sector.planets[0], 200);}, undefined, function(){addMsg("Unknown Object eliminated! Return to base!"); LEVEL.conditions.ufoeliminated = true;});
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
		addMsg("Good luck out there!");
		},
		{ ufoeliminated : false}
	);
	/*
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
		central_sector.addPlanet("imat_chestcolony", 600, 1800);
		spawnShip("Humanian Protobaseship Helonia", 1200, 1000, 180, player1, 0, function(){addMsg("Report critical Damage"); endLevel();});
		spawnShip("Humanian Satalite", 1100, 1100, 0, function(){this.x = 1100; this.y = 1100;});
		spawnShip("Humanian Shuttle", 1300, 1000, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1000, 0, npc.defender, 0);
		addMsg("Log in: 2008. Cycle; 43; 1.Humanian Protobaseship 'Helonia' ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Admire your new flagship commander!");
		addMsg("We invested a lot of ressources to build this gigantic, well armoured");
		addMsg("piece of engineering. Treat it with care!");
		addMsg("Our space project was an absolute Sucess!");
		addMsg("Thats why we erected an Space hangar in our orbit");
		addMsg("to enable further research.");
		addMsg("We still dont know much about our interplanetary environment.");
		addMsg("We registered an interesting sonar pattern not far from humania.");
		addMsg("Your order is to gather some samples from that location");
		addMsg("and to bring them to our orbital hangar for analysis.");
		addMsg("If you have a defined target location your cursor will now");
		addMsg("turn into a direction indicator by clicking.");
		addMsg("Good luck!");
		target = sector.Central_Sector.planets[2];
		}, {gotback : false, pile1 : false, pile2 : false, pile3 : false},
		function(){
			if (!LEVEL.conditions.pile1 && sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[2])){
				createPlanet("imat_vanillia", "haufen", "Central_Sector", 4000, 2000);
				addMsg("Great!");
				addMsg("Interesting, the sample seems to contain some kind of ");
				addMsg("matter-changing substance...");
				addMsg("We just registered two more signals of same specifications.");
				addMsg("They are both located west from you.");
				addMsg("Please get us samples from both new anomalies for comparasion.");
				target = sector.Central_Sector.planets[3];
				LEVEL.conditions.pile1 = true;
			}
			if (!LEVEL.conditions.pile2 && sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[3])){
				createPlanet("imat_ghionosis", "haufen", "Central_Sector", 4150, 1300);
				addMsg("We were rigth, this celestial body consists of the exactly ");
				addMsg("same material as the first one.");
				addMsg("Get a sample from the last signal for final confirmation!");
				target = sector.Central_Sector.planets[4];
				LEVEL.conditions.pile2 = true;
			}
			if (!LEVEL.conditions.pile3 && sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[4])){
				addMsg("Yes, its the exactly same structure as the other ones.");
				addMsg("But this 'planet' emmits some kind of a live-signal.");
				addMsg("Alert, the samples we already gathered changed their structure ");
				addMsg("to something very radical attacking the testtubes!");
				addMsg("There is also something ascending from the 'planet´s' core.");
				addMsg("Eliminate it if neccessary!");
				spawnShip("Ophianian Chunk", 4120, 1310, 270, npc.simpleRoamer);
				spawnShip("Ophianian Chunk", 4150, 1300, 270, npc.simpleRoamer);
				spawnShip("Ophianian Chunk", 3190, 1320, 270, npc.simpleRoamer,0,function(){addMsg("What is that!? Return to our base immediately!");});
				target = sector.Central_Sector.planets[0];
				LEVEL.conditions.pile3 = true;
			}
			if (LEVEL.conditions.pile3 && !LEVEL.conditions.gotback && sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[0])) {
				addMsg("This shapeshifting substance seems to be oozing out of these");
				addMsg("'erupting' protoplanets all over the System...");
				addMsg("However this is a mystery for our scientists to figure out.");
				LEVEL.conditions.gotback = true;
			}
		}
	);
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
		spawnShip("Humanian Protobaseship Helonia", 1200, 1000, 180, player1, 0, function(){addMsg("Report critical Damage"); endLevel();});
		spawnShip("Humanian Satalite", 1100, 1100, 0, function(){this.x = 1100; this.y = 1100;}, 0, function(){addMsg("They´re invading our Planet! Please you have to stop them!!!");});
		spawnShip("Humanian Shuttle", 1300, 1000, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1000, 0, npc.defender, 0);
		spawnShip("Ophianian Annector-Star", 2200, 1000, 270, npc.ophianian_annector);
		addMsg("Log in: 2008. Cycle; 102; 1.Humanian Protobaseship 'Helonia' ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Something enormously huge as appeared on our Radars.");
		addMsg("It is located right from you nearing at alarming speed");
		addMsg("From what we experienced last time");
		addMsg("Armed Combat is inevidable.");
		addMsg("Your armour should allow you to wether the storm, but");
		addMsg("try to take care of your Squadron.");
		addMsg("For Humania!");
		}, {possible : false}
		, function(){
			if (sector[sector.at].ships[player1Pos].hp < 2400){
				addMsg("Thats it, there is no hope for the Planet...");
				addMsg("We have no other choice, please forgive us.");
				addMsg("Start the FTL-engines!");
				sector[sector.at].ships[player1Pos].ctrl = function(){this.aim = 45; this.a = 1; this.turn(); if (this.angle === 45) this.acc(); if (this.y < frame.y || this.x > frame.x) endLevel();};
				campaign.humanian.levels[2].events = undefined;
			}
		}
	); */
	system = new Campaign();
	system.addLevel(function(){
		humanian_protobaseship_helonia.spawn(testmap, 200, 250, 180, player1); //inSector, atX, atY, atAngle, ctrl, relationShip, abgang
		humanian_shuttle.spawn(testmap, 300, 100, 0, npc.defender, 0);
		humanian_shuttle.spawn(testmap, 400, 100, 0, npc.defender, 0);
		testarrow.spawn(testmap, 100, 100, 0, "none", 0, function(){addMsg("Test123");});
		fatman.spawn(testmap, 700, 1300, 90, npc.simpleRoamer);
	},{no : false});
}
