campaign = {
	at : "none",
};

function createCampaign(designation){
	neueKampagne = {};
	neueKampagne.levels = [];
	neueKampagne.at = 0;
	campaign[designation] = neueKampagne;
}

function createLevel(tree, setup){
	neuesLevel = {};
	neuesLevel.setup = setup;
	neuesLevel.isSetup = false;
	neuesLevel.condition = false;
	campaign[tree].levels.push(neuesLevel);
}

function setupCampaigns(){
	createCampaign("humanian");
	createLevel("humanian", function(){
		sector.at = "Central_Sector",
		spawnShip("Humanian Shuttle", 1300, 1000, 0, player1);
		spawnShip("Humanian Shuttle", 1300, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1000, 0, npc.defender, 0);
		spawnShip("Qubanic Colonizer", 400, 400, 115, function(){this.follow({x : 1000, y : 1000}, 200);}, undefined, function(){campaign[campaign.at].levels[campaign[campaign.at].at].condition = true;});
		addMsg("Log in: 2007. Cycle; 236; 1.Humanian Squadron Commander Blue ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Welcome to your first flight as our first ever Space Pilot Commander.");
		addMsg("According to your Intruments you five should all be fine out there.");
		addMsg("Dont get carried away. The Reason we starded the Mission early");
		addMsg("was because that unknown trabant that appeared on our radars one month ago");
		addMsg("has suddenly moving towards Humania.");
		addMsg("Your mission is to guard our Orbit and eliminate said Object if necessary.");
		addMsg("You control your Shuttle via the WASD interface.");
		addMsg("The Space bar triggers your high-tech 5nm machinegun twin.");
		addMsg("Good luck out there!");
		campaign.humanian.levels[0].isSetup = true;
	});
}

function endLevel(){
	campaign[campaign.at].levels[campaign[campaign.at].at].condition = false;
	campaign[campaign.at].at += 1;
	campaign.at = "completed";
}

function checkCampaign(){
	if (campaign.at !== "none" && campaign.at !== "completed"){
		if (!campaign[campaign.at].levels[campaign[campaign.at].at].isSetup) campaign[campaign.at].levels[campaign[campaign.at].at].setup();
		if (campaign[campaign.at].levels[campaign[campaign.at].at].condition === true) {
			Game.ctx.fillStyle = "yellow";
			Game.ctx.fillText("Mission completed!!!", 450, 200);
			Game.ctx.fillText("Press Space to continue", 450, 250);
			if (key.space) endLevel();
		}
	}
	if (campaign.at === "completed") sector.at = "campaign", campaign.at = "none";
}