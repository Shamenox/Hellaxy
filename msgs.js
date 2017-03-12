msg = []
function addMsg(content){
	neueMsg = {};
	neueMsg.content = content;
	msg[msg.length] = neueMsg;
}
function displayMsgs(){
	if (msg.length !== 0){
		stop = true;
		Game.ctx.fillStyle = "grey";
		Game.ctx.fillRect(0,0,1280,80);
		Game.ctx.fillStyle = "white";
		Game.ctx.fillRect(130,10,1140,60);
		Game.ctx.strokeStyle = "black";
		Game.ctx.lineWidth = 10;
		Game.ctx.strokeRect(10,10,1255,60);
		Game.ctx.strokeRect(10,10,120,60);
		Game.ctx.lineWidth = 2;
		Game.ctx.fillStyle = "black";
		Game.ctx.fillText("Intercom", 15, 50);
		Game.ctx.fillText("Continue(E)", 1115, 50);
		
		Game.ctx.fillText(msg[0].content, 145, 50);
		
		Game.ctx.strokeStyle = "yellow";
		Game.ctx.fillStyle = "yellow";
		Game.ctx.lineWidth = 1;
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