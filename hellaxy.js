var Hellaxy = {};
Hellaxy.Task = menue.display();

Hellaxy.loop = function(){
	Hellaxy.Task();
}

function Appstart(){
	Helon.app = Hellaxy.loop;
}

console.log(Appstart);