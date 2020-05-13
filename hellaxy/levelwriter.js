var lastStat = {			//Hässliche Funktionen für ein hübsches Leveldesign ->
	sector : {},
	campaign : {},
	level : {},
	planet : {},
	ship : {},
	levelStep : {},
	player : {}
}

/* Useless?
function addSetup(thingies){
	if (lastStat.level.constructor.name = "Level") lastStat.level.setup = thingies;
	else console.log("Levelscript error: tried to add setup function to missing level");
}*/

function endless(){
	lastStat.level.addStep(new LevelStep(function(){}, function(){return false;}));
}

function msg(content){
	setScreen("messager");
	var words = [];
	var chunks = content.split("	");
	for (var i = 0; i < chunks.length; i++){
		for (var c = 0; c < chunks[i].split(" ").length; c ++){
			if (chunks[i].split(" ")[c] !== "") words.push(chunks[i].split(" ")[c]);
		}
	}
	var line = "";
	for (var i = 0; i < words.length; i++){
		if (words[i] != "ABSATZ") line += words[i] + " ";
		if (Helon.ctx.measureText(line).width + Helon.ctx.measureText(words[i+1]).width > 1700 || words[i] === "ABSATZ"){
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
	new LevelStep(function(){
		msg(content);
	});
	lastStat.levelStep.description = "Display Message";
}

function getTo(destination, potY){
	if (typeof destination === "number"){
		var newDest = new Body();
		newDest.x = destination;
		newDest.y = potY;
		newDest.width = 300;
		newDest.height = 300;
		destination = newDest;
	}

	new LevelStep(function(){}, function(){
		if (Hellaxy.playerShip instanceof Ship) return (Hellaxy.playerShip.overlaps(this.target));
		return false;
	});
	lastStat.levelStep.target = destination;
	lastStat.levelStep.description = "Get to target";
}

/*function setFocus(here){  Funktioniert nicht???
	lastStat.level.add(new Event(function(){
		lastStat.sector.focus(here);
	}));
} */



function setSector(dec){
	if (exists(Helon.screens[dec])){
		lastStat.sector = Helon.screens[dec];
		new LevelStep(function(){
			setScreen(dec);
			lastStat.sector = Helon.screen;
		});
	}
	else console.log("Could not find sector:" + dec);
}



function setPlayer(withShip, atX, atY, atAngle){
	if (!exists(withShip) || withShip.constructor.name != "Ship" && Hellaxy.ships[withShip] == undefined){
		console.log("Error: Tried setting up Player with undefined ship!");
		new LevelStep(function(){
			console.log("Error: Could not set Player!\nEnding Level!");
			lastStat.level.cancel();
		});
	}
	if (typeof atX == "object"){
		atY = trySet(atX.y, 400);
		atX = trySet(atX.x, 400);
		atAngle = trySet(atAngle, 0);
	}
	else{
		atX = trySet(atX, 400);
		atY = trySet(atY, 400);
		atAngle = trySet(atAngle, 0);
	}
	spawnShip(withShip, atX, atY, atAngle, player1, function(){msg("You lost..."); setTimeout(Hellaxy.level.cancel(), 300);});
	new LevelStep(function(){
		lastStat.sector.focus(lastStat.ship);
		Hellaxy.playerShip = lastStat.ship;
	});
}



function spawnBoss(designation, atX, atY, atAngle, ctrl, inSector){
	if (inSector === undefined) inSector = lastStat.sector;
	
	new LevelStep(function(){
		Hellaxy.ships[designation].spawn(inSector, atX, atY, atAngle, ctrl);
		this.target = lastStat.ship;
	}, function(){
		//console.log(this.target);
		return (this.target.hp <= 0);
	});
	lastStat.levelStep.description = "Fight Boss";
	
}


/*
function spawnFront(dimension, designation, atX, atY, atAngle, quantity, ctrl, abgang, inSector){
	for (var q = 0; q < quantity; q++){
		spawnShip(designation, atX, atY, atAngle, ctrl, abgang, inSector);
		if (dimension === "x") atX += Hellaxy.ships[designation].width * 2;
		if (dimension === "y") atY += Hellaxy.ships[designation].height * 2;
	}
} */



function spawnPlanet(designation, x, y, sector){
	new Planet(designation, x, y, sector);
	new LevelStep(function(){
		Hellaxy.planets[designation].spawn();
	});
}



function spawnShip(designation, atX, atY, atAngle, ctrl, abgang, inSector){
	new LevelStep(function(){
		if (inSector === undefined) inSector = lastStat.sector;
		Hellaxy.ships[designation].spawn(inSector, atX, atY, atAngle, ctrl, abgang);
	});
	lastStat.levelStep.description = "Spawn Ship";
}



function spawnSquad(designation, atX, atY, quantity, ctrl, abgang, inSector){
	new LevelStep(function(){
		if (inSector === undefined) inSector = lastStat.sector;
		Hellaxy.ships[designation].spawnSquad(atX, atY, quantity, ctrl, abgang, inSector);
	});
	lastStat.levelStep.description = "Spawn Squad";
}



function wait(duration){
	new LevelStep(function(){}, function(){
		if (Helon.screen != "messager" && Helon.screen != "paused")this.timer--;
		return (this.timer <= 0)
	});
	lastStat.levelStep.timer = duration;
	lastStat.levelStep.description = "Wait";
}












function setupLevels(){				//Levelscripts ->
	new Campaign("quicktest");
	
		new Level();
			setSector("testmap");
			setPlayer("humanian_protobaseship_helonia");
			spawnShip("humanian_shuttle", 600, 600);
			spawnShip("humanian_shuttle", 400, 100, 0, npc.defender);
			spawnShip("none_testarrow", 100, 100, 0, function(){this.turnFrom(this.nextShip())}, function(){msg("Test 123 langes Wort");});
			spawnShip("none_fatman", 700, 1300, 90, npc.roamer);
			getTo(1200, 1200);
			addMsg("gotThere");
			wait(500);
			addMsg("waitet 500");
			//spawnSquad("tonium_chunk", 1000, 1000, 270, 3, npc.fairy);
			//spawnSquad("tonium_chunk", 100, 100, 270, 4, npc.fairy);
			//spawnAsteroids(600, 600, 400, 400);
			endless();
	
	
	
	new Campaign("freeroaming");
	
	
	
	new Campaign("humanian");
	
		new Level();	//2007. Cycle; 236
			setSector("central");
			spawnPlanet("humania", 1000, 1000);
			spawnPlanet("pontes", 1420, 2550);
			setPlayer("humanian_shuttle", Hellaxy.planets.humania);
			spawnSquad("humanian_shuttle", 950, 1100, 5, npc.bodyGuard);
			addMsg("Attention! ABSATZ Welcome to your first flight Commander! ABSATZ\
				Turn your shuttle by clicking in the direction you want to head.\
				Use WASD to maneuver. Press Space to fire. Your Squad follows you.\
			");
			wait(500);
			addMsg("Great! We send you coordinates. Your cursor will point towards your target, when you click. Please get there ASAP");
			getTo(Hellaxy.planets.pontes);
			addMsg("Great! Now please return to our home Planet Humania");
			getTo(Hellaxy.planets.humania);
			addMsg("An unknown Object appeared on our radar!\
				Commander! Your mission is to guard our Orbit. \
				Press Space to fire.\
				Good luck out there!"
			);
			spawnBoss("qubanian_colonizer", 0, 200, 135, function(){this.follow();});
			addMsg("Unknown Object eliminated! Return to base!");
			getTo(Hellaxy.planets.humania);

		
		
		new Level(); //2008. Cycle 43 
			setSector("central");
			setPlayer("humanian_protobaseship_helonia", Hellaxy.planets.humania);
			spawnPlanet("haufen1", 600, 1800);
			spawnSquad("humanian_shuttle", 900, 1100, 5, npc.bodyGuard);
			spawnShip("humanian_satalite", 1100, 1100);
			addMsg("Humanian HQ: Attention!");
			addMsg("Admire your new flagship commander! Treat it with care!");
			addMsg("Our space project was an absolute Sucess!");
			addMsg("We also erected a Space hangar for further research in our orbit.");
			addMsg("We registered an interesting sonar pattern not far from Humania.");
			addMsg("Please gather samples from that location!");
			addMsg("HINT: By cklicking the Mousebutton, your cursor will point towards your target");
			getTo(Hellaxy.planets.haufen1);
			spawnPlanet("haufen2", 4000, 2000);
			addMsg("Interesting, the sample contains some kind of matter-changing substance...");
			addMsg("We registered two more signals in our sector");
			addMsg("Please get us samples for comparasion!");
			getTo(Hellaxy.planets.haufen2);
			spawnPlanet("haufen3", 4150, 1300);
			addMsg("This is indeed the same substance...");
			addMsg("Get a sample from the last signal for final confirmation!");
			getTo(Hellaxy.planets.haufen3);
			addMsg("This 'planet' emmits a live-signal...");
			addMsg("Alert, the samples we already gathered changed their structure and are escaping the testtubes!");
			addMsg("There is also something ascending from the 'planet´s' core.");
			addMsg("Eliminate it if neccessary and return home ASAP!");
			spawnSquad("ophianian_chunk", 4120, 1310, 6, npc.rammer);
			getTo(Hellaxy.planets.humania);
			addMsg("This shapeshifting substance seems to be oozing out of these");
			addMsg("'erupting' protoplanets all over the System...");
	
	
	
		new Level(); //2008. Cycle 102
			setSector("central");
			setPlayer("humanian_protobaseship_helonia", Hellaxy.planets.humania);
			spawnSquad("humanian_shuttle", 900, 1100, 10, npc.bodyGuard);
			spawnShip("humanian_satalite", 1100, 1100,0,function(){this.follow(Hellaxy.planets.humania, 200)});
			addMsg("A gigantic object appeared on our Radars!");
			addMsg("It is coming at us with alarming speed");
			addMsg("Please protect our Planet!");
			spawnBoss("ophianian_annector", 2050, 1100, 270, npc.ophianian_annector);
			lastStat.levelStep.isOver = function(){
				return (Hellaxy.playerShip.hp < 2400);
			}
			addMsg("There is no hope for the Planet...");
			addMsg("Start the FTL-engines!");
			new LevelStep(function(){
				Hellaxy.playerShip.ctrl = function(){
					this.turnFrom(this.nextShip("ophianian"));
					this.a = 1;
					this.hp = 3000;
					this.acc();
				}
				Hellaxy.playerShip.abgang = function(){};
			})
			new LevelStep();
			lastStat.levelStep.isOver = function(){return !Hellaxy.playerShip.isVisible()}
			wait (100);
			
			
	
	
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