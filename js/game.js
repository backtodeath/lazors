
var g = {}; // Define the global namespace.
g.characterset = new Image(); g.characterset.src = "library/characterset.gif";
g.roadheight = 48;

var m = { // Game media namespace.
	spritesheets : [],
	player : null,
	spycar : null,
	chopper : null,
	car : null,
	playershadow : null,
	monster : [],
	numbers : null,
	explosion : [],
	playermissile : [],
	spark : [],
	entity : [],
	tile : [],
	road : [],
	alerter : null
};

var ranks = [ "Rookie","Cadet","Officer","Seargent","Special Agent" ];

var stages = [
	{ 
		colour	: "#000000", 
		road	: "#333",
		type	: "night",
		terrain	: "road"
	},
	{ 
		colour	: "#13af28", 
		road	: "#666",
		type	: "day",
		terrain	: "road"
	},
	{ 
		colour	: "#efefef", 
		road	: "#ccc",
		type	: "day",
		terrain	: "ice"
	},
	{ 
		colour	: "#dfb113", 
		road	: "#e5c75f",
		type	: "day",
		terrain	: "sand"
	},
	{ 
		colour	: "#013860", 
		road	: "#004a80",
		type	: "night",
		terrain	: "road"
	},
	{ 
		colour	: "#bf0000", 
		road	: "#ca612e",
		type	: "day",
		terrain	: "hot"
	}
];

var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length;
g.checkCount = 0;
g.imageData = [];
g.audioData = [];

g.loadingImage = new Image(); g.loadingImage.src = "library/loading.gif";


