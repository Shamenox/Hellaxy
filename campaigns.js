campaign = {
	at : "none",
};

function createCampaign(designation){
	neueKampagne = {};
	neueKampagne.levels = [];
	neueKampagne.at = 0;
	campaign[designation] = neueKampagne;
}

function createLevel(tree, setup, conditions, events){
	neuesLevel = {};
	neuesLevel.setup = setup;
	neuesLevel.isSetup = false;
	neuesLevel.conditions = conditions;
	if (events !== undefined) neuesLevel.events = events;
	campaign[tree].levels.push(neuesLevel);
}

function checkCampaign(){
	if (campaign.at !== "none"){
		LEVEL = campaign[campaign.at].levels[campaign[campaign.at].at];
		if (!LEVEL.isSetup) sector.act(), LEVEL.setup(), LEVEL.isSetup = true;
		if (LEVEL.events !== undefined) LEVEL.events();
		for (var cond in LEVEL.conditions){
			if (LEVEL.conditions[cond] === false) return; 
		}
		Game.ctx.fillStyle = "yellow";
		Game.ctx.fillText("Mission completed!!!", 450, 200);
		Game.ctx.fillText("Press Space to continue", 450, 250);
		if (key.space) endLevel();
	}
}

function endLevel(){
	projectile.splice(0, projectile.length);
	campaign[campaign.at].at += 1;
	campaign.at = "none";
	for (var del in sector){
		if (sector[del].ships !== [] && del !== "at"){
			sector[del].ships = [];
			sector[del].isSetup = false;
		}
	}
	for (var del in campaign){
		if (del !== "at") campaign[del].levels = [];
	}
	setupLevels();
	sector.at = "campaign";
	campaign.at = "none";
}

createCampaign("humanian");                                                                                                             //<-- Kampagnendeklarierung

function setupLevels(){
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
		spawnShip("Humanian Shuttle", 1000, 1000, 0, player1, 0, function(){addMsg("Report critical Damage"); endLevel();});
		spawnShip("Humanian Shuttle", 1050, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 950, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1050, 1050, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1000, 1050, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 950, 1050, 0, npc.defender, 0);
		spawnShip("Qubanic Colonizer", 400, 400, 135, function(){this.follow({x : 1000, y : 1000}, 200);}, undefined, function(){addMsg("Unknown Object eliminated! Return to base!"); LEVEL.conditions.ufoeliminated = true;});
		addMsg("Log in: 2007. Cycle; 236; 1.Humanian Squadron Commander Blue ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Welcome to your first flight as our first ever Space Pilot Commander.");
		addMsg("According to your Intruments you six should all be fine out there.");
		addMsg("Dont get carried away. The Reason we starded the Mission early");
		addMsg("was because that unknown trabant");
		addMsg("that appeared on our radars one month ago");
		addMsg("has suddenly moving towards Humania.");
		addMsg("Your mission is to guard our Orbit");
		addMsg("and eliminate said Object if necessary.");
		addMsg("You control your Shuttle by clicking in the direction you want to head");
		addMsg("or alternatively via the WASD interface.");
		addMsg("The Space bar triggers your high-tech 5nm machinegun twin.");
		addMsg("Good luck out there!");
		}, { ufoeliminated : false}
	);
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
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
		addMsg("We invested alot of ressources to build this gigantic, well armoured");
		addMsg("piece of engineering. Treat it with care!");
		addMsg("Our space project was an absolute Sucess!");
		addMsg("Thats why we erected an Space hangar in our orbit to enable further research.");
		addMsg("We still dont know much about our interplanetary environment.");
		addMsg("We registered an interesting electro magnetic pattern south-west from humania.");
		addMsg("Yes, those directions apply.");
		addMsg("Your order is to gather some samples from that location");
		addMsg("and to bring them to our orbital hangar for analysis.");
		addMsg("Good luck!");
		console.log(sector.Central_Sector.planets);
		}, {gotback : false, pile1 : false, pile2 : false, pile3 : false},
		function(){
			if (sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[2])){
				LEVEL.conditions.pile1 = true;
				if (intervalReact(true, 100000, "beihaufen")) {
					addMsg("Great!");
					addMsg("Interesting, the sample seems to contain some kind of ");
					addMsg("matter-changing substance...");
					addMsg("We just registered two more signals of same specifications.");
					addMsg("They are both located west from you.");
					addMsg("Please get us samples from both new anomalies for comparasion.");
				}
			}
			if (sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[3])){
				LEVEL.conditions.pile2 = true;
				if (intervalReact(true, 100000, "beihaufen2")) {
					addMsg("We were rigth, this celestial body consists of the exactly ");
					addMsg("same material as the first one.");
					addMsg("Get a sample from the last signal for final confirmation!");
				}
			}
			if (sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[4])){
				LEVEL.conditions.pile3 = true;
				if (intervalReact(true, 100000, "beihaufen2")) {
					addMsg("Yes, its the exactly same structure as the other ones.");
					addMsg("But this 'planet' emmits some kind of a live-signal.");
					addMsg("Alert, the samples we already gathered changed their structure ");
					addMsg("to something very radical attacking the testtubes!");
					addMsg("There is something ascending from the 'planets' core.");
					addMsg("Eliminate it if neccessary!");
					spawnShip("Ophianian Chunk", 2000, 2000, 270, npc.simpleRoamer)
				}
			}
			if (LEVEL.conditions.pile3 && sector.Central_Sector.ships[player1Pos].collidesWith(sector.Central_Sector.planets[0])) LEVEL.conditions.gotback = true;
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
		spawnShip("Ophianian Annector-Star", 2200, 1000, 270, npc.ophianian);
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
				sector[sector.at].ships[player1Pos].ctrl = function(){this.aim = 45; this.a = 1; this.turn(); if (this.angle === 45) this.acc(); if (this.y < frame.y) endLevel();};
				campaign.humanian.levels[2].events = undefined;
			}
		}
	);
}
