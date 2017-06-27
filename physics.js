 // Eingabeverarbeitung
function physik() {
	for (i = 0; i < SECTOR.ships.length; i++) { //Schiffberechnung
		SHIP = SECTOR.ships[i];
		if (SHIP.hp < 0) SHIP.explode(); //Abfrage ob noch aktiv
		if (SHIP.ctrl !== "none") SHIP.ctrl(); // Zugriff durch Spieler/KIs
		SHIP.y -= SHIP.vy; //Bewegung durch Geschwindigkeit
		SHIP.x += SHIP.vx;
		if (SHIP.vx > SHIP.a * 100)SHIP.vx = SHIP.a * 80; //Geschwindigkeitsobergrenze
		if (SHIP.vy > SHIP.a * 100) SHIP.vy = SHIP.a * 80;
		if (SHIP.angle > 359) SHIP.angle = 0; //Einhalten der 360°
		if (SHIP.angle < 0) SHIP.angle = 359;
		if (SHIP.x < SHIP.skin.naturalWidth/2) SHIP.x = SHIP.skin.naturalWidth/2, SHIP.vx = 0; //Zurücksetzen der Pos und V bei Randkollision
		if (SHIP.y < SHIP.skin.naturalHeight/2) SHIP.y = SHIP.skin.naturalHeight/2, SHIP.vy = 0;
		if (SHIP.x > SECTOR.width - SHIP.skin.naturalWidth/2) SHIP.x = SECTOR.width - SHIP.skin.naturalWidth/2 , SHIP.vx = 0;
		if (SHIP.y > SECTOR.height - SHIP.skin.naturalHeight/2 - 120) SHIP.y = SECTOR.height -SHIP.skin.naturalHeight/2 - 120, SHIP.vy = 0;
		for (h = 0; h < SECTOR.ships.length; h++){                                                   //Kollisionsüberprüfung
			if (SHIP.collidesWith(SECTOR.ships[h]) && h !== i) collide(SECTOR.ships[i], SECTOR.ships[h]);
		}
		for (h = 0; h < SECTOR.portals.length; h++){
			if (SHIP.collidesWith(SECTOR.portals[h])){
				SECTOR.portals[h].dest.ships.push(SHIP);
				SECTOR.portals[h].dest.ships[SECTOR.portals[h].dest.ships.length - 1].x = SECTOR.portals[h].atX;
				SECTOR.portals[h].dest.ships[SECTOR.portals[h].dest.ships.length - 1].y = SECTOR.portals[h].atY;
				SECTOR = SECTOR.portals[h].dest;			
			}
		}
	}
	for (i = 0; i < projectile.length; i++) {
		projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
		projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
		projectile[i].act();
	}
	frame.adjust();
}

function collide(a, b){
	var collision = {};
	collision.potX = a.vx + b.vx;
	collision.potY = a.vy + b.vy;
	collision.potDmg = Math.sqrt(Math.abs(collision.potX)*Math.abs(collision.potX) + Math.abs(collision.potX)*Math.abs(collision.potX));
	collision.potM = a.mass + b.mass;
	a.vx = -collision.potX * (b.mass / collision.potM);
	a.vy = -collision.potY * (b.mass / collision.potM);
	b.vx = collision.potX * (a.mass / collision.potM);
	b.vy = collision.potY * (a.mass / collision.potM);
	a.hp -= collision.potDmg * (b.mass / collision.potM) * 5;
	b.hp -= collision.potDmg * (a.mass / collision.potM) * 5;
	a.hp = Math.round(a.hp);
	b.hp = Math.round(b.hp);
}

