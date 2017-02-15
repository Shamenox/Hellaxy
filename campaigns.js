﻿campaign = {
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
		spawnShip("Humanian Shuttle", 1300, 1000, 0, "player1");
		spawnShip("Humanian Shuttle", 1300, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1300, 1200, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1100, 0, npc.defender, 0);
		spawnShip("Humanian Shuttle", 1400, 1000, 0, npc.defender, 0);
		spawnShip("Qubanic Colonizer", 400, 400, 115, npc.striver, undefined, function(){campaign[campaign.at].levels[campaign[campaign.at].at].condition = true;});
		campaign.humanian.levels[0].isSetup = true;
	});
}

function checkCampaign(){
	if (campaign.at !== "none" && campaign.at !== "completed"){
		if (!campaign[campaign.at].levels[campaign[campaign.at].at].isSetup) campaign[campaign.at].levels[campaign[campaign.at].at].setup();
		if (campaign[campaign.at].levels[campaign[campaign.at].at].condition === true) {
			while(!key.space){
				Game.ctx.fillText("Mission completed!!!", 450, 200);
				Game.ctx.fillText("Press Space to continue", 450, 250);
			}
		campaign[campaign.at].at ++;
		campaign.at = "completed";
		}
	}
	if (campaign.at === "completed") sector.at = "title", campaign.at = "none";
}