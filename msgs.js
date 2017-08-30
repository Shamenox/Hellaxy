msg = []
function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	msg[msg.length] = neueMsg;
}
function displayMsgs(){
	if (msg.length !== 0){
		stop = true;
		Helon.ctx.fillStyle = "grey";
		Helon.ctx.fillRect(0,0,1280,80);
		Helon.ctx.fillStyle = "white";
		Helon.ctx.fillRect(130,10,1140,60);
		Helon.ctx.strokeStyle = "black";
		Helon.ctx.lineWidth = 10;
		Helon.ctx.strokeRect(10,10,1255,60);
		Helon.ctx.strokeRect(10,10,120,60);
		Helon.ctx.lineWidth = 2;
		Helon.ctx.fillStyle = "black";
		Helon.ctx.fillText("Intercom", 15, 50);
		Helon.ctx.fillText("Continue(E)", 1115, 50);
		
		Helon.ctx.fillText(msg[0].content, 145, 50);
		
		Helon.ctx.strokeStyle = "yellow";
		Helon.ctx.fillStyle = "yellow";
		Helon.ctx.lineWidth = 1;
		if (intervalReact(key.e, 500, "msgDelay")){
			msg.splice(0,1);
			if (msg.length === 0) stop = false;
		}
		if (intervalReact(key.esc)){
			msg.splice(0,msg.length);
			stop = false;
		}
	}
}