function createSprites()
{
	// Load game media
	for (var a=0;a<imglib.length;a++)
	{
		m.spritesheets[imglib[a].sheetname] = new spritesheet(imglib[a]);
	}
	g.titlescreen = new Image(); g.titlescreen.src = g.imageData[0].src;
	g.gamebackdrops = [];
	g.gamebackdrops[0] = new Image(); g.gamebackdrops[0].src = "library/gamebackdrop.png";
	g.gamebackdrops[1] = new Image(); g.gamebackdrops[1].src = "library/blank.gif";
	g.wizardicon = new Image(); g.wizardicon.src = "library/wizardicon.png";
	g.staricon = new Image(); g.staricon.src = "library/staricon.png";
	g.gameover = new Image(); g.gameover.src = "library/gameover.png";
	g.levelicon = new Image(); g.levelicon.src = "library/level.png";
	g.hiscore = new Image(); g.hiscore.src = "library/hiscore.png";
	g.spygot = new Image(); g.spygot.src = "library/spygot.png";
	g.levelcomplete = new Image(); g.levelcomplete.src = "library/levelcomplete.png";
	g.playpause = new Image(); g.playpause.src = "library/playpause.png";
	g.pregame = new Image(); g.pregame.src = "library/pregame.png";
	g.notportrait = new Image(); g.notportrait.src = "library/notportrait.png";
	g.volumecontrol = new Image(); g.volumecontrol.src = "library/volumecontrols.png";

	m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 8, 4, 1);
	m.spycar = new sprite("spycar", "spycar", m.spritesheets["spycarsheet"], 0, 0, 8, 4, 1);
	m.chopper = new sprite("chopper", "chopper", m.spritesheets["choppersheet"], 0, 0, 8, 4, 0);
	m.car = new sprite("car", "car", m.spritesheets["carsheet"], 0, 0, 8, 4, 0);
	m.alerter = new sprite("alert", "alert", m.spritesheets["alertsheet"], 0, 0, 8, 4, 0);
	m.playershadow = new sprite("playershadow", "playershadow", m.spritesheets["playershadow"], 0, 0, 8, 4, 1);
	m.numbers = new sprite("numbers", "numbers", m.spritesheets["numberssheet"], 0, 0, 0, 0, 1);
	for (var a=0;a<5;a++) m.monster[a] = new sprite("monster"+a, "monster", m.spritesheets["monstersheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<8;a++) m.explosion[a] = new sprite("explosion"+a, "explosion", m.spritesheets["explosionsheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<6;a++) m.entity[a] = new sprite("entity"+a, "entity", m.spritesheets["entitysheet"], 0, 0, 0, 0, 0);
	for (var a=0;a<8;a++) m.tile[a] = new sprite("tile"+a, "tile", m.spritesheets["tilesheet"], 0, 0, 0, 0, 0);
	for (var a=0;a<40;a++) m.spark[a] = new sprite("spark"+a, "spark", m.spritesheets["sparksheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<8;a++) m.playermissile[a] = new sprite("playermissile"+a, "playermissile", m.spritesheets["playermissilesheet"], 0, 0, 8, 0, 0);
	for (var a=0;a<((g.canvasheight / 48)+1);a++) m.road[a] = new road("road" + a, 0, g.roadheight, 24, g.roadheight * -1, "#eee", 4);

	initTouch();
	initHiScore();
	setTitle();
	g.ticker = setTimeout("loop()", 0);
};

function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function preCache() {
	for (var a=0;a<gamedata.imageFiles.length;a++)
	{
		g.imageData[a] = new Image();
		g.imageData[a].src = gamedata.imageFiles[a];
		g.imageData[a].onload = check;
	}
};

function check() {
	g.checkCount ++;
	var pc = Math.round((g.checkCount / g.checkSum) * 100);
	var bar = Math.round(g.canvaswidth * (pc / 100));
	g.ctx.clearRect(140,150,32,16);
	writeText(pc + "%",140,150,0);
	g.ctx.fillStyle = "rgb(240,240,240)";
	g.ctx.fillRect(0,200,g.canvaswidth,16);
	g.ctx.fillStyle = "rgb(0,128,192)";
	g.ctx.fillRect(0,200,bar,16);
	if (g.checkCount >= g.checkSum)
	{
		createSprites();
	}
};


function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function init()
{
	var buttonEvent = function(e) {
		if (e.keyName == "back") {
			tizen.application.getCurrentApplication().exit();
		}
	}

	document.addEventListener('tizenhwkey', buttonEvent);
	
	try
	{
		g.canvas = document.querySelector('canvas');
		g.ctx = g.canvas.getContext('2d');
		g.canvas.setAttribute('class', 'canvas');

		g.ori = 0;

		setCanvasDimensions();
		g.canvas.style.backgroundColor = "#142760";

		g.nextthink = 0;


		g.ad = document.createElement("div");
		g.ad.setAttribute("id", "advert");
		g.ad.style.position = "absolute";
		g.ad.style.top = "8px";
		g.ad.style.left = "8px";
		g.ad.style.width = (g.canvaswidth - 16) + "px";
		g.ad.style.height = "32px";
		g.ad.style.background = "#bf0000";
		g.ad.style.display = "block";
		g.canvas.appendChild(g.ad);

		g.nextthink = 0;

		window.scrollTo(0,0);

		g.pausemode = 0;
		g.audiomode = 1;
		preCache();
	}
	catch (e)
	{
	}
};

function setCanvasDimensions(e)
{
	g.canvaspadding = 32;
	g.displaypadding = 0;
	if (typeof(window.orientation)!="undefined")
	{
		g.ori = window.orientation;
	}

	g.canvaswidth = 320;
	g.canvasheight = 480;

	g.canvas.width = g.canvaswidth;
	g.canvas.height = g.canvasheight;

	window.scrollTo(0,0);
};


function initTouch()
{
	if(checkForTouch()) {
		if (document.body.addEventListener)
		{
			document.body.addEventListener('touchmove', touchMove, false);
			document.body.addEventListener('touchstart', touchStart, false);
		} else {
			window.addEventListener('touchmove', touchMove, false);
			window.addEventListener('touchstart', touchStart, false);
		}
	} else {
		window.addEventListener('mousemove', mouseMove, false);
		window.addEventListener('mouseup', mouseUp, false);
	}
};

function initHiScore()
{
	if (typeof localStorage.key == "function")
	{
		if (localStorage.getItem("spychase-hiscore") != null)
		{
			m.player.hiscore = localStorage.getItem("spychase-hiscore");
		} else {
			m.player.hiscore = 0;
		}
	}
};

function sfx(o)
{
	if (g.audiomode > 0)
	{
		o.play();
	}
};

function handleAudio()
{
	if (g.audiomode < 1)
	{
		soundManager.pauseAll();
	} else {
		soundManager.resumeAll();
	}
};

function checkForTouch() {		
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};

function touch(event) {
	if (g.mode == "title") setGame();
	if (g.mode == "pregame" && g.resetting < 50) 
	{ 
		//playerStart();
		g.mode = "game";
	}
	var o = m.player;
	var tx = (event.pageX - g.canvas.offsetLeft);
	var ty = (event.pageY - g.canvas.offsetTop);	

	if (tx < 64 && ty < 64) g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;

	if (g.pausemode < 1 && m.player.spinning < 1 && g.mode == "game" && !m.player.dying)
	{
		o.targetx = tx;
	}

	g.speedup = false; g.slowdown = false;
};

function touchStart(event) {
	touch(event.touches[0]);
	window.scrollTo(0, 1);
	event.preventDefault();
};

function touchMove(event) {
	touch(event.touches[0]);
};

function mouseMove(event) {
	if (g.mode != "title") touch(event);
};

function mouseUp(event) {
	touch(event);
};

function setTitle()
{
	g.mode = "title";
	g.stage = 0; setStage();
	g.roadspeedmax = 16;
	g.roadspeed = g.roadspeedmax;
	g.roadwidth = 180;
	g.roadx = (g.canvaswidth / 2) - (g.roadwidth / 2);
	setRoad();
};

function setGame()
{
	g.mode = "pregame";
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	g.level = 1;
	g.displaylevel = 1;
	g.resetting = 120;
	g.roadspeedmax = 16;
	g.targetroadspeed = g.roadspeedmax;
	g.roadwidth = 180;
	g.roadx = (g.canvaswidth / 2) - (g.roadwidth / 2);
	g.stage = 0;
	g.miles = 0;
	g.spymiles = 0;
	g.spiescaught = 0;
	g.totalmiles = 0;
	g.carsdestroyed = 0;
	g.stagecarsdestroyed = 0;
	g.bonuspoints = 0;
	g.roadcolourtoggle = 0;
	m.alerter.visible = false;
	setLevel(); 
	setRoad(null);
	playerStart();
};

function setLevel()
{
	wipe(true);
	g.resetting = 120;
	g.roadnextthinkmax = 20;
	g.roadnextthink = g.roadnextthinkmax;
	g.roaddir = rnd(10) < 5 ? 0 : 1;
	setSpyDistance();
	setStage();
};

function setRoad(o)
{
	try
	{
		if (o != null && typeof(o) == "object")
		{
			// set road credentials here
			if (g.mode == "pregame" || g.mode == "title")
			{
				o.x = g.roadx;
				spawnTileChance(o);
				o.colour = stages[g.stage].road;
			} else {
				g.roadnextthink --;
				if (g.roadnextthink < 0)
				{
					g.roadnextthink = g.roadnextthinkmax;
					g.roadnextthinkmax = rnd(30); // randomise the road drawing interval
					g.roaddir = rnd(10) < 5 ? 0 : 1;
					g.roadscaling = rnd(100)<(g.level)?(rnd(10)<3?3:4):4+rnd(4);
					g.targetwidth = g.canvaswidth * (g.roadscaling*0.1);
				}
				
				var r = g.targetwidth;
				if (g.roadwidth > r) { g.roadwidth -= 1; if (g.roadwidth < r) g.roadwidth = r; }
				if (g.roadwidth < r) { g.roadwidth += 1; if (g.roadwidth > r) g.roadwidth = r; }

				g.roadx += g.roaddir > 0 ? 2 : -2;
				if (g.roadx > (g.canvaswidth - 16 - g.roadwidth)) g.roadx = g.canvaswidth - 16 - g.roadwidth;
				if (g.roadx < 16) g.roadx = 16;
				o.boost = rnd(800) < (10-(g.level /2)) ? true : false;
				o.x = g.roadx;
				o.w = g.roadwidth;
				g.roadcolourtoggle ++; if (g.roadcolourtoggle > 1) g.roadcolourtoggle = 0;
				o.colour = stages[g.stage].road;
				spawnEntityChance(o);
				spawnTileChance(o);
				spawnCarChance(o);
				spawnChopperChance(o);
			}
		} else {
			for (var a=0;a<m.road.length;a++)
			{
				m.road[a].x = g.roadx;
				m.road[a].y = -g.roadheight + (a * g.roadheight);
				m.road[a].w = g.roadwidth;
				m.road[a].h = g.roadheight;
				m.road[a].colour = stages[g.stage].road;
				m.road[a].direction = 4;
				m.road[a].bump = false;
			}	
		}
		
	}
	catch (e)
	{
	}
	
};

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
};

function playerStart()
{
	m.player.x = g.canvaswidth / 2 - (m.player.w / 2);
	m.player.y = g.canvasheight - 256;
	m.player.basey = g.canvasheight - 128;

	m.playershadow.x = m.player.x;
	m.playershadow.y = m.player.y + 4;
	m.playershadow.targetx = m.player.x;
	m.playershadow.targety = g.canvasheight - 188;
	m.playershadow.row = 0;
	m.playershadow.startframe = 0;


	m.player.targetx = m.player.x;
	m.player.targety = g.canvasheight - 128;
	m.player.health = 100;
	m.player.stars = 0;
	m.player.magicpower = 0;
	m.player.row = 0;
	m.player.startframe = 0;
	m.player.damage = 0;
	m.player.boosting = 0;
	m.player.jumping = true;
	m.player.offroad = false;
	m.player.spritesheet.framesperdirection = 2;
	m.player.dying = false;
	m.player.missilerow = 0;

	m.player.missilecooldown = 10;

	g.clockstart = new Date();

};

function wipe(doentities)
{
	for (var a=0;a<m.monster.length;a++) m.monster[a].visible = false;
	if (doentities) for (var a=0;a<m.entity.length;a++) { m.entity[a].visible = false; m.entity[a].x = -32; m.entity[a].y = -32; }
};

function playerDeath()
{
	if (m.player.dying) return;
	m.player.dying = true;
	g.resetting = 100;
};

/* -- Game control routines -- */

function drawPlayer(o)
{
	var s = m.playershadow;
	if (!o.visible) return;
	if (o.magicpower > 0) { o.magicpower --; o.row = 1; } else { o.row = 0; }
	try
	{
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
			g.ctx.save();
			if (o.spinning > 0)
			{
				o.angle += 32; if (o.angle > 360) o.angle = 0;
				g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
				g.ctx.rotate(o.angle * (Math.PI / 180));
				g.ctx.drawImage(s.spritesheet.image, s.frame * s.spritesheet.framewidth, 0, s.w, s.h, -s.w/2, o.jumping ? (stages[g.stage].type=="night"?(-s.h/2)-40:(-s.h/2)+(24-o.speed)) : (stages[g.stage].type=="night"?(-s.h/2)-40:(-s.h/2)+4), s.w, s.h);
				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, 0, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
				o.spinning --;
				if (o.spinning < 1)
				{
					g.roadspeed = g.roadspeedmax;
				}
			} else {
				if (o.dying) spawnExplosion(o,0,1);
				if (isNaN(o.frame)) o.frame = o.startframe;
				o.framedelay --;
				if (o.framedelay < 0)
				{
					o.framedelay = o.framedelaymax;
					o.frame ++;
					if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
					{
						o.frame = o.startframe;
					}
					if (o.magicpower > 0 && o.magicpower < 50)
					{
						o.row ++; if (o.row > 1) o.row = 0;
					}
				}
				if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }

				o.angle = g.mode == "caughtspy" ? o.angle += 0.5 : (o.targetx > (o.x + o.w) ? 20 : o.targetx < o.x ? 340 : 0);
				if (g.mode == "caughtspy" && o.angle > 20) o.angle = 20;
				g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
				g.ctx.rotate(o.angle * (Math.PI / 180));
				s.frame = stages[g.stage].type=="night"?1:0;
				g.pc = isNaN(g.pc) ? 0 : g.pc;
				o.row = (g.pc < 0.25 || (m.spycar.y == m.player.y)) && (g.mode == "game" || g.mode == "caughtspy") ? 1 : 0;
				g.ctx.drawImage(s.spritesheet.image, s.frame * s.spritesheet.framewidth, 0, s.w, s.h, -s.w/2, o.jumping ? (stages[g.stage].type=="night"?(-s.h/2)-40:(-s.h/2)+(24-o.speed)) : (stages[g.stage].type=="night"?(-s.h/2)-40:(-s.h/2)+4), s.w, s.h);
				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);

			}
			g.ctx.restore();
		}
	}
	catch (e)
	{
	}

};

