var key = {
	w : false,
	a : false,
	s : false,
	d : false,
	e : false,
	q : false,
	i : false,
	space : false,
	esc : false,
	enter : false,
};

var cursor = { x : 0, y : 0, angle : 0};
var click = false;
cursor.display = function(){
	if (click){ 
		Helon.ctx.translate(cursor.x, cursor.y); // Drehung
		Helon.ctx.rotate(cursor.angle * Math.PI / 180);
		Helon.ctx.translate(-(cursor.x), -(cursor.y));
		Helon.ctx.drawImage(Helon.ress.images.arrow, cursor.x, cursor.y); // Display
		Helon.ctx.translate(cursor.x, cursor.y); // Rückdrehung
		Helon.ctx.rotate(-cursor.angle * Math.PI / 180);
		Helon.ctx.translate(-(cursor.x), -(cursor.y));
	}
	else {
		Helon.ctx.drawImage(Helon.ress.images.cursor, cursor.x - 16, cursor.y);
	}
}
cursor.angleTowards = function(angled){
		if (this.x <= angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 90);
		if (this.x > angled.x) return get360((Math.atan((angled.y -this.y) / (angled.x - this. x)) / Math.PI * 180) + 270);
	}
cursor.pointAt = function(da){
	cursor.angle = cursor.angleTowards(da);
}

addEventListener("keydown", function(w) {
	if (w.keyCode === 49) key.one = true;
	if (w.keyCode === 50) key.two = true;
	if (w.keyCode === 51) key.three = true;
    if (w.keyCode === 87) key.w = true;
    if (w.keyCode === 83) key.s = true;
    if (w.keyCode === 65) key.a = true;
    if (w.keyCode === 68) key.d = true;
    if (w.keyCode === 69) key.e = true;
	if (w.keyCode === 81) key.q = true;
	if (w.keyCode === 73) key.i = true;
	if (w.keyCode === 32) key.space = true;
    if (w.keyCode === 27) key.esc = true;
	if (w.keycode === 13) key.enter = true;

    w.preventDefault();
    w.stopPropagation();
}, false);
addEventListener("keyup", function(w) {
	if (w.keyCode === 49) key.one = false;
	if (w.keyCode === 50) key.two = false;
	if (w.keyCode === 51) key.three = false;
    if (w.keyCode === 87) key.w = false;
    if (w.keyCode === 83) key.s = false;
    if (w.keyCode === 65) key.a = false;
    if (w.keyCode === 68) key.d = false;
    if (w.keyCode === 69) key.e = false;
	if (w.keyCode === 81) key.q = false;
	if (w.keyCode === 73) key.i = false;
	if (w.keyCode === 32) key.space = false;
    if (w.keyCode === 27) key.esc = false;
	if (w.keycode === 13) key.enter = false;
}, false);

document.onmousedown = function(trigger) {
    click = true;
};
document.onmouseup = function(trigger) {
    click = false;
};
document.onmousemove = function(m) {
    cursor.x = m.pageX - document.getElementById("Canvas").offsetLeft;
    cursor.y = m.pageY - document.getElementById("Canvas").offsetTop;
};
