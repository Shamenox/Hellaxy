 // Eingabeverarbeitung
function physik() {
	for (i = 0; i < sector[sector.at].ships.length; i++) { //Schiffberechnung
		SHIP = sector[sector.at].ships[i];
		if (SHIP.active === true){
			if (SHIP.hp < 0 && SHIP.active !== "explosion") SHIP.explode(); //Abfrage ob noch aktiv
			if (SHIP.ctrl !== "none") SHIP.ctrl(); // Zugriff durch Spieler/KIs
			SHIP.y -= SHIP.vy; //Bewegung durch Geschwindigkeit
			SHIP.x += SHIP.vx;
			if (SHIP.vx > SHIP.a * 100)SHIP.vx = SHIP.a * 80; //Geschwindigkeitsobergrenze
			if (SHIP.vy > SHIP.a * 100) SHIP.vy = SHIP.a * 80;
			if (SHIP.angle > 359) SHIP.angle = 0; //Einhalten der 360°
			if (SHIP.angle < 0) SHIP.angle = 359;
			if (SHIP.x < SHIP.skin.naturalWidth/2) SHIP.x = SHIP.skin.naturalWidth/2, SHIP.vx = 0; //Zurücksetzen der Pos und V bei Randkollision
			if (SHIP.y < SHIP.skin.naturalHeight/2) SHIP.y = SHIP.skin.naturalHeight/2, SHIP.vy = 0;
			if (SHIP.x > sector[sector.at].width - SHIP.skin.naturalWidth/2) SHIP.x = sector[sector.at].width - SHIP.skin.naturalWidth/2 , SHIP.vx = 0;
			if (SHIP.y > sector[sector.at].height - SHIP.skin.naturalHeight/2 - 120) SHIP.y = sector[sector.at].height -SHIP.skin.naturalHeight/2 - 120, SHIP.vy = 0;
			for (h = 0; h < sector[sector.at].ships.length; h++){                                                   //Kollisionsüberprüfung
				if (SHIP.collidesWith(sector[sector.at].ships[h]) && sector[sector.at].ships[h].active === true && h !== i){
				collide(sector[sector.at].ships[i], sector[sector.at].ships[h]);
				}
			}
			for (h = 0; h < sector[sector.at].portals.length; h++){
				if (SHIP.collidesWith(sector[sector.at].portals[h])){
					sector[sector[sector.at].portals[h].dest].ships.push(SHIP);
					sector[sector[sector.at].portals[h].dest].ships[sector[sector[sector.at].portals[h].dest].ships.length - 1].x = sector[sector.at].portals[h].atX;
					sector[sector[sector.at].portals[h].dest].ships[sector[sector[sector.at].portals[h].dest].ships.length - 1].y = sector[sector.at].portals[h].atY;
					sector.at = sector[sector.at].portals[h].dest;
					
				}
			}
		}
	}
	for (i = 0; i < projectile.length; i++) {
		if (projectile[i].active){
			projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
			projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
			if (projectile[i].x < 0 || projectile[i].y < 0 || projectile[i].x > sector[sector.at].width || projectile[i].y > sector[sector.at].height) projectile[i].active = false;
			for (h = 0; h < sector[sector.at].ships.length; h++){ //Prozess bei Treffer
				if (projectile[i].hits(sector[sector.at].ships[h]) && sector[sector.at].ships[h].active === true) {
					if (projectile[i].pen >= sector[sector.at].ships[h].armour){
						projectile[i].v = 0;
						projectile[i].v = 0;
						if (sector[sector.at].ships[h].shield <= 0 && sector[sector.at].ships[h].shield < 1) sector[sector.at].ships[h].hp -= projectile[i].alpha;
						if (sector[sector.at].ships[h].shield > 0 && sector[sector.at].ships[h].shield > 1) sector[sector.at].ships[h].shield -= projectile[i].alpha;
						if (sector[sector.at].ships[h].shield > 0 && sector[sector.at].ships[h].shield < 1) sector[sector.at].ships[h].hp -= projectile[i].alpha * sector[sector.at].ships[h].shield;
						projectile[i].sound("pen");
						projectile[i].active = false;
					}
					if (projectile[i].pen < sector[sector.at].ships[h].armour){
						for (j = 180; j > 0; j--){
							projectile[i].angle -=1;
							if (projectile[i].angle === -1) projectile[i].angle = 359;
						}
						projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
						projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
						projectile[i].sound("bounce");
					if (projectile[i].hits(sector[sector.at].ships[h])) projectile[i].active = false;
					}
				}
			}
		} else {projectile.splice(i,1)};
	}
	frame.adjust();
}

function collide(a, b){
	var collision = {};
	collision.potX = a.vx + b.vx;
	collision.potY = a.vy + b.vy;
	collision.potDmg = Math.sqrt(Math.abs(collision.potX)*Math.abs(collision.potX) + Math.abs(collision.potX)*Math.abs(collision.potX));
	collision.potM = ship[a.designation].hp + ship[b.designation].hp;
	a.vx = -collision.potX * (ship[b.designation].hp / collision.potM);
	a.vy = -collision.potY * (ship[b.designation].hp / collision.potM);
	b.vx = collision.potX * (ship[a.designation].hp / collision.potM);
	b.vy = collision.potY * (ship[a.designation].hp / collision.potM);
	a.hp -= collision.potDmg * (ship[b.designation].hp / collision.potM) * 5;
	b.hp -= collision.potDmg * (ship[a.designation].hp / collision.potM) * 5;
	a.hp = Math.round(a.hp);
	b.hp = Math.round(b.hp);
	}

function portal(x, y, width, height, to, atx, aty) {
	if (ship.onField[0].x.between(x, x + width) && ship.onField[0].y.between(y, y + height)) {
		projectile.splice(0, projectile.length);
		sector.at = to;
		ship.onField[0].x = atx;
		ship.onField[0].y = aty;
	}
}

function killSwitch (him){
	him.active = false;
}