function draw(o)
{
	if (!o.visible) return;
	try
	{

		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
				{
					if (o.spritesheet.type == "explosion")
					{
						remove(o);
					} else {
						o.frame = o.startframe;
					}
				}
			}
			if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
		}
		g.ctx.save();
		g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		g.ctx.restore();
	}
	catch (e)
	{
	}

};

function moveRoad(o)
{
	if (g.pausemode > 0) return;
	switch (o.direction)
	{
		case 4:
			o.y += g.roadspeed;
			break;
		case 0:
			o.y -= g.roadspeed;
			break;
	}
	if (o.y > g.canvasheight)
	{
		o.y = (g.roadheight * -1) + (o.y - g.canvasheight) + 1;
		setRoad(o);
	}
};

function drawRoad(o)
{
	if (o.boost)
	{
		var l = g.ctx.createLinearGradient(o.x,o.y,o.x,o.y+o.h);
		l.addColorStop(0, '#ff0000');
		l.addColorStop(0.5, '#0000ff');
		l.addColorStop(0.75, '#ffff00');
		g.ctx.fillStyle = l;
	} else {
		g.ctx.fillStyle = o.colour;
	}
	g.ctx.fillRect(o.x,o.y,o.w,o.h);
};

function getDirection(o)
{
	o.direction = -1;
	if (o.moveup)
	{
		o.direction = 0; o.angle = 0; o.startframe = 4;
		if (o.moveleft) { o.direction = 7; o.angle = 315; o.startframe = 4; }
		if (o.moveright) { o.direction = 1; o.angle = 45; o.startframe = 4; }
	}
	if (o.movedown)
	{
		o.direction = 4; o.angle = 180; o.startframe = 6;
		if (o.moveleft) { o.direction = 5; o.angle = 225; o.startframe = 6; }
		if (o.moveright) { o.direction = 3; o.angle = 135; o.startframe = 6; }
	}
	if (o.moveleft)
	{
		o.direction = 6; o.angle = 270; o.startframe = 2;
		if (o.moveup) { o.direction = 7; o.angle = 315; o.startframe = 4; }
		if (o.movedown) { o.direction = 5; o.angle = 225; o.startframe = 6; }
	}
	if (o.moveright)
	{
		o.direction = 2; o.angle = 90; o.startframe = 0;
		if (o.moveup) { o.direction = 1; o.angle = 45; o.startframe = 4; }
		if (o.movedown) { o.direction = 3; o.angle = 135; o.startframe = 6; }
	}

};

