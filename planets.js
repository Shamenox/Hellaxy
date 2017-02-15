var planet = {};
function createPlanet(designation, skin, inSector, x, y){
	neuerPlanet = {}
	neuerPlanet.designation = designation;
	neuerPlanet.skin = image[skin];
	neuerPlanet.x = x;
	neuerPlanet.y = y;
	sector[inSector].planets.push(neuerPlanet);
}

function displayPlanets(){
	for (i = 0; i < sector[sector.at].planets.length; i++){
		Game.ctx.drawImage(sector[sector.at].planets[i].skin, sector[sector.at].planets[i].x - frame.x - sector[sector.at].planets[i].skin.naturalWidth/2, sector[sector.at].planets[i].y - frame.y - sector[sector.at].planets[i].skin.naturalHeight/2);
	}
}