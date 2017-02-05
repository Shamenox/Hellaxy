 // Eingabeverarbeitung
function physik() {
	for (i = 0; i < ship.onField.length; i++) {
		ship.onField[i].y -= ship.onField[i].vy;
		ship.onField[i].x += ship.onField[i].vx;
		if (ship.onField[i].angle > 360) ship.onField[i].angle = 0;
		if (ship.onField[i].angle < 0) ship.onField[i].angle = 360;
		if (ship.onField[i].vx > 10) ship.onField[i].vx = 10;
		if (ship.onField[i].vy > 10) ship.onField[i].vy = 10;
		if (ship.onField[i].x < 0) ship.onField[i].x = 0;
		if (ship.onField[i].y < 0) ship.onField[i].y = 0;
		if (ship.onField[i].x > background.naturalWidth - 32) ship.onField[i].x = background.naturalWidth - 32;
		if (ship.onField[i].y > background.naturalHeight - 32) ship.onField[i].y = background.naturalHeight - 32;
		if (ship.onField[i].ctrl === "player1") {
			if (ship.onField[i].x < frame.x + 200 && frame.x > 0) frame.x = ship.onField[i].x - 200; // ok
			if (ship.onField[i].x > frame.x + 1080 && frame.x < background.naturalWidth - 1280) frame.x = ship.onField[i].x - 1080; //ok
			if (ship.onField[i].y < frame.y + 200 && frame.y > 0) frame.y = ship.onField[i].y - 200; // ok
			if (ship.onField[i].y > frame.y + 520 && frame.y < background.naturalHeight - 720) frame.y = ship.onField[i].y - 520;
			if (key.w) {
				ship.onField[i].vy += Math.cos(ship.onField[i].angle * Math.PI / 180) * ship.onField[i].a;
				ship.onField[i].vx += Math.cos((ship.onField[i].angle - 90) * Math.PI / 180) * ship.onField[i].a;
			}
			if (key.s) {
				ship.onField[i].vy -= Math.cos(ship.onField[i].angle * Math.PI / 180) * ship.onField[i].a;
				ship.onField[i].vx -= Math.cos((ship.onField[i].angle - 90) * Math.PI / 180) * ship.onField[i].a;
			}
			if (key.a) ship.onField[i].angle -= 12 * ship.onField[i].a;
			if (key.d) ship.onField[i].angle += 12 * ship.onField[i].a;
			if (ship.onField[i].lightWp !== undefined) {
				Game.ctx.strokeText(ship.onField[i].lightWp.designation + " :", 10, 600);
				Game.ctx.strokeText(ship.onField[i].lightWp.ammo, 20 + Game.ctx.measureText(ship.onField[i].lightWp.designation).width, 600);
				if (intervalReact(key.space && ship.onField[i].lightWp.ammo > 0, ship.onField[i].lightWp.reload, ship.onField[i].lightWp.designation + String(i))) {
					ship.onField[i].lightWp.ammo -= 1;
					spawnProjectile(ship.onField[i], "light");
				}
			}
			if (ship.onField[i].mediumWp !== undefined) {
				Game.ctx.strokeText(ship.onField[i].mediumWp.designation + " :", 10, 600);
				Game.ctx.strokeText(ship.onField[i].mediumWp.ammo, 20 + Game.ctx.measureText(ship.onField[i].mediumWp.designation).width, 600);
			}
			if (ship.onField[i].heavyWp !== undefined) {
				Game.ctx.strokeText(ship.onField[i].heavyWp.designation + " :", 10, 600);
				Game.ctx.strokeText(ship.onField[i].heavyWp.ammo, 20 + Game.ctx.measureText(ship.onField[i].heavyWp.designation).width, 600);
			}
		}
	}
	for (i = 0; i < projectile.length; i++) {
		projectile[i].y -= Math.cos(projectile[i].angle * Math.PI / 180) * projectile[i].v;
		projectile[i].x += Math.cos((projectile[i].angle - 90) * Math.PI / 180) * projectile[i].v;
		if (projectile[i].x < 0 || projectile[i].y < 0 || projectile[i].x > background.naturalWidth || projectile[i].y > background.naturalHeight) projectile[i].texture = image.blank, projectile[i].v = 0;
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
