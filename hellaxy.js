var Hellaxy = {};

Hellaxy.loop = function(){
	Hellaxy.task();
}

function Appstart(){
	setupScreens()
	Hellaxy.Screen = title;
	Hellaxy.task = screenManager;
	Helon.app = Hellaxy.loop;
}

