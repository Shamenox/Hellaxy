 // Eingabeverarbeitung
function physik() {
	for (i = 0; i < sector[sector.at].ships.length; i++) { //Schiffberechnung
		if (sector[sector.at].ships[i].active === true){
			if (sector[sector.at].ships[i].hp < 0) sector[sector.at].ships[i].explode();
			sector[sector.at].ships[i].y -= sector[sector.at].ships[i].vy; //Bewegung durch Geschwindigkeit
			sector[sector.at].ships[i].x += sector[sector.at].ships[i].vx;
			if (sector[sector.at].ships[i].angle > 360) sector[sector.at].ships[i].angle = 0; //Einhalten der 360°
			if (sector[sector.at].ships[i].angle < 0) sector[sector.at].ships[i].angle = 360;
			if (sector[sector.at].ships[i].vx > sector[sector.at].ships[i].a * 100) sector[sector.at].ships[i].vx = sector[sector.at].ships[i].a * 100; //Geschwindigkeitsobergrenze
			if (sector[sector.at].ships[i].vy > sector[sector.at].ships[i].a * 100) sector[sector.at].ships[i].vy = sector[sector.at].ships[i].a * 100;
			if (sector[sector.at].ships[i].x < 0) sector[sector.at].ships[i].x = 0, sector[sector.at].ships[i].vx = 0; //Zurücksetzen der Pos und V bei Randkollision
			if (sector[sector.at].ships[i].y < 0) sector[sector.at].ships[i].y = 0, sector[sector.at].ships[i].vy = 0;
			if (sector[sector.at].ships[i].x > background.naturalWidth - 32) sector[sector.at].ships[i].x = background.naturalWidth - 32, sector[sector.at].ships[i].vx = 0;
			if (sector[sector.at].ships[i].y > background.naturalHeight - 32) sector[sector.at].ships[i].y = background.naturalHeight - 32, sector[sector.at].ships[i].vy = 0;
			for (h = 0; h < sector[sector.at].ships.length; h++){                                                     //Rammsimulation
				if (sector[sector.at].ships[i].collidesWith(sector[sector.at].ships[h]) && sector[sector.at].ships[h].active === true && h !== i){
					collision.ix = sector[sector.at].ships[i].vx + sector[sector.at].ships[h].vx;
					collision.iy = sector[sector.at].ships[i].vy + sector[sector.at].ships[h].vy;
					collision.sucess = false;
					collision.q = ship[sector[sector.at].ships[h].designation].hp / ship[sector[sector.at].ships[i].designation].hp;
					collision.q2 = ship[sector[sector.at].ships[i].designation].hp / ship[sector[sector.at].ships[h].designation].hp;
					if (collision.q > 1) collision.q = 1;
					if (collision.q2 > 1) collision.q2 = 1;
					if (sector[sector.at].ships[i].vx > 0 && !collision.sucess) sector[sector.at].ships[i].vx = - collision.ix * collision.q, sector[sector.at].ships[h].vx = collision.ix * collision.q2, collision.sucess = true;
					if (sector[sector.at].ships[i].vy > 0 && !collision.sucess) sector[sector.at].ships[i].vy = - collision.iy * collision.q, sector[sector.at].ships[h].vy = collision.iy * collision.q2, collision.sucess = true;
					if (sector[sector.at].ships[i].vx < 0 && !collision.sucess) sector[sector.at].ships[i].vx = collision.ix * collision.q, sector[sector.at].ships[h].vx = - collision.ix * collision.q2, collision.sucess = true;
					if (sector[sector.at].ships[i].vy < 0 && !collision.sucess) sector[sector.at].ships[i].vy = collision.iy * collision.q, sector[sector.at].ships[h].vy = - collision.iy * collision.q2, collision.sucess = true;
					if (sector[sector.at].ships[i].vx !== 0 || sector[sector.at].ships[h].vx !== 0 || sector[sector.at].ships[i].vy !== 0 || sector[sector.at].ships[h].vy !== 0){
						while (sector[sector.at].ships[i].collidesWith(sector[sector.at].ships[h])){
							sector[sector.at].ships[i].y -= sector[sector.at].ships[i].vy; 
							sector[sector.at].ships[i].x += sector[sector.at].ships[i].vx;
							sector[sector.at].ships[h].y -= sector[sector.at].ships[h].vy; 
							sector[sector.at].ships[h].x += sector[sector.at].ships[h].vx;
						}
					}
				console.log(collision.q ,sector[sector.at].ships[h]);
				}
			}
			if (sector[sector.at].ships[i].ctrl === "player1") {
				player1Pos = i;
				if (sector[sector.at].ships[i].x < frame.x + 200 && frame.x > 0) frame.x = sector[sector.at].ships[i].x - 200; //Folgen des Spielers des Screens
				if (sector[sector.at].ships[i].x > frame.x + 1080 && frame.x < background.naturalWidth - 1280) frame.x = sector[sector.at].ships[i].x - 1080;
				if (sector[sector.at].ships[i].y < frame.y + 200 && frame.y > 0) frame.y = sector[sector.at].ships[i].y - 200;
				if (sector[sector.at].ships[i].y > frame.y + 520 && frame.y < background.naturalHeight - 720) frame.y = sector[sector.at].ships[i].y - 520;
				if (key.w) {
					sector[sector.at].ships[i].vy += Math.cos(sector[sector.at].ships[i].angle * Math.PI / 180) * sector[sector.at].ships[i].a;  //Umsetzung der Teilgeschwindigkeiten
					sector[sector.at].ships[i].vx += Math.cos((sector[sector.at].ships[i].angle - 90) * Math.PI / 180) * sector[sector.at].ships[i].a;
				}
				if (key.s) {
					sector[sector.at].ships[i].vy -= Math.cos(sector[sector.at].ships[i].angle * Math.PI / 180) * sector[sector.at].ships[i].a;
					sector[sector.at].ships[i].vx -= Math.cos((sector[sector.at].ships[i].angle - 90) * Math.PI / 180) * sector[sector.at].ships[i].a;
				}
				if (key.a) sector[sector.at].ships[i].angle -= 12 * sector[sector.at].ships[i].a; //Drehung
				if (key.d) sector[sector.at].ships[i].angle += 12 * sector[sector.at].ships[i].a;
				if (sector[sector.at].ships[player1Pos].lightWp !== undefined) {              //Feuern
					if (intervalReact(key.space && sector[sector.at].ships[i].lightWp.ammo > 0, sector[sector.at].ships[i].lightWp.reload, sector[sector.at].ships[i].lightWp.designation + String(i))) {
						sector[sector.at].ships[i].lightWp.ammo -= 1;
						spawnProjectile(sector[sector.at].ships[i], "light");
					}
				}
			}
			if (sector[sector.at].ships[i].ctrl !== "player1"){
				Game.ctx.strokeStyle = "red";//infotafel
				Game.ctx.fillStyle = "green";
				Game.ctx.strokeRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth, 6);
				Game.ctx.fillRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth * (sector[sector.at].ships[i].hp / ship[sector[sector.at].ships[i].designation].hp), 6);
				Game.ctx.fillStyle = "blue";
				Game.ctx.fillRect(sector[sector.at].ships[i].x - frame.x, sector[sector.at].ships[i].y - 12 - frame.y, sector[sector.at].ships[i].skin.naturalWidth * (sector[sector.at].ships[i].shield / ship[sector[sector.at].ships[i].designation].shield), 6);
				Game.ctx.strokeStyle = "yellow";
				Game.ctx.fillStyle = "yellow";
			}
		}
	}
	for (i = 0; i < projectile.length; i++) {
		if (projectile[i].active){
			projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
			projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
			if (projectile[i].x < 0 || projectile[i].y < 0 || projectile[i].x > background.naturalWidth || projectile[i].y > background.naturalHeight) projectile[i].active = false;
			for (h = 0; h < sector[sector.at].ships.length; h++){ //Prozess bei Treffer
				if (projectile[i].hits(sector[sector.at].ships[h]) && sector[sector.at].ships[h].active === true) {
					if (projectile[i].pen > sector[sector.at].ships[h].armour){
						projectile[i].v = 0;
						projectile[i].v = 0;
						if (sector[sector.at].ships[h].shield <= 0) sector[sector.at].ships[h].hp -= projectile[i].alpha;
						if (sector[sector.at].ships[h].shield > 0) sector[sector.at].ships[h].shield -= projectile[i].alpha;
						audio["hit_" + projectile[i].size].play();
						projectile[i].active = false;
					}
					if (projectile[i].pen < sector[sector.at].ships[h].armour){
					for (j = 180; j > 0; j--){
						projectile[i].angle -=1;
						if (projectile[i].angle === -1) projectile[i].angle = 359;
					}
					projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
					projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
					audio["bounce_" + projectile[i].size].play();
					if (projectile[i].hits(sector[sector.at].ships[h])) projectile[i].active = false;
					}
				}
			}
		}
	}
	if (frame.y < 0) frame.y = 0;
	if (frame.y > background.naturalHeight - 720) frame.y = background.naturalHeight - 721;
	if (frame.x > background.naturalWidth - 1280) frame.x = background.naturalWidth - 1281;
	if (frame.x < 0) frame.x = 0;
}


function normalize(target) {
	use = "false";
	state = 0;
	if (target === "skin") clothes = next["clothes"];
	for (var i = 0; i < next.length; i++) {
		next[i] = false;
	}
}

function fadeout() {
	use = "black";
	changeSkin("blank");
	setTimeout(normalize, 1000, "skin");
}

function delay() {
	state += 1;
	if (!next[state]) normalize();
}

function portal(x, y, width, height, to, atx, aty) {
	if (ship.onField[0].x.between(x, x + width) && ship.onField[0].y.between(y, y + height)) {
		for (i = 0; i < projectile.length; i++){
			projectile.pop();
		}
		sector.at = to;
		ship.onField[0].x = atx;
		ship.onField[0].y = aty;
	}
}


function die() {
	normalize();
	fadeout();
	audio.snap.play();
	player1.x = 740;
}
