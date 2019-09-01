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


var cursor = new Body();
var click = false;
function loadCursor(){
	cursor.screen = new Screen();
	cursor.setSkin("cursor");
	cursor.display = function(){
		if (click){ 
			cursor.drawAs(Helon.ress.images["arrow"]);
		}
		else {
			cursor.draw();
		}
	}
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
	if (w.keyCode === 187) key.plus = true;
	if (w.keyCode === 189) key.minus = true;

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
	if (w.keyCode === 187) key.plus = false;
	if (w.keyCode === 189) key.minus = false;
}, false);

document.onmousedown = function(trigger) {
    click = true;
};
document.onmouseup = function(trigger) {
    click = false;
};
document.onmousemove = function(m) {
    let canvas = document.getElementById("Canvas")

    cursor.x = (m.pageX - canvas.offsetLeft) * canvas.width / canvas.clientWidth;
    cursor.y = (m.pageY - canvas.offsetTop) * canvas.height / canvas.clientHeight;
};