function moveToTarget(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;

	o.oldx = o.x;
	o.oldy = o.y;

	if (o.targetx < 0 && o.targety < 0)
	{
		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	} else {
		if (o.jumping)
		{
			if (o.y >= o.targety)
			{
				if (!o.bounced)
				{
					o.bounced = true;
					o.y = o.y - 8;
					o.speed = -8;
				} else {
					o.speed = o.basespeed;
					o.jumping = false;
				}
			}
			if (o.dying > 0)
			{
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
				if (o.y < 0)
				{
					remove(o);
				}
			}
			if (o.bounced) o.speed += 2;
			if (o.y < o.targety) { o.y += o.speed; }
		} else {
			// Target co-ords set by screen touch.
			if (o.targetx > (o.x + (o.w/2))) { o.x += o.speed; }
			if (o.targetx < (o.x + (o.w/2))) { o.x -= o.speed; }
			if (o.targety < o.y) { o.y -= o.speed; }
			if (o.targety > o.y) { o.y += o.speed; }
			if (o.offroad && g.mode != "caughtspy" && !o.dying)
			{
				o.x += rnd(10)<5?rnd(4):rnd(4)*-1;
				if (o.spritesheet.type == "player")
				{
					o.damage ++;
					if (o.damage > 100) playerDeath();
				}

			}
			if (o.spritesheet.type == "player")
			{
				m.playershadow.x = o.x;
				m.playershadow.targetx = o.x;
				m.playershadow.y = o.y + 4;
			}
		}
	}
	if (o.dying < 1)
	{
		if (o.x < g.canvaspadding) o.x = g.canvaspadding;
		if ((o.x + o.w) > (g.canvaswidth - g.canvaspadding)) o.x = g.canvaswidth - g.canvaspadding - o.w;
		if (o.y < g.canvaspadding) o.y = g.canvaspadding;
		if ((o.y + o.h) > (g.canvasheight - g.canvaspadding)) o.y = g.canvasheight - g.canvaspadding - o.h;
	}
};

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

	switch (o.direction)
	{
	case 0:
		o.y -= o.speed;
		break;			
	case 1:
		o.y -= (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 2:
		o.x += o.speed;
		break;			
	case 3:
		o.y += (o.speed / 1.5);
		o.x += (o.speed / 1.5);
		break;			
	case 4:
		o.y += o.speed;
		break;			
	case 5:
		o.y += (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	case 6:
		o.x -= o.speed;
		break;			
	case 7:
		o.y -= (o.speed / 1.5);
		o.x -= (o.speed / 1.5);
		break;			
	}
	//if ((o.x + o.w) < 0) remove(o); 
	//if (o.x > g.canvaswidth) remove(o); 
	//if ((o.y - o.h) < 0 && o.direction != 4) remove(o); 
	if (o.direction == 0 && (o.y+o.h)  < 0) remove(o);
	if (o.direction == 4 && o.y  > g.canvasheight) remove(o);

};

function throwStars(force,o)
{
	for (var a=0;a<m.player.stars;a++)
	{
		spawnEntityChance(force,o);
	}
};

function playerCarCollision(o) // Car passed in
{
	if (!o.visible || o.dying || m.player.dead || g.pausemode > 0 || o.boosting > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.player.x;
	var my = m.player.y;
	var mw = m.player.w;
	var mh = m.player.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (mx <= (ox+ow)  &&  my <= (oy+oh)  &&  mx >= (ox)  && my >= oy) c1 = true;
	if ((mx+mw) >= ox  &&  my >= oy  &&  (mx+mw) <= (ox+ow)  &&  my <= (oy+oh)) c2 = true;
	if (mx <= (ox+ow)  &&  (my+mh) >= oy  &&  mx >= ox  &&  (my+mh) <= (oy+oh)) c3 = true;
	if (((mx + mw) >= ox) && ((mx + mw) <= (ox + ow)) && ((my + mh) >= oy) && ((my + mh) <= (oy + oh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		//triggerSpin(m.player);
		bump(o,m.player,c1,c2,c3,c4);
		o.playerbumped = true;
		m.player.damage += 5; if (m.player.damage > 100) playerDeath();
	}
};

function bump(o,m,c1,c2,c3,c4)
{
	if (c1)
	{
		if ((o.y+o.h) < m.y)
		{
			o.speed += 16;
			o.bumped = true;
		} else {
			o.speed += 16;
			o.bumped = true;
			o.x -= o.w;
		}
	} else if (c2)
	{
		if ((o.y+o.h) < m.y)
		{
			o.speed += 16;
			o.bumped = true;
		} else {
			o.speed += 16;
			o.bumped = true;
			o.x += o.w;
		}
	} else if (c3)
	{
			o.speed += 16;
			o.bumped = true;
			o.x -= o.w;
	} else if (c4)
	{
			o.speed += 16;
			o.bumped = true;
			o.x += o.w;
	}
};

function entityCollision(o,m) 
{
	if (!o.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row)
		{
			case 0:
				triggerJump(m);
				m.targetscore += 5;
			break;
			case 1:
			case 2:
				triggerSpin(m);
			break;
			case 3:
				if (m.spritesheet.type=="player")
				{
					m.damage -= 10;
					if (m.damage < 0) m.damage = 0;
				}
				m.targetscore += 10;
				remove(o);
			break;
			case 4:
				g.roadspeedmax += 4; if (g.roadspeedmax > 32) g.roadspeedmax = 32;
				m.targetscore += 10;
				remove(o);
			break;
			case 5:
				m.missilerow = 1;
				m.targetscore += 20;
				remove(o);
			break;
		}
	}
};

function playerMissileCollision(o,m) // o = missile, m = car/chopper
{
	if (!o.visible || !m.visible || m.dying > 0 || g.pausemode > 0 || (m.spritesheet.type == "chopper" && m.y > 64)) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row)
		{
			case 0:
				m.damage -= (o.row+1)*5;
			break;
			case 1:
				m.damage -= (o.row+1)*10;
			break;
		}
		m.y -= (m.spritesheet.type=="car")?16:4;
		m.playerbumped = true;
		remove(o);
	}
};

function triggerSpin(o)
{
	if (o.spinning > 0 || o.dying) return; // || o.jumping || o.boosting > 0) return;
	o.spinning = 15;
	o.damage += 10;
	g.roadspeedmax -= 8;
	if (g.roadspeedmax < 16) g.roadspeedmax = 16;
	m.player.missilerow = 0;
};

function triggerJump(o)
{
	if (o.jumping || o.spinning > 0 || o.dying) return;
	o.jumping = true;
	o.y = o.basey - 64;
	o.bounced = false;
	o.targety = o.basey;
};

function triggerBoost(o)
{
	if (o.spinning > 0 || o.dying) return;
	o.boosting = 40;
};

function roadCollision(o,m) // m is a car passed in
{
	if ((o.y + o.h) < m.y || o.y > (m.y+m.h) || m.dying || m.jumping) return;
	if (o.bump && m.spritesheet.type == "player")
	{
		triggerJump(m);
	}
	if (o.boost && m.boosting < 1 && m.spritesheet.type == "player")
	{
		triggerBoost(m);
	}
	if ((m.x+8) < o.x || (m.x + (m.w-8)) > (o.x + o.w))
	{
		m.offroad = true;
		if (m.spritesheet.type == "player") g.offroad = true;
	} else {
		m.offroad = false;
	}
};

function writeText(t,x,y,ty)
{
	var sx = x;
	var grid = {};
	grid.w = 10;
	grid.h = 16;
	var text = new String(t);	
	text = text.toUpperCase();
	for (var a=0;a<text.length;a++)
	{
		var p = text.charCodeAt(a) - 33;
		if (p >= 0)
		{
			g.ctx.drawImage(g.characterset,p * grid.w,ty*grid.h,grid.w,grid.h,x,y,grid.w,grid.h);
		}
		x += grid.w;
		if (x > (g.canvaswidth - 32))
		{
			x = sx;
			y += grid.h;
		}
	}
};

/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
	try
	{
		clearTimeout(g.ticker);
		g.ctx.save();

		//g.ctx.fillStyle = "#6da568";
		//g.ctx.fillRect(0, 0, g.canvaswidth, g.canvasheight);
		g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight);

		switch (g.mode)
		{
			case "title":
				for (var a=0;a<m.road.length;a++)
				{
					moveRoad(m.road[a]);
					drawRoad(m.road[a]);
				}
				for (var a=0;a<m.tile.length;a++)
				{
					m.tile[a].speed = g.roadspeed;
					move(m.tile[a]);
					draw(m.tile[a]);
				}
				hiScore();
				g.ctx.drawImage(g.titlescreen,(g.canvaswidth/2)-160,0);
			break;
			case "pregame":
				for (var a=0;a<m.road.length;a++)
				{
					moveRoad(m.road[a]);
					drawRoad(m.road[a]);
				}
				for (var a=0;a<m.tile.length;a++)
				{
					m.tile[a].speed = g.roadspeed;
					move(m.tile[a]);
					draw(m.tile[a]);
				}
				drawPlayer(m.player);
				moveToTarget(m.player);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					//g.mode = "levelup"; 
					g.mode = "game";
				}
				g.ctx.drawImage(g.pregame, (g.canvaswidth/2)-160, 0);
			break;
			case "game":
				if (g.nextthink > 0) g.nextthink --;
				/*
				for (var a=0;a<m.marker.length;a++)
				{
					draw(m.marker[a]);
				}
				*/

				g.offroad = false;
				for (var a=0;a<m.road.length;a++)
				{
					moveRoad(m.road[a]);
					drawRoad(m.road[a]);
					roadCollision(m.road[a],m.player);
					roadCollision(m.road[a],m.car);
				}

				if (m.player.dying)
				{
					g.resetting --;
					if (g.resetting < 1)
					{
						g.mode = "gameover";
						g.resetting = 300;
						for (var a=0;a<m.explosion.length;a++) remove(m.explosion[a]);
					}
					g.roadspeedmax -= 8;
					if (g.roadspeedmax < 0) g.roadspeedmax = 0;
					g.targetroadspeed = g.roadspeedmax;
				} else {
					if (m.player.spinning > 0)
					{
						g.targetroadspeed -= 0.5;
						if (g.targetroadspeed < 4) g.targetroadspeed = 4;
					} else if (m.player.jumping)
					{
						g.targetroadspeed = g.roadspeedmax / 2;
					} else if (m.player.boosting > 0)
					{
						g.targetroadspeed = g.roadspeedmax + m.player.boosting;
						m.player.boosting --;
					} else {
						if (g.offroad)
						{
							g.targetroadspeed = g.roadspeedmax - 4;
						} else {
							if (g.speedup)
							{
								g.targetroadspeed += 1; if (g.targetroadspeed > g.roadspeedmax) g.targetroadspeed = g.roadspeedmax;
							} else if (g.slowdown)
							{
								g.targetroadspeed -= 1; if (g.targetroadspeed < 16) g.targetroadspeed = 16;
							} else {
								g.targetroadspeed = g.roadspeedmax;
							}
						}
					}
				}
				for (var a=0;a<m.entity.length;a++)
				{
					m.entity[a].speed = g.roadspeed;
					move(m.entity[a]);
					draw(m.entity[a]);
					entityCollision(m.entity[a],m.player);
				}
				for (var a=0;a<m.tile.length;a++)
				{
					m.tile[a].speed = g.roadspeed;
					m.tile[a].row = g.stage;
					move(m.tile[a]);
					draw(m.tile[a]);
				}

				drawPlayer(m.player);
				moveToTarget(m.player);
				moveSpyCar();
				draw(m.spycar);
				moveCar(m.car);
				draw(m.car);
				moveChopper(m.chopper);
				playerCarCollision(m.car);

				m.player.missilecooldown --;
				if (m.player.missilecooldown < 1)
				{
					m.player.missilecooldown = 10;
					spawnPlayerMissile(m.player.x+(m.player.w/2)-2,m.player.y-8,m.player.missilerow);
				}

				for (var a=0;a<m.playermissile.length;a++)
				{
					move(m.playermissile[a]);
					draw(m.playermissile[a]);
					playerMissileCollision(m.playermissile[a],m.car);
					playerMissileCollision(m.playermissile[a],m.chopper);
				}

				for (var a=0;a<m.explosion.length;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}
				
				draw(m.chopper);
				updateScore();
				//updateLives();
				//updateStars();
				//spawnMonsterChance();
				//spawnEntityChance(false, null);
				if (g.pausemode < 1 && !m.player.dying)
				{
					g.miles += g.roadspeed / g.roadspeedmax;
					g.spymiles += g.roadspeed / g.roadspeedmax;
					g.totalmiles += g.roadspeed / g.roadspeedmax;
					if (g.miles > 800) setStage();
				}
				drawPlayerDamage();
				drawRadar();
				draw(m.alerter);
			break;
			case "caughtspy":
				if (g.pausemode < 1)
				{
					g.resetting --;
					if (g.resetting < 1) 
					{
						setSpyDistance();
						g.mode = "game";
						g.roadspeedmax = 16;
						g.targetroadspeed = g.roadspeedmax;
						remove(m.car);
					}
				}
				g.targetroadspeed -= 1; if (g.targetroadspeed < 0) g.targetroadspeed = 0;
				for (var a=0;a<m.road.length;a++)
				{
					moveRoad(m.road[a]);
					drawRoad(m.road[a]);
					roadCollision(m.road[a],m.player);
				}
				for (var a=0;a<m.entity.length;a++)
				{
					m.entity[a].speed = g.roadspeed;
					move(m.entity[a]);
					draw(m.entity[a]);
					entityCollision(m.entity[a],m.player);
				}
				for (var a=0;a<m.tile.length;a++)
				{
					m.tile[a].speed = g.roadspeed;
					move(m.tile[a]);
					draw(m.tile[a]);
				}
				drawPlayer(m.player);
				moveToTarget(m.player);
				draw(m.spycar);
				moveSpyCar();
				moveCar(m.car);
				draw(m.car);
				moveChopper(m.chopper);
				draw(m.chopper);

				updateScore();
				if (m.player.damage > 0) m.player.damage --;
				drawPlayerDamage();
				g.ctx.drawImage(g.spygot,0,0);
				writeText("Stage "+(g.displaylevel-1),124,256,0);
				writeText("You caught the spy",68,270,0);
				writeText("in "+(Math.round(g.spytime/1000))+" seconds",92,284,0);
				writeText("Destroyed cars bonus",56,308,0);
				writeText(g.stagecarsdestroyed+" x 100 = "+(g.stagecarsdestroyed * 100),88,322,0);				

			break;
			case "endlevel":
				for (var a=0;a<m.spark.length;a++) { move(m.spark[a]); draw(m.spark[a]); }
				g.resetting --;
				if (g.resetting < 1)
				{
					setLevel();
				}
				//updateScore();
				//updateLives();
				//updateStars();
				g.ctx.drawImage(g.levelcomplete, 24, 200);
			break;
			case "landscape":
			break;
			case "levelup":
				g.ctx.drawImage(g.levelicon, 90, 200);
				writeLevel();
				g.resetting --;
				if (g.resetting < 1)
				{
					playerStart();
					g.mode = "game";
				}
			break;
			case "gameover":
				g.ctx.drawImage(g.gameover, 10, 200);
				writeText("You completed " + Math.round(g.totalmiles / 100) + " miles", 20,260,0);
				writeText("Spies caught:  " + g.spiescaught, 20,280,0);
				writeText("Vehicles destroyed:  " + Math.round(g.carsdestroyed), 20,300,0);
				var a = 0;
				if (g.spiescaught > 5) a=1;
				if (g.spiescaught > 10) a=2;
				if (g.spiescaught > 20) a=3;
				if (g.spiescaught > 40) a=4;
				writeText("Your rank is " + ranks[a], 20,320,0);
				g.resetting --;
				if (g.resetting < 1)
				{
					setTitle();
				}
				updateScore();
			break;
		}
		g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 8, 8, 32, 32);
		if (g.ori != 0) { g.ctx.drawImage(g.notportrait, 0, 64); g.pausemode = 1; }
		if (isNaN(g.framedelay)) g.framedelay = 30;
		g.ticker = setTimeout("loop()", g.framedelay);
		//testFPS();
		g.ctx.restore();
	}
	catch (e)
	{	}
};

