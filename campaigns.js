campaign = {
	at : "none",
};

function createCampaign(designation){
	neueKampagne = {};
	neueKampagne.levels = [];
	neueKampagne.at = 0;
	campaign[designation] = neueKampagne;
}

function createLevel(tree, setup, events){
	neuesLevel = {};
	neuesLevel.setup = setup;
	neuesLevel.isSetup = false;
	neuesLevel.condition = false;
	if (events !== undefined) neuesLevel.events = events;
	campaign[tree].levels.push(neuesLevel);
}

function setupCampaigns(){
	createCampaign("humanian");
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
		spawnShip("Humanian Shuttle", 1300, 1000, 0, player1);
		spawnShip("Humanian Shuttle", 1300, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1000, 0, npc.defender, 0);
		spawnShip("Qubanic Colonizer", 400, 400, 135, function(){this.follow({x : 1000, y : 1000}, 200);}, undefined, function(){addMsg("Unknown Object eliminated! Return to base!"); campaign.humanian.levels[0].condition = true;});
		addMsg("Log in: 2007. Cycle; 236; 1.Humanian Squadron Commander Blue ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Welcome to your first flight as our first ever Space Pilot Commander.");
		addMsg("According to your Intruments you five should all be fine out there.");
		addMsg("Dont get carried away. The Reason we starded the Mission early");
		addMsg("was because that unknown trabant");
		addMsg("that appeared on our radars one month ago");
		addMsg("has suddenly moving towards Humania.");
		addMsg("Your mission is to guard our Orbit");
		addMsg("and eliminate said Object if necessary.");
		addMsg("You control your Shuttle via the WASD interface.");
		addMsg("The Space bar triggers your high-tech 5nm machinegun twin.");
		addMsg("Good luck out there!");
		campaign.humanian.levels[0].isSetup = true;
	});
	createLevel("humanian", function(){
		sector.at = "Central_Sector";
		frame.x = 2000;
		spawnShip("Humanian Protobaseship Helonia", 1200, 1000, 180, player1, function(){addMsg("Report critical Damage"); campaign.humanian.levels[1].condition = true;});
		spawnShip("Humanian Shuttle", 1300, 1000, 0, npc.defender, 0);
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
		campaign.humanian.levels[1].isSetup = true;
	}, function(){
		if (sector[sector.at].ships[player1Pos].hp < 2400){
			addMsg("Thats it, there is no hope for the Planet...");
			addMsg("We have no other choice, please forgive us.");
			addMsg("Start the FTL-engines!");
			sector[sector.at].ships[player1Pos].ctrl = function(){this.aim = 45; this.a = 1; this.turn(); if (this.angle === 45) this.acc(); if (this.y < frame.y) endLevel();};
			campaign.humanian.levels[1].events = undefined;
		}
	});
}

function endLevel(){
	campaign[campaign.at].levels[campaign[campaign.at].at].condition = false;
	campaign[campaign.at].levels[campaign[campaign.at].at].isSetup = false;
	campaign[campaign.at].at += 1;
	campaign.at = "completed";
	setupSectors();
}

function checkCampaign(){
	if (campaign.at !== "none" && campaign.at !== "completed"){
		if (!campaign[campaign.at].levels[campaign[campaign.at].at].isSetup) campaign[campaign.at].levels[campaign[campaign.at].at].setup();
		if (campaign[campaign.at].levels[campaign[campaign.at].at].events !== undefined) campaign[campaign.at].levels[campaign[campaign.at].at].events();
		if (campaign[campaign.at].levels[campaign[campaign.at].at].condition === true) {
			Game.ctx.fillStyle = "yellow";
			Game.ctx.fillText("Mission completed!!!", 450, 200);
			Game.ctx.fillText("Press Space to continue", 450, 250);
			if (key.space) endLevel();
		}
	}
	if (campaign.at === "completed") sector.at = "campaign", campaign.at = "none";
}