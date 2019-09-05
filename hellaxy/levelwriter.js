var lastStat = {			//Hässliche Funktionen für ein hübsches Leveldesign ->
	sector : {},
	campaign : {},
	level : {},
	planet : {},
	ship : {}
}

function addSetup(thingies){
	if (lastStat.level.constructor.name = "Level") lastStat.level.setup = thingies;
	else console.log("Levelscript error: tried to add setup function to missing level");
}

function endless(){
	lastStat.level.add(new Event(function(){}, false));
}

function msg(content){
	setScreen("messager");
	var words = [];
	var chunks = content.split("	");
	for (var i = 0; i < chunks.length; i++){
		for (var c = 0; c < chunks[i].split(" ").length; c ++){
			words.push(chunks[i].split(" ")[c]);
		}
	}
	var line = "";
	for (var i = 0; i < words.length; i++){
		line += words[i] + " ";
		if (Helon.ctx.measureText(line).width + Helon.ctx.measureText(words[i+1]).width > 1600){
			var neueMsg = {};
			neueMsg.content = line;
			Hellaxy.msgs.push(neueMsg);
			line = "";
		}
	}
	if (line !== ""){
		var neueMsg = {};
		neueMsg.content = line;
		Hellaxy.msgs.push(neueMsg);
	}
}

function addMsg(content){
	lastStat.level.add(new Event(function(){
		msg(content);
	}));
}

/*function setFocus(here){  Funktioniert nicht???
	lastStat.level.add(new Event(function(){
		lastStat.sector.focus(here);
	}));
} */

function setSector(dec){
	if (exists(Helon.screens[dec])){
		lastStat.sector = Helon.screens[dec];
		lastStat.level.add(new Event(function(){
			setScreen(dec);
			lastStat.sector = Helon.screen;
		}));
	}
	else console.log("Could not find sector:" + dec);
}

function setPlayer(withShip, atX, atY, atAngle, inSector){
	atX = setProp(atX, 400);
	atY = setProp(atY, 400);
	atAngle = setProp(atAngle, 0);
	spawnShip(withShip, atX, atY, atAngle, player1, function(){/*addMsg("Report critical Damage");*/ Hellaxy.level.cancel();});
	lastStat.level.add(new Event(function(){
		lastStat.sector.focus(lastStat.ship);
	}));
}

function spawnShip(designation, atX, atY, atAngle, ctrl, abgang, inSector){
	lastStat.level.add(new Event(function(){
		if (inSector === undefined) inSector = lastStat.sector;
		Hellaxy.ships[designation].spawn(inSector, atX, atY, atAngle, ctrl, abgang);
	}));
}