function setStage()
{
	g.miles = 0;
	g.stage ++;
	m.player.damage = 0;
	if (g.stage >= stages.length) g.stage = 0;
	g.canvas.style.background = stages[g.stage].colour;
};

function caughtSpy()
{
	g.mode = "caughtspy";
	g.resetting = 100;
	g.level ++; if (g.level > 20) g.level = 20;
	g.displaylevel ++;
	g.spiescaught ++;
	m.player.boosting = 0;
	m.player.spinning = 0;
	m.player.jumping = false;
	var d = new Date();
	g.spytime = d - g.clockstart;
	g.clockstart = new Date();
	g.targetscore += (g.stagecarsdestroyed * 100);
};

function moveSpyCar()
{
	if (g.pausemode > 0) return;
	if (g.mode == "caughtspy")
	{
		if (g.roadspeed > 0)
		{
			var x = m.player.x + m.player.w - 4;
			m.spycar.x -= 0.5;
			if (m.spycar.x < x) m.spycar.x = x;
			var y = m.player.y + 40;
			m.spycar.y += 2;
			if (m.spycar.y > y) m.spycar.y = y;
		}
	} else {
		//m.spycar.x += rnd(10)<5? m.spycar.x + 1:m.spycar.x - 1;
		m.spycar.x = m.player.x + m.player.w + rnd(8);//(g.canvaswidth/2) - (m.spycar.w/2);
		m.spycar.distance += (m.spycar.speed - g.roadspeed);
		m.spycar.y = m.player.y - m.spycar.distance;
	}
	if (g.roadspeed < g.targetroadspeed)
	{
		g.roadspeed ++; if (g.roadspeed > g.targetroadspeed) g.roadspeed = g.targetroadspeed;
	} else {
		g.roadspeed --; if (g.roadspeed < g.targetroadspeed) g.roadspeed = g.targetroadspeed;
	}
	writeText(Math.round(g.roadspeed*3.5)+"MPH",230,12,1);
};

