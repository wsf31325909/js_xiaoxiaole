$(function() {

	function start() {
		var pobox = new Array(); //位置参数盒子
		var isbox = new Array(); //消除功能盒子
		for (let k = 0; k < 6; k++) {
			isbox[k] = new Array();
		}
		var po = 550; //位置参数
		var li = '';
		var top = 0;
		var left = 0;
		var imgbox = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
		var numbox = new Array(); //竖排盒子
		var go = 1; //消除方块是否进行状态
		var go2 = 0; //鼠标是否为按下状态
		var go3 = 0; //第一次进入状态
		var huifui=-1;//恢复参数
		var lefta,leftb,topa,topb,po1,po2;//交换备份参数  
		for (let k = 0; k < 12; k++) {
			numbox[k] = new Array();
		}

		function layout() { //消消乐初始布局
			go3 = 1;
			for (let i = 0; i < 12; i++) {
				pobox.push(po);
				po = po - 50;
			}
			for (let j = 0; j < 144; j++) { //为每一个位置的li配置随机图片
				var jj = ~~(j / 12);
				var rand = ~~(Math.random() * 6);
				left = pobox[j - 12 * jj];
				top = pobox[jj];
				li += "<li n=" + rand + " style='left:" + left + "px;top:" + top + "px; background:url(img/" + imgbox[rand] + "); background-size:100% 100%;color:red;text-align:center;line-height:50px;' ondragstart='return false;'></li>"
				for (let k = 0; k < 6; k++) {
					if (rand == k) {
						isbox[k].push(j);
					}
				}
			}
			$('.gameul').html(li);
			setTimeout(function() {
				is()
			}, 1300);
		}

		function is() {
			for (let k = 0; k < 12; k++) {
				numbox[k] = [];
			}
			for (let j = 0; j < 144; j++) { 
				numbox[j % 12].push($('li').eq(j).attr('n'));
			}
			var xiaobox = new Array();
			var suxiao2 = new Array();
			var suxiao = new Array();
			xbox = new Array();
			for (let k = 0; k < 6; k++) {
				var j = -1;
				for (let i = 0; i < isbox[k].length; i++) { //判定横消盒子
					if (j < i) {
						var jj = 0;
						var xiaobox2 = new Array();
						j = i;
						while ((isbox[k][j + 1] - 1 == isbox[k][j]) && ~~(isbox[k][j] / 12) == ~~(isbox[k][j + 1] / 12)) {
							if (jj == 0) {
								xiaobox2.push(isbox[k][j]);
								xiaobox2.push(isbox[k][j + 1]);
							} else {
								xiaobox2.push(isbox[k][j + 1]);
							}
							jj = 1;
							j++;
						}
						if (xiaobox2.length > 2) {
							xiaobox.push(xiaobox2);
						}
					}
					if (suxiao2.indexOf(isbox[k][i]) == -1) { //判断竖消盒子
						var l = i;
						var jj = 0;
						var xiaobox3 = new Array();
						while (isbox[k].indexOf(isbox[k][l] + 12) != -1) {
							suxiao2.push(isbox[k][l]);
							suxiao2.push(isbox[k][l] + 12);
							if (jj == 0) {
								xiaobox3.push(isbox[k][l]);
								xiaobox3.push(isbox[k][l] + 12);
							} else {
								xiaobox3.push(isbox[k][l] + 12);
							}
							l = isbox[k].indexOf(isbox[k][l] + 12);
							jj = 1;
						}
						if (xiaobox3.length > 2) {
							suxiao.push(xiaobox3);
						}
					}
				}
			}
			for (let i = 0; i < xiaobox.length; i++) { //横消
				for (let j = 0; j < xiaobox[i].length; j++) {
					$('.gameul li').eq(xiaobox[i][j]).css('opacity', '0');
					numbox[xiaobox[i][j] % 12].splice(~~(xiaobox[i][j] / 12), 1);
				}
			}
			for (let i = 0; i < suxiao.length; i++) { //竖消
				for (let j = 0; j < suxiao[i].length; j++) {
					$('.gameul li').eq(suxiao[i][j]).css('opacity', '0');
					numbox[suxiao[i][j] % 12].splice(~~(suxiao[i][0] / 12), 1);
				}
			}
			if (suxiao.length > 0 || xiaobox.length > 0) {
				ecptoma();
			} else {
				if(go3==1 && go==1){
					go=0;
					go3=0;
				}
				
				if(huifui==1){huifu();}else{go=0;}
			}
			if (go == 0 ) {
				var left1 = 0;
				var left2 = 0;
				var top1 = 0;
				var top2 = 0;
				for (let i = 0; i < 144; i++) {
					$('.gameul li').eq(i).mousedown(
						function(e) {
							if (go == 0 ) {						
								go=1;
								po1 = i;
								left1 = e.clientX;
								top1 = e.clientY;
								go2 = 1;
							}
						}
					);
				}
				$(window).mouseup(
					function(e) {
						if (go2 == 1) {
							left2 = e.clientX;
							top2 = e.clientY;
							var jja = ~~(po1 / 12);
							lefta = pobox[po1 - 12 * jja];
							topa = pobox[jja];
							var n=-1;
//							**
							if (Math.abs(top2 - top1) > Math.abs(left2 - left1)) {
								if (top2 - top1 > 0) {//往下移动
									if (~~(po1 / 12) > 0) {//除开第一排
										po2 = po1 - 12;
										popo();
									}
								} else {//往上移动
									po2 = po1 + 12;
									console.log(po1);
									if (~~(po1 / 12) <11) {//除开最上排
										po2 = po1 + 12;
										popo();
									}
									go=0;
								}
							} else {
								if (left2 - left1 > 0) {//往右移动
									po2 = po1 - 1;
									if(~~(po2/12)==~~(po1/12)){
										popo();
									}
									go=0;
									
								} else {//往左移动
									po2 = po1 + 1;
									if(~~(po2/12)==~~(po1/12)){
										popo();
									}
									go=0;
								}
							}
						}
						go2 = 0;
					}
				);

			}
		}

		function huifu(){
			huifui=0;
			
			$('.gameul li').css('transition', '0.2s');
			$('.gameul li').eq(po1).animate({
					'left': leftb,
					'top': topb
				}, 100, 'linear',
				function() {
						$('.gameul li').eq(po1).animate({
							'left': lefta,
							'top': topa
						}, 100, 'linear');
						n=$('.gameul li').eq(po1).attr('n');
						$('.gameul li').eq(po1).css('transition', '0s');
						$('.gameul li').eq(po1).attr('n',$('.gameul li').eq(po2).attr('n'));
						$('.gameul li').eq(po1).css('background','url(img/' + imgbox[$('.gameul li').eq(po2).attr('n')] + ')');
						$('.gameul li').eq(po1).css('background-size', '100% 100%');
				}
			);
			$('.gameul li').eq(po2).animate({
				'left': lefta,
				'top': topa
			}, 100, 'linear',
			function() {
				$('.gameul li').eq(po2).animate({
					'left': leftb,
					'top': topb
				}, 100, 'linear');
				$('.gameul li').eq(po2).css('transition', '0s');
				$('.gameul li').eq(po2).attr('n',n);
				$('.gameul li').eq(po2).css('background','url(img/' + imgbox[n] + ')');
				$('.gameul li').eq(po2).css('background-size', '100% 100%');
				go=0;
			}
			);
			isbox[$('.gameul li').eq(po2).attr('n')].splice(isbox[$('.gameul li').eq(po2).attr('n')].indexOf(po2), 1);			
			isbox[$('.gameul li').eq(po1).attr('n')].splice(isbox[$('.gameul li').eq(po1).attr('n')].indexOf(po1), 1);
			isbox[$('.gameul li').eq(po2).attr('n')].push(po1);
			isbox[$('.gameul li').eq(po2).attr('n')] = selectionSort(isbox[$('.gameul li').eq(po2).attr('n')]);
			isbox[$('.gameul li').eq(po1).attr('n')].push(po2); 
			isbox[$('.gameul li').eq(po1).attr('n')] = selectionSort(isbox[$('.gameul li').eq(po1).attr('n')]);

		}
		
		function popo(){//头像交换函数
			var jjb = ~~(po2 / 12);
			leftb = pobox[po2 - 12 * jjb];
			topb = pobox[jjb];
			$('.gameul li').css('transition', '0.2s');
			$('.gameul li').eq(po1).animate({
					'left': leftb,
					'top': topb
				}, 100, 'linear',
				function() {
						n=$('.gameul li').eq(po1).attr('n');
						$('.gameul li').eq(po1).css('transition', '0s');
						$('.gameul li').eq(po1).attr('n',$('.gameul li').eq(po2).attr('n'));
						$('.gameul li').eq(po1).css('background','url(img/' + imgbox[$('.gameul li').eq(po2).attr('n')] + ')');
						$('.gameul li').eq(po1).css('background-size', '100% 100%');
						$('.gameul li').eq(po1).animate({
							'left': lefta,
							'top': topa
						}, 100, 'linear');
				}
			);
			$('.gameul li').eq(po2).animate({
					'left': lefta,
					'top': topa
				}, 100, 'linear',
				function() {
						$('.gameul li').eq(po2).css('transition', '0s');
						$('.gameul li').eq(po2).attr('n',n);
						$('.gameul li').eq(po2).css('background','url(img/' + imgbox[n] + ')');
						$('.gameul li').eq(po2).css('background-size', '100% 100%');
						$('.gameul li').eq(po2).animate({
							'left': leftb,
							'top': topb
						}, 100, 'linear');
				});
//										**
			isbox[$('.gameul li').eq(po2).attr('n')].splice(isbox[$('.gameul li').eq(po2).attr('n')].indexOf(po2), 1);
			isbox[$('.gameul li').eq(po1).attr('n')].splice(isbox[$('.gameul li').eq(po1).attr('n')].indexOf(po1), 1);
			isbox[$('.gameul li').eq(po2).attr('n')].push(po1);
			isbox[$('.gameul li').eq(po2).attr('n')] = selectionSort(isbox[$('.gameul li').eq(po2).attr('n')]);
			isbox[$('.gameul li').eq(po1).attr('n')].push(po2); 
			isbox[$('.gameul li').eq(po1).attr('n')] = selectionSort(isbox[$('.gameul li').eq(po1).attr('n')]);
			huifui=1;
			setTimeout(function() {
				$('.gameul li').css('transition', '1s');
				is();
			}, 300);
		}
		function selectionSort(arr) { //排序算法
			var len = arr.length;
			var minIndex, temp;
			for (var i = 0; i < len - 1; i++) {
				minIndex = i;
				for (var j = i + 1; j < len; j++) {
					if (arr[j] < arr[minIndex]) { //寻找最小的数
						minIndex = j; //将最小数的索引保存
					}
				}
				temp = arr[i];
				arr[i] = arr[minIndex];
				arr[minIndex] = temp;
			}
			return arr;
		}

		function ecptoma() { //消除后重新随机填充
			huifui=0;
			for (let i = 0; i < 12; i++) {
				var jk = 12 - numbox[i].length;
				for (let j = 0; j < jk; j++) {
					var rand = ~~(Math.random() * 6);
					numbox[i].push(rand);
				}
			}
			setTimeout(function() {
				isbox = new Array();
				for (let k = 0; k < 6; k++) {
					isbox[k] = new Array();
				}
				for (let i = 0; i < 144; i++) {
					$('.gameul li').eq(i).css('opacity', '1');
					$('.gameul li').eq(i).attr('n', numbox[i % 12][~~(i / 12)]);
					$('.gameul li').eq(i).css('background', 'url(img/' + imgbox[numbox[i % 12][~~(i / 12)]] + ')');
					$('.gameul li').eq(i).css('background-size', '100% 100%');
					isbox[numbox[i % 12][~~(i / 12)]].push(i);
				}
			}, 1000);
			setTimeout(function() {
				is()
			}, 1300);
		}
		layout();

	}
	start();
})