function setupLevels(){				//Levelscripts ->
	new Campaign("quicktest");
	
		new Level();
			setSector("testmap");
			setPlayer("humanian_protobaseship_helonia");
			spawnShip("humanian_shuttle", 600, 600);
			spawnShip("humanian_shuttle", 400, 100, 0, npc.defender);
			spawnShip("none_testarrow", 100, 100, 0, "none", function(){msg("Test 123 langes Wort");});
			spawnShip("none_fatman", 700, 1300, 90, npc.roamer);
			//spawnSquad("tonium_chunk", 1000, 1000, 270, 3, npc.fairy);
			//spawnSquad("tonium_chunk", 100, 100, 270, 4, npc.fairy);
			//spawnAsteroids(600, 600, 400, 400);
			endless();
	
	
	
	new Campaign("freeroaming");
	
	
	
	new Campaign("humanian");
	
		new Level();
			setSector("central");
			new Planet("humania", 1000, 1000);
			//setFocus(lastStat.planet);
			//addPlanet("pontes", 1420, 2550);
			setPlayer("humanian_shuttle", 1000, 1000);
			//spawnSquad("humanian_shuttle", 950, 1100, 0, 5, npc.defender);
			//spawnShip("qubanian_colonizer", 200, 200, 135, function(){this.follow(Hellaxy.planets.humania, 200);}, function(){addMsg("Unknown Object eliminated! Return to base!");});
			addMsg("Log in: 2007. Cycle; 236; 1.Humanian Squadron Commander Blue ID:29344 Humanian HQ: Attention!\
				Welcome to your first flight Commander\
				According to your Intruments your squadron should be fine out there.\
				An unknown Object appears to be heading towards our home planet.\
				Your mission is to guard our Orbit.\
				Eliminate said Object if necessary.\
				Turn your Shuttle by clicking in the direction you want to head.\
				Use WASD to maneuver.\
				Press Space to fire.\
				Your Squad follows you.\
				Make sure to not guide them into anything!\
				Good luck out there!"
			);
			endless();

	
	
	
	new Campaign("chestanian");
	new Campaign("qubanian");

}
	/*
	
	Hellaxy.campaigns.freeroaming.addLevel(function(){
			setSector("central");
		},
		{
			no : false
		},
	);
	
	
	
	Hellaxy.campaigns.humanian.addLevel(function(){
		start(Hellaxy.planets.humania, "humanian_protobaseship_helonia");
		addPlanet("haufen1", 600, 1800);
		spawnSquad("humanian_shuttle", 950, 1100, 0, 5, npc.defender);
		spawnShip("humanian_satalite", 1100, 1100);
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
		this.target = Hellaxy.planets.haufen1;
		},
		{
			gotback : false,
			pile1 : false,
			pile2 : false,
			pile3 : false
		},
		function(){
			if (!LEVEL.conditions.pile1 && player1ship.collidesWith(Hellaxy.planets.haufen1)){
				addPlanet("haufen2", 4000, 2000);
				addMsg("Great!");
				addMsg("Interesting, the sample seems to contain some kind of ");
				addMsg("matter-changing substance...");
				addMsg("We just registered two more signals of same specifications.");
				addMsg("They are both located right from you.");
				addMsg("Please get us samples from both new anomalies for comparasion.");
				this.target = Hellaxy.planets.haufen2;
				LEVEL.conditions.pile1 = true;
			}
			if (!LEVEL.conditions.pile2 && player1ship.collidesWith(Hellaxy.planets.haufen2)){
				addPlanet("haufen3", 4150, 1300);
				addMsg("We were right, this celestial body consists of the exactly ");
				addMsg("same material as the first one.");
				addMsg("Get a sample from the last signal for final confirmation!");
				this.target = Hellaxy.planets.haufen3;
				LEVEL.conditions.pile2 = true;
			}
			if (!LEVEL.conditions.pile3 && player1ship.collidesWith(Hellaxy.planets.haufen3)){
				addMsg("Yes, its the exactly same structure as the other ones.");
				addMsg("But this 'planet' emmits some kind of a live-signal.");
				addMsg("Alert, the samples we already gathered changed their structure ");
				addMsg("to something very radical attacking the testtubes!");
				addMsg("There is also something ascending from the 'planet´s' core.");
				addMsg("Eliminate it if neccessary and return home ASAP!");
				spawnSquad("ophianic_chunk", 4120, 1310, 270, 4, npc.simpleRoamer);
				this.target = this.target = Hellaxy.planets.humania;
				LEVEL.conditions.pile3 = true;
			}
			if (LEVEL.conditions.pile3 && !LEVEL.conditions.gotback && player1ship.collidesWith(Hellaxy.planets.humania)) {
				addMsg("This shapeshifting substance seems to be oozing out of these");
				addMsg("'erupting' protoplanets all over the System...");
				addMsg("However this is a mystery for our scientists to figure out.");
				LEVEL.conditions.gotback = true;
			}
		}
	);
	
	
	
	Hellaxy.campaigns.humanian.addLevel(function(){
		start(Hellaxy.planets.humania, "humanian_protobaseship_helonia");
		spawnSquad("humanian_shuttle", 950, 1100, 0, 5, npc.defender);
		spawnShip("humanian_satalite", 1100, 1100, 0, function(){this.x = 1100; this.y = 1100;}, function(){addMsg("They´re invading our Planet! Please you have to stop them!!!")});
		spawnShip("ophianic_annector", 2000, 1100, 270, npc.ophianian_annector);
		addMsg("Log in: 2008. Cycle; 102; 1.Humanian Protobaseship 'Helonia' ID:29344");
		addMsg("Humanian HQ: Attention!");
		addMsg("Something enormously huge has appeared on our Radars.");
		addMsg("It is located right from you nearing at alarming speed");
		addMsg("From what we experienced last time");
		addMsg("Armed Combat is inevidable.");
		addMsg("Your armour should allow you to wether the storm, but");
		addMsg("try to take care of your Squadron.");
		addMsg("For Humania!");
		},
		{
			dmgd : false,
		},
		function(){
			if (player1ship.hp < 2400 && this.conditions.dmgd === false){
				this.conditions.dmgd = true;
				addMsg("Thats it, there is no hope for the Planet...");
				addMsg("We have no other choice, please forgive us.");
				addMsg("Start the FTL-engines!");
				player1ship.ctrl = function(){
					this.pointFrom(this.nextShip("ophianic"));
					this.a = 1;
					this.turn();
					this.hp = 3000;
					this.acc();
				}
			}
		}
	);
	
	
	
	Hellaxy.campaigns.qubanian.addLevel(function(){
		addPlanet("quba", 444, 444, "central");
		start(Hellaxy.planets.quba, "qubanian_colonizer");
		addLocation("quba2", 2550, 2300, 500, 500);
		addMsg("Log in: 2007. Cycle; 143; 1.Colonization Mission ID:214");
		addMsg("Attention! This is mission-control!");
		addMsg("We are proud to have finally made it into space!");
		addMsg("Your task, commander, is to guide our new colonization-vessel");
		addMsg("to the recently discovered habitable zone without a scratch.");
		addMsg("We updated its coordinates into your cursor-interface.");
		addMsg("Best of luck, commander!");
		LEVEL.target = Hellaxy.locations.quba2;
		},
		{
			colonized : false,
		},
		function(){
			if (!this.conditions.colonized && player1ship.collidesWith(Hellaxy.locations.quba2)){
				spawnShip("qubanian_colony", 2378, 2078, 0, "none");
				addMsg("Congratulations Commander!");
				addMsg("We are receiving first transmissions from our new colony.");
				addMsg("Let´s begin upgrading its infrastructure!");
				LEVEL.conditions.colonized = true;
			}
		}
	);
	
	
	
	Hellaxy.campaigns.qubanian.addLevel(function(){
		setSector("central");
		spawnShip("qubanian_colony", 2378, 2078, 0, player1, function(){LEVEL.conditions.destroyed = true});
		addMsg("Log in: 2007. Cycle; 144; Colony Defense Act ID:214");
		addMsg("Attention! This is Qubanian HQ!");
		addMsg("We just received a dread from an alien-lifeform!");
		addMsg("They call themselves Birchanians and announced that they");
		addMsg("will destroy our newly errected colony, as it is within ther territory.");
		addMsg("We tried to negotiate with them on a friendly basis,");
		addMsg("But they wont change their mind...");
		addMsg("Unfortunately our only weaponary in this colony");
		addMsg("is a light antispacecraft firescreen.");
		addMsg("As the commander you can order to fire all cannons with your '1'-key.");
		addMsg("Birchanian warships are on their way.");
		addMsg("We will do everything we can for you!");
		},
		{
			destroyed : false,
		},
		function(){
			if (Hellaxy.sectors.central.ships.length < 4){
				spawnSquad("birchanian_glider", 3050, 3000, 315, 5, npc.rammer);
			}
		}
	);
	
	
	
	Hellaxy.campaigns.qubanian.addLevel(function(){
		start(Hellaxy.planets.quba, "qubanian_colonizer");
		addPlanet("birchanian_fortress", 4000, 3200);
		spawnSquad("qubanian_colonizer", 550, 500, 90, 3, npc.defender, function(){addMsg("Report critical Damage"); LEVEL.cancel();});
		addMsg("Log in: 2007. Cycle; 150;  Super Colonization ID:217");
		addMsg("Attention! This is mission-control!");
		addMsg("What the Birchanians have done so arrogantly is unforgivable!");
		addMsg("We cant coexist with them for any longer.");
		addMsg("To prove our superiority once and for all we build another four");
		addMsg("Colonisators to build a gigantic cluster-colony.");
		addMsg("Guide our colonisator squadron again into the habitable zone.");
		addMsg("But be careful, The Birchanians are constantly sending warships!");
		LEVEL.target = Hellaxy.locations.quba2;
		},
		{
			colonized : false,
			send : false,
			defended : false,
		},
		function(){
			if (!this.conditions.colonized && player1ship.collidesWith(Hellaxy.locations.quba2)){
				spawnShip("qubanian_colony", 2250, 1950, 0, npc.turret);
				spawnShip("qubanian_colony", 2378, 1950, 0, npc.turret);
				spawnShip("qubanian_colony", 2250, 2078, 0, npc.turret);
				spawnShip("qubanian_colony", 2378, 2078, 0, npc.turret);
				LEVEL.conditions.colonized = true;
				addMsg("We made it! The super cluster colony");
				addMsg("and all of its anti-spacecraft cannons are online.");
				addMsg("Now we´ll show them!");
			}
			if (intervalReact(!this.conditions.colonized, 9000, "attackrate")){
				spawnSquad("birchanian_glider", 3150, 3000, 315, 4, npc.rammer);
			}
			if (LEVEL.conditions.colonized === true && !LEVEL.conditions.send){
				spawnSquad("birchanian_glider", 3300, 3150, 315, 15, npc.aggressor);
				LEVEL.conditions.send = true;
			}
			if (LEVEL.conditions.send === true && Hellaxy.sectors.central.ships.length < 10 && !LEVEL.conditions.defended){
				addMsg("Most of the Birchanian units are destroyed.");
				addMsg("Space superiority is ours. Well done commander!");
				LEVEL.conditions.defended = true;
			}
		}
	);
	
	
	
	Hellaxy.campaigns.qubanian.addLevel(function(){
		start(Hellaxy.planets.quba, "qubanian_colonizer_mkii");
		addLocation("imperialentrace",2000, 0, 400, 100);
		addMsg("Log in: 2007. Cycle; 203;  Interstellar seismic activity ID:234");
		addMsg("Attention! This is mission-control!");
		addMsg("We upgraded this particular colonizer to perform better");
		addMsg("in combat. It is faster and fitted with a triangular front-beam.");
		addMsg("If it turns out to be effective we will adapt these changes to");
		addMsg("our standart class-colonizer.");
		addMsg("Our interstellar seismographs perceived massive space interferences");
		addMsg("in the sector above us. In fact they were so huge,");
		addMsg("they exceeded the scale. So be alarmed.");
		addMsg("Your job Commander is to gather data of whatever happened up there.");
		addMsg("Mission control out!");
		LEVEL.target = Hellaxy.locations.imperialentrace;
		},
		{
			inImperial : false,
			foundTonium : false,
			foundOphian : false,
			foundBoth : false,
			foundFive : false,
			gotBack : false,
		},
		function(){
			if (Hellaxy.sector.ID === "imperial" && !this.conditions.inImperial){
				spawnAsteroids(2100, 18900, 1900, 400);
				spawnAsteroids(1800, 19100, 500, 850);
				spawnAsteroids(3800, 19100, 500, 850);
				this.conditions.inImperial = true;
				setTimeout(function(){
					addMsg("According to your intruments, you should be in the");
					addMsg("nothern sector by now.");
					addMsg("You hopefully went through the portal without any trouble.");
					addMsg("As we expected something really impacting influenced the space arround here.");
					addMsg("Appearently this caused the spawning of a lot of matter that chunked");
					addMsg("together to form asteroids.");
					addMsg("Hold on! These Asteroids seem to emit some kind of life signal.");
					addMsg("Your triangular beam should be able to splice them open.");
					addMsg("Try break up some of them to find the source!");
				}, 500);
			}
			if (player1ship.nextShip("tonium") !== false && !this.conditions.foundTonium){
				addMsg("Interesting! The Asteroid you just destroyed contained some");
				addMsg("kind of living, energetic matter.");
				addMsg("It even seems to follow you around...");
				addMsg("Your task remains breaking up more asteroids.");
				addMsg("Try to be passive and only shoot the life form, if it gets hostile!");
				this.conditions.foundTonium = true;
			}
			if (player1ship.nextShip("ophianic") !== false && !this.conditions.foundOphian){
				addMsg("This is mission control!");
				addMsg("The last Asteroid you broke up contained a living but very radical");
				addMsg("life form. This is not the source of life we first received.");
				addMsg("Defend yourself, if neccessary!");
				this.conditions.foundOphian = true;
			}
			if (this.conditions.foundOphian && this.conditions.foundTonium && !this.conditions.foundBoth){
				addMsg("Wait a second... This is odd.");
				addMsg("Appearently the energetic life form is attacking the radical one.");
				addMsg("It seems like they are neutralizing each other.");
				addMsg("Again, your task remains breaking up more asteroids!");
				this.conditions.foundBoth = true;
			}
			var potentialStars = player1ship.nextShips("tonium");
			if (potentialStars !== false && !this.conditions.foundFive){
				for (var e = 0; e < potentialStars.length; e++){
					if (potentialStars[e].designation === "star"){
						addMsg("The energetic matter from the asteroids seems to");
						addMsg("have merged into one gigantic, powerful organism!");
						addMsg("It also seems to follow you...");
						addMsg("Commander! Your objective is to take this organism");
						addMsg("and lead it back to our home planet!");
						addMsg("Be aware that it probably wont follow you, after you passed the portal.");
						addMsg("Try to lead it through the portal first!");
						LEVEL.target = Hellaxy.planets.quba;
						this.conditions.foundFive = true;
					}
				}
			}
			if (this.conditions.foundFive && !this.conditions.gotBack && player1ship.collidesWith(Hellaxy.planets.quba)){
				addMsg("Well done Commander!");
				addMsg("This was a very succesful exploration!");
				addMsg("Our scientists suggest to call the energetic matter you found in the");
				addMsg("asteroids 'Tonium' as it emmits an unique high frequency tone.");
				addMsg("They also discovered that only the 'Tonium Star', as they call it");
				addMsg("is really alive. They other substances do not act on their own will.");
				addMsg("Appearently the 'Tonium Star' could be used as an infinite power supply!");
				this.conditions.gotBack = true;
			}
		}
	);
	
	
	
	Hellaxy.campaigns.qubanian.addLevel(function(){
		start(Hellaxy.locations.quba2, "tonium_star");
		Hellaxy.sector.ships[Hellaxy.sector.ships.length -1].fraction = "qubanian";
		spawnShip("birchanian_fortress_ai", 4000, 3200, 0, "none", function(){addMsg("It´s over! The Birchanians surrendered!"); LEVEL.conditions.destroyed = true;});
		spawnShip("qubanian_colonizer_mkii", 2300, 2300, 90, npc.turret);
		spawnShip("qubanian_colonizer_mkii", 2500, 2300, 90, npc.turret);
		spawnShip("qubanian_colonizer_mkii", 2600, 2200, 90, npc.turret);
		spawnShip("qubanian_colonizer_mkii", 2600, 2000, 90, npc.turret);
		spawnShip("qubanian_colony", 2250, 1950, 0, npc.turret);
		spawnShip("qubanian_colony", 2378, 1950, 0, npc.turret);
		spawnShip("qubanian_colony", 2250, 2078, 0, npc.turret);
		spawnShip("qubanian_colony", 2378, 2078, 0, npc.turret);
		addMsg("Log in: 2007. Cycle; 224; The war begins ID:S1");
		addMsg("Attention! This is the colonys terminal!");
		addMsg("Since our research now allows us to communicate with the");
		addMsg("Tonium Star, we will launch a devestating military mission");
		addMsg("To once and for all defeat the pesky Birchanians.");
		addMsg("Our own ships cannot withstand the waves of hostile spacecraft.");
		addMsg("But you, the Tonium Star, can and will ripp their base apart!");
		addMsg("Our ships and colony will provide defending fire.");
		addMsg("You are to destroy their base!");
		addMsg("As you are pretty big, we suggest you to zoom out a little");
		addMsg("By pressing the '-'key.");
		addMsg("The heat is on!");
		LEVEL.target = Hellaxy.planets.birchanian_fortress;
		},
		{
			destroyed : false,
		},
		function(){
			if (Hellaxy.sector.ships.length < 18 && !this.conditions.destroyed){
				spawnFront("y", "birchanian_glider", 4000, 3200, 310, 5, npc.rammer);
				spawnFront("x", "birchanian_glider", 4050, 3200, 310, 8, npc.rammer);
			}
		}
	);
			// 1.großer Krieg Cuba vs Birch 2. Tonium Farming + Ophian Krieg 3. Untergang Quba 4. Birchians finish cluster colony

	
	
	Hellaxy.campaigns.chestanian.addLevel(function(){
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
	
}*/