function moveCar(o)
{
	if (g.pausemode > 0 || !o.visible) return;
	if (o.bumped)
	{
		o.speed --;
		if (o.speed < o.basespeed)
		{
			o.bumped = false;
		}
	}
	if (isNaN(o.nextthink)) o.nextthink = 10;
	o.nextthink --;
	if (o.nextthink < 1)
	{
		// Handle the x co-ord.
		o.direction = rnd(10)<5?2:6;
		o.nextthink = 6;
		o.slidespeed = 0.1 * rnd(10);
	}
	o.x += o.direction==2?o.slidespeed:o.slidespeed*-1;
	if (o.offroad) 
	{
		o.x += rnd(10)<5?rnd(4):rnd(4)*-1;
		o.damage -= 25;
	}
	if (o.damage < 1)
	{
		remove(o);
		spawnExplosion(o,0,1);
		m.player.targetscore += 50;
		if (o.playerbumped) 
		{
			g.carsdestroyed ++; 
			g.stagecarsdestroyed ++;
		}
	}
	o.y += g.roadspeed - o.speed;
	m.alerter.x = o.x;
	if (o.y > 0) remove(m.alerter);
	if (o.y > g.canvasheight || (o.x+o.w) < 0 || o.x > g.canvaswidth) 
	{ 
		remove(o); 
		o.bumped = false; 
	}
};

