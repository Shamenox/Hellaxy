var Hellaxy = {
	msgs : [],
	Screen : {},
	Campaign : {},
	Sector : {}
};

Hellaxy.loop = function(){
	Hellaxy.task();
}

function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	Hellaxy.msg.push(neueMsg);
}

function Appstart(){
	setupScreens();
	setupSectors();
	setupLevels();
	Hellaxy.Screen = title;
	Hellaxy.Campaign = quicktest;
	Hellaxy.task = screenManager;
	Helon.app = Hellaxy.loop;
}

