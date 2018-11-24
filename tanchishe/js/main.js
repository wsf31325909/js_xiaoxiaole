$(function(){
	var c = document.getElementById("can1"),
	n, ctx = c.getContext("2d");
		var go=0;//游戏状态，0为结束状态，1为进行状态
		var dif=1;//难度等级
		var speed=1;//速度等级
		var propf=0;//是否开启道具，0为不开启，1为开启		
		var difbox=[0,20,60,100,140,220];//障碍数量盒子
		var speedbox=[400,250,150,100,80,50];//速度盒子
		var propbox=[0,1,2,3,4,5];//道具盒子
		var propcolor=["#006600","#993333","#666633","#FFFF00","#3366CC","#0099CC"];//道具颜色盒子
		var level='000';//难度代号
		var fenshu=0;//分数
		
function start(){
	var she=[180,140,100,60];//蛇的身体元素
	var shec="rgb(43,141,169)";//蛇的颜色
	var zaw=new Array();//障碍物
	var zawn=difbox[dif];//障碍物数量
	var food=new Array();//食物
	var prop=new Array();//道具
	var shew=new Array();//掉落的蛇尾巴数组
	var shef=40;//行进方向（开始默认行进方向）
	var sudu=speedbox[speed];//行进速度
	var foodi=-1;
	var propi=-1;
	var propk=new Array();
	var jyi=0;	//加油gif函数执行标识
	var a=0;	//开门参数
	var b=0;	//开门参数
	b=0.2/3;	//开门参数之开门速度，0.1ms执行一次
	var time=3;	//开门倒计时
	var anquan=[20,60,100,140,180,220,260,300,340,380,420,460,500,540,580,620,660,700,740,780,820,860,900,940];//不生成障碍物的区域，防止出生就撞死
	var prophelp=-1;//帮助生成道具的参数
	var wudi=0;//无敌信号参数
	
//	**生成蛇身体
	function draw(t, c) { //画布中生成元素
		ctx.fillStyle = c;
		var x= (t % 40)*20;
		var y= ~~(t / 40)*20;		
		ctx.fillRect( x , y , 18, 18); //生成画布元素，包括位置(前2个参数)和大小（后两个参数）
	}
	
//	**

//  **生成入场区域
	function region(){
		ctx.beginPath();
		ctx.moveTo(260,0);
		ctx.lineTo(260,100);	
		ctx.lineTo(360,100);
		ctx.lineWidth='2';
		ctx.strokeStyle="white";
		ctx.stroke();
		ctx.closePath();
		//	**左右分割
		ctx.beginPath();	
		ctx.moveTo(420,100);		
		ctx.lineTo(520,100);
		ctx.lineTo(520,0);
		ctx.lineWidth='2';
		ctx.strokeStyle="white";
		ctx.stroke();
		ctx.closePath();
	}
//	**		
	
//	**开门效果
	function door(x,y){
		ctx.clearRect(360,97,60,70);
		ctx.clearRect(300,101,60,70);
		ctx.beginPath();
		ctx.moveTo(360,100);
		ctx.arc(360,100,60,a,a,false);//绘制弧形轨迹线，当这里的两个a参数不同时，有弧线，不然只有半径
		ctx.lineJoin="round";		
		ctx.lineWidth="5";
		ctx.strokeStyle="rgb(170,140,110)";
		ctx.stroke();
		ctx.closePath();
		a=x+y;
		if(a>2){
			clearInterval(t1);
		}
	}

//	**

//	**开始倒计时
	function tt(a){		
		ctx.clearRect(275,0,90,90);
		ctx.beginPath();
		ctx.font="50px 宋体";//样式同css的font
		ctx.fillStyle="rgb(40,140,170)";//这里可以设置字体颜色
		ctx.fillText(a,305,59);//设置字体和位置
		ctx.closePath();
//		**圆形框
		ctx.beginPath();
		ctx.arc(318,42,40,0,360*Math.PI);
		ctx.lineJoin="round";		
		ctx.lineWidth="3";
		ctx.strokeStyle="rgb(40,140,170)";
		ctx.stroke();
		ctx.closePath();
		time=a-1;
		if(time<0){
			ctx.clearRect(275,0,90,90);
			clearInterval(t2);			
		}
	}
//	**

//	**开场gif
	function jyimg(){
	var jiayou=$('.jiayou');
		jiayou.show();
		jyi++;
		if(jyi==2){
			jiayou.hide();
			clearInterval(t3);
		}
	}
//  **
	
//	**清除开始门区域
	function clearregion(){
		ctx.clearRect(255,0,110,160);
		ctx.clearRect(420,0,110,160);
	}
//	**
	
//	**生成初始蛇
	function is(a){
		if(a==0){
			for(var shei=0;shei<she.length;shei++){
				draw(she[shei],shec);
			}
		}else{
			draw(she[0],shec);
		}
	}
//	**

//	**每次移动将蛇最后尾巴变黑
	function is2(){
		draw(she[she.length-1],'black');	
	}
//	**

//	**蛇移动函数
	function move(){ 
		var movet=setInterval(function(){
			//**无敌时间
			if(wudi==1){
				if(zaw.indexOf(she[0]+shef) != -1){
					zaw.splice(zaw.indexOf(she[0]+shef),1);
				}
			}
			//**死亡判定,要在移动之前进行判定
			if(  zaw.indexOf(she[0]+shef) != -1 || she.indexOf(n, 1)!=-1 || (shef==1 && she[0]%40==39) || (shef==-1 && she[0]%40==0) || (she[0]<40 && shef==-40)  || (she[0]>1160 && shef==40) ){
				go=0;
				clearInterval(movet);
				$('.start').css({'background-color':'red','border-radius':'0px'});	
				if($('.fs').eq(9).html()=='' || fenshu>eval($('.fs').eq(9).html())){
					$('.lsnd2').html(level);
					$(".lsfenshu2").html(fenshu);
					$('.liuming').show();
				}else{
				alert('gg思密达!!');	
				}
			}
			//**
			//**道具判定
			if(propf!=0){
				if(prop.indexOf(n=she[0]+shef) != -1){
					props(propk[n],n);
					prop.splice(prop.indexOf(n),1);
				}
				if(she.length%5==0 && she.length > prophelp){
					prophelp=she.length;
					scprop();
				}
			}
			//**蛇尾巴判定
			if(shew.indexOf(n=she[0]+shef) != -1){
				shew.splice(shew.indexOf(n),1);
				fenshu+=10;
				$('.fenshu2').html(fenshu);	
			}
			//**食物判定
			if(food.indexOf(n=she[0]+shef) != -1){
				she.unshift(n);						
				scfood(n);
				is(1);
				fenshu+=10;
				$('.fenshu2').html(fenshu);				
			}else{
			//正常走路
				she.unshift( n=she[0]+shef);
				she.pop();
				is(1);
				is2();
				//**
			}
		},sudu);		
	}
//	**

//	**生成障碍物
	function sczaw(){
		for(var zawi=0;zawi<zawn;zawi++){
			var fn=0;
			while(fn==0){
				zawi2=Math.floor(Math.random()*1200);
				while( fn==0 && anquan.indexOf(zawi2)==-1){
					fn=1;
					zaw.unshift(zawi2);
				}	
			}					
		}
		for(var i=0;i<zaw.length;i++){
			draw(zaw[i],'#999999');			
		}
	}
//	**

//  **生成食物点
	function scfood(a){
		var fn=0;
		while (fn==0){
			foodi=Math.floor(Math.random()*1200);
			while( zaw.indexOf(foodi)==-1 && she.indexOf(foodi)==-1 && food.indexOf(foodi)==-1 && fn==0 ){
				fn=1;
				food.unshift(foodi);	
			}	
		}
		var fwz=food.indexOf(a);
			if(a!=-1)food.splice(fwz,1);
		for(var i=0;i<food.length;i++){
			draw(food[i],'#99CC33');			
		}		
	}
//	**

//	生成道具
	function props(a,b){//道具生成函数
		if(a!=-1){
			propfun(a,b);
		}
	}
	function scprop(){
		var fn=0;
		if(propf==1){var propn=Math.floor(Math.random()*6);}
		if(propf==2){var propn=0}; 
		if(propf==3){var propn=1}; 
		if(propf==4){var propn=2}; 
		if(propf==5){var propn=3}; 
		if(propf==6){var propn=4}; 
		if(propf==7){var propn=5}; 
		while(fn==0){
			propi=Math.floor(Math.random()*1200);
			while(zaw.indexOf(propi)==-1 && she.indexOf(propi)==-1 && prop.indexOf(propi)==-1 && food.indexOf(propi)==-1 && fn==0 ){
				prop.unshift(propi);
				propk[propi]=propn;
				fn=1;
				draw(propi,propcolor[propn]);
			}	
		}		
	}
//	**
	
//	道具函数
	function propfun(a,b){
		if(a==0){//增加食物
			addfood();
		}else if(a==1){//减少身体
			decshe();
		}else if(a==2){//高分食物
			gaofen();
		}else if(a==3){//减少障碍物
			deczaw();
		}else if(a==4){//无敌状态
			invincible();
		}else if(a==5){//反向+高分
			draw(she[0],'black');
			draw(b,'black');
			fanxiang();
		}
		//**		
	}
	
	function addfood(){
		$('.tips').html('增加食物！');
		scfood(-1);
	}
	function decshe(){
		if(she.length>5){
			$('.tips').html('金蚕脱壳！');			
			for(var k=she.length-1;k>she.length-5;k--){//英文蛇还有一个黑色尾巴，所以这了是length-5
				shew.unshift(she[k]);
				draw(she[k],'red');
			}
			she.splice(she.length-4,3);
		}else{
			$('.tips').html('不能再减咯！');			
		}
	}
	function gaofen(){
		$('.tips').html('获得高分食材！');
		fenshu+=50;
		$('.fenshu2').html(fenshu);	
	}
	function deczaw(){
		var decnum=difbox[dif]/20;		
		if(zaw.length>=decnum){
			$('.tips').html('减少障碍物！');			
			for(var i=0;i<decnum;i++){
				var decz=~~Math.random(zaw.length);
				shew.unshift(zaw[decz]);
				draw(zaw[decz],'red');
				zaw.splice(decz,1);
			}
		}		
	}
	function invincible(){
		wudi=1;
		$('.tips').html('无敌时间5s！');
		setTimeout(function(){wudi=0;$('.tips').html('无敌时间结束！');},5000);
	}
	function fanxiang(){
		$('.tips').html('火车倒头！');
		she.reverse();
		shef=she[0]-she[1];
		is(1);
		is2();
		fenshu+=100;
		$('.fenshu2').html(fenshu);	
	}
		
//	**

//	**键盘事件
	document.onkeydown=function(e){
		var e= event || window.event || arguments.callee.caller.arguments[0];
		var k=e.keyCode;
		var keye=new Array();
		var keyarr=[37,38,39,40];
		keye[37]=-1;
		keye[38]=-40;
		keye[39]=1;
		keye[40]=40;
		if(keyarr.indexOf(k)!=-1 && keye[k]!=she[1]-she[0]){
			shef=keye[k];
		}		
	}
//	**

	region();//生成开场区域
	var t1=setInterval(function(){door(a,b)},100);	//调用开门函数
	tt(time);//生成开始倒计时初始数字
	var t2=setInterval(function(){tt(time);},1000);	//调用倒计时函数
	jyimg();//生成加油gif
	var t3=setInterval(function(){jyimg();},3000);//清除加油gif
	setTimeout(function(){clearregion()},3100);//清除开场区域
	setTimeout(function(){sczaw();scfood(-1);move();props(-1);},3200);//生成障碍物
	is(0);//生成初始蛇
	is2();	//擦除初始蛇尾巴
	

}
//	开始按钮点击
	$('.menu').eq(0).click(
		function(){
			if(go==0){
				go=1;
				$('.liuming').hide();
				dif=eval($('.dif2').attr('n'))-1;
				speed=eval($('.speed2').attr('n'))-1;
				propf=eval($('.prop2').attr('n'));
				ctx.clearRect(0,0,$('#can1').width(),$('#can1').height());//重置画布
				setTimeout(function(){start();},200);
				$('.start').css({'background-color':'yellowgreen','border-radius':'10px'});
				level=$('.prop2').attr('n')+$('.dif2').attr('n')+$('.speed2').attr('n');//等级代号
				$('.difnum2').html(level);
				$.post('select.php',{levels:level},function(a,b){
					if(a){
						console.log(a);
						for(var fs=0;fs<10;fs++){
							if(a[fs]!=false){
								$('.num').eq(fs).html(fs+1);
								$('.name').eq(fs).html(a[fs]['name']);
								$('.fs').eq(fs).html(a[fs]['fenshu']);
							}else{
								$('.num').eq(fs).html('');
								$('.name').eq(fs).html('');
								$('.fs').eq(fs).html('');
							}
						}
					}
				},'json');
				fenshu=0;
				$('.fenshu2').html(fenshu);				
			}
		}
	);
	// **排行榜留名
	$('.tijiao').click(
		function(){
			$.post(
				'admin.php',
				{level:level,fenshu:fenshu,name:$('.name2').val()},
				function(a,b){
					if(a){
						alert('OK!你是最棒的！！');
						$('.liuming').hide();
					}
				}
			);
		}
	);
	$('.didiao').click(
		function(){
			$('.liuming').hide();
		}
	)
	// **播放音乐功能
	// var musici=0;
	// var musicbox=['002.mp3','003.mp3','005.mp3','006.mp3','007.mp3'];
	// var audio=document.getElementsByClassName('audio')[0];
	// $('.music').eq(0).click(
	// 	function(){
	// 		$('.audio').attr('src','music/'+musicbox[musici]);
	// 		audio.play();
	// 		$('.music3').html('0'+(musici+1));
	// 		$('.music2').html('开启');
	// 	}
	// );
	// $('.music').eq(1).click(
	// 	function(){
	// 		$('.audio').attr('src','');
	// 	}
	// );
	// $('.prem').click(
	// 	function(){
	// 		musici--;
	// 		if(musici==-1){
	// 			musici=4;
	// 		}
	// 		$('.audio').attr('src','music/'+musicbox[musici]);
	// 		audio.play();
	// 		$('.music3').html('0'+(musici+1));
	// 		$('.music2').html('开启');
	// 	}
	// );
	// $('.nxtm').click(
	// 	function(){
	// 		musici++;
	// 		if(musici==5){
	// 			musici=0;
	// 		}
	// 		$('.audio').attr('src','music/'+musicbox[musici]);
	// 		audio.play();
	// 		$('.music3').html('0'+(musici+1));
	// 		$('.music2').html('开启');
	// 	}
	// );
})
