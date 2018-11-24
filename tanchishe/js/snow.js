	$(function(){
		function add() {
			var d1 = document.getElementById('snow-stage'),
				s1 = document.createElement('span');
				s1.setAttribute('class','snow');
				s1.setAttribute('class','snow');
				s1.style.backgroundColor='rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
			var q = $('.snow');
			/*
			 * 雪花的样式
			 *
			 * .snow {
					width: 2px;
					height: 2px;
					background: white;
					display: inline-block;
					border-radius: 1px;
					position: absolute;
					transition: 3s;
				}

				<!--雪花场景-->
				<div style="width: 100%;height: 100%;position: absolute;top: 0;" id="snow-stage"></div>
				<!--雪花场景-->
			 */
			
			var d2 = d1.clientWidth - 30;
			n = Math.floor(Math.random() * d2);
			h = d1.clientHeight;
			m = Math.floor(Math.random() * 500);
			s1.style.left = n + 'px';
			s1.style.top = 0;
			d1.appendChild(s1);
			setTimeout(function () {
				s1.style.left = (n - m) + 'px';
				s1.style.top = h - 50 + 'px'; //这里是定义最后的位置
				if (q.length > 90) {
					d1.removeChild(q[0])
				}
				add();
			}, 30)
		}
		add();
	})
	