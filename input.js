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
function setupInput(){
addEventListener("keydown", function(w) {
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
}