function moveChopper(o)
{
	if (g.pausemode > 0 || !o.visible) return;
	if (g.mode == "game")
	{
		if (o.y > 64) 
		{
			o.y -= o.speed;
		} else if (o.y < 64)
		{
			o.y += o.speed;
		} else if (o.missilesleft > 0) 
		{
			o.nextthink --;
			if (o.nextthink < 1)
			{
				o.nextthink = 100;
				spawnExplosionXY(o.x+(o.w/2),o.y+(o.h/2),4,4);
				spawnEntity(o.x+(o.w/2),o.y+(o.h/2),1);
				o.missilesleft --;
			}
		}
	} else if (g.mode == "caughtspy" || m.player.dying)
	{
		o.y += 8;
	}
	if (o.missilesleft < 1)
	{
		o.y += 8;
	}
	if (o.x < m.player.x) o.x += o.speed;
	if (o.x > m.player.x) o.x -= o.speed;
	if (o.y > g.canvasheight) 
	{ 
		remove(o); 
	}
	if (o.damage < 25)
	{
		o.spritesheet.framesperdirection = 3;
	} else {
		o.spritesheet.framesperdirection = 2;
	}
	if (o.damage < 1)
	{
		remove(o);
		spawnExplosion(o,0,1);
		m.player.targetscore += 100;
	}
};

function setSpyDistance()
{
	g.spymiles = 0;
	m.spycar.totaldistance = 4000 + (g.level * 100);
	m.spycar.distance = m.spycar.totaldistance;
	m.spycar.speed = 20 + (g.level/2);
	if (m.spycar.speed > 32) m.spycar.speed = 32;
	g.stagecarsdestroyed = 0;
};

function drawRadar()
{
	if (m.player.dying) return;
	
	g.ctx.fillStyle = "rgba(0,255,0,0.6)";
	g.ctx.fillRect(0,68,g.canvaswidth,16);
	// g.miles, g.nextspy
	//var gap = g.nextspy - Math.round(g.spymiles);
	//var gap = m.spycar.y - m.player.y;
	if (m.player.y <= (m.spycar.y+m.spycar.h)) caughtSpy();
	//var xcentre = 160;
	//var xp = xcentre - ((gap/m.spycar.y)*xcentre);
	g.pc = (m.spycar.distance / m.spycar.totaldistance);
	var xs = g.canvaswidth * g.pc;
	if (g.pc > 1) xs = g.canvaswidth - 20;
	g.ctx.fillStyle = "rgb(255,255,255)";
	g.ctx.fillRect(16,74,4,4);
	g.ctx.fillStyle = "rgb(0,0,0)";
	g.ctx.fillRect(xs + 16,74,4,4);
};

function drawPlayerDamage()
{
	if (m.player.dying) return;
	var w = g.canvaswidth * (m.player.damage / 100);
	if (w > (g.canvaswidth - 100))
	{
		g.ctx.fillStyle = "rgba("+rnd(255)+","+rnd(255)+",0,0.6)";
		m.player.spritesheet.framesperdirection = 3;
	} else {
		g.ctx.fillStyle = "rgba(192,0,0,0.6)";
		m.player.spritesheet.framesperdirection = 2;
	}
	g.ctx.fillRect(0,48,w,16);
};

function testFPS()
{
	try
	{
		// FPS
		if (isNaN(g.fps)) g.fps = 0;
		if (g.fps) 
		{
			var d = new Date();
			var c = Math.round(1000 / (d - g.fps));
		}
		var s = new String(c);
		g.fps = new Date();
		//if (c) writeString(s,220,g.canvasheight - 128);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
			if (g.testy >= 10)
			{
				if (g.ave > 1000) g.framedelay = 42; // throttle the fast devices
			}
		}
	}
	catch (e)
	{
	}
};

function spawnMonsterChance()
{
	if (rnd(100) < (2 + (g.level)) && g.pausemode < 1) 
	{
		var x = -32; var y = -32;
		var d = 0; var s = 0; var f = 0;
		// Ghosts and monsters that hurt the player
		y = (g.canvaspadding * 2) + rnd(g.canvasheight / 2);
		if (rnd(10) < 5)
		{
			x = -32;
			d = 2;
			f = 0;
		} else {
			x = g.canvaswidth;
			d = 6;
			f = 2;
		}
		s = 1 + rnd(3);
		var row = parseInt(m.spritesheets["monstersheet"].height) / parseInt(m.spritesheets["monstersheet"].frameheight);
		spawnMonster(x,y,d,s,f,1,rnd(row)-1);
	}
};

function spawnMonster(x,y,d,s,f,ty,row)
{
	if (ty == 1)
	{
		for (var a=0;a<m.monster.length;a++)
		{
			if (!m.monster[a].visible)
			{
				var e = m.monster[a];
				e.visible = true;
				e.direction = d;
				e.x = x;
				e.y = y;
				e.speed = s;
				e.frame = 0;
				e.startframe = f;
				e.row = row;
				break;
			}
		}
	}
};

function spawnMarker(x,y)
{
	for (var a=0;a<m.marker.length;a++)
	{
		if (!m.marker[a].visible)
		{
			var e = m.marker[a];
			e.visible = true;
			e.x = x;
			e.y = y;
			e.frame = 0;
			e.startframe = 0;
			break;
		}
	}
};

function spawnExplosion(o,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = o.x;
			e.y = o.y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function spawnExplosionXY(x,y,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = x;
			e.y = y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function sparkShower(o)
{
	for (var a=0;a<8;a++)
	{
		spawnSpark(o,a,12);
	}
};

function spawnSpark(o,d,sp)
{
	for (var a=0;a<m.spark.length;a++)
	{
		if (!m.spark[a].visible)
		{
			var s = m.spark[a];
			s.visible = true;
			s.direction = d;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.spawny = o.y + 16;
			s.speed = sp;
			s.decay = 30;
			s.opacity = 1;
			break;
		}
	}
};

function spawnChopperChance(o)
{
	if (m.chopper.visible) return;
	var x = 0; var y = 0;
	if ((rnd(1000) < g.level) && g.pausemode < 1) 
	{
		x = g.canvaswidth / 2;
		y = g.canvasheight - 2;
		spawnChopper(x,y);
	}
};

function spawnChopper(x,y)
{
	var s = m.chopper;
	s.visible = true;
	s.x = x;
	s.y = y;
	s.speed = 1;
	s.basespeed = s.speed;
	s.dying = 0;
	s.nextthink = 0;
	s.damage = 100;
	s.missilesleft = 5;
};

function spawnCarChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(100) < 5) && g.pausemode < 1) 
	{
		x = o.x + (o.w / 2) - 24;
		y = -256;
		var row = parseInt(m.spritesheets["carsheet"].height) / parseInt(m.spritesheets["carsheet"].frameheight);
		var r = rnd(row)-1;
		spawnCar(x, y, r);
	}
};

function spawnCar(x,y,row)
{
	if (m.car.visible) return;
	var s = m.car;
	s.visible = true;
	s.x = x;
	s.y = y;
	s.direction = 4;
	s.speed = 16 + rnd(4);
	if (s.speed < (m.player.speed+4)) s.speed = m.player.speed + 4;
	s.basespeed = s.speed;
	s.dying = 0;
	s.row = row;
	s.nextthink = 0;
	m.alerter.visible = true;
	m.alerter.y = 0;
	s.offroad = false;
	s.damage = 100;
	s.playerbumped = false;
};

function spawnEntityChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(100) < 10) && g.pausemode < 1) 
	{
		x = o.x + 32 + (rnd(g.roadwidth - 64));
		y = 0;
		var row = parseInt(m.spritesheets["entitysheet"].height) / parseInt(m.spritesheets["entitysheet"].frameheight);
		var r = rnd(100)<(g.level)?rnd(3)-1:2+rnd(row-3);
		if (g.level < 5 && r == 5)
		{
			if (rnd(100)>5) r = 4; // frig to prevent too much missile exposure
		}
		spawnEntity(x, y, r);
	}
};

function spawnEntity(x,y,row)
{
	for (var a=0;a<m.entity.length;a++)
	{
		if (!m.entity[a].visible)
		{
			var s = m.entity[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 4;
			s.speed = g.roadspeed;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
};

function spawnTileChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(10) < 6) && g.pausemode < 1) 
	{
		var x1 = g.roadx; var x2 = g.roadx + g.roadwidth;
		x = rnd(10) < 5 ? rnd(x1) - 48 : x2 + rnd(g.canvaswidth - x2);
		y = 0;
		var row = parseInt(m.spritesheets["tilesheet"].height) / parseInt(m.spritesheets["tilesheet"].frameheight);
		var r = rnd(10)<5?0:1;
		spawnTile(x, y, r);
	}
};

function spawnTile(x,y,row)
{
	for (var a=0;a<m.tile.length;a++)
	{
		if (!m.tile[a].visible)
		{
			var s = m.tile[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 4;
			s.speed = g.roadspeed;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
};

function spawnPlayerMissile(x,y,row)
{
	for (var a=0;a<m.playermissile.length;a++)
	{
		if (!m.playermissile[a].visible)
		{
			var s = m.playermissile[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 0;
			s.speed = 16;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
};

function writeString(s,x,y)
{
	var o = m.spritesheets["numberssheet"];
	for (var a=0;a<s.length;a++)
	{
		x += o.framewidth;
		var i = s.substr(a,1);
		g.ctx.drawImage(o.image, i*o.framewidth, 0, o.framewidth, o.frameheight, x, y, o.framewidth, o.frameheight);
	}
};

function writeLevel()
{
	var ph = new String();
	var ph2 = new String(g.level);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,190,200);

};

function hiScore()
{
	try
	{
		//g.ctx.drawImage(g.hiscore, 60, 0);
		var sScore = new String();
		var sInScore = new String(m.player.hiscore);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (5-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeString(s,80,0);
		
	}
	catch (e)
	{
	}
};

function updateScore()
{
	try
	{
		m.player.score += 1;
		if (m.player.score > m.player.targetscore) m.player.score = m.player.targetscore;
		if (m.player.score > m.player.hiscore) 
		{
			m.player.hiscore = Math.round(m.player.score);
			localStorage.setItem("spychase-hiscore", m.player.hiscore);
		}
		if (m.player.score > 99999) m.player.score = 99999;
		var sScore = new String();
		var sInScore = new String(m.player.score);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (5-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeString(s,70,0);
		
	}
	catch (e)
	{
	}
};

function updateLives()
{
	g.ctx.drawImage(g.wizardicon, 8, 0);

	var ph = new String();
	var ph2 = new String(m.player.lives);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,20,0);

};

function updateStars()
{
	g.ctx.drawImage(g.staricon, 230, 8);

	var ph = new String();
	var ph2 = new String(m.player.stars);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,240,0);

};

function remove(o)
{
	o.visible = false;
};

window.onorientationchange = function(event) {
	setCanvasDimensions(event);
};

