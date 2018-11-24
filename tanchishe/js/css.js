$(function(){
	$('.dif').hover(
		function(){
			$(this).css({'background-color':'#FF9966','cursor':'pointer'});
		}
	,function(){
			$(this).css('background-color','rgb(170,140,110)');
	});
	$('.dif').click(function(){
		$('.dif2').html($(this).html());
		$('.dif2').attr('n',$(this).attr('n'));
	});
//	**
	$('.speed').hover(
		function(){
			$(this).css({'background-color':'#FF9966','cursor':'pointer'});
		}
	,function(){
			$(this).css('background-color','rgb(170,140,110)');
	});
	$('.speed').click(function(){
		$('.speed2').html($(this).html());
		$('.speed2').attr('n',$(this).attr('n'));
	});
//	**
	$('.prop').hover(
		function(){
			$(this).css({'background-color':'#FF9966','cursor':'pointer'});
		}
	,function(){
			$(this).css('background-color','rgb(170,140,110)');
	});
	$('.prop').click(function(){
		$('.prop2').html($(this).html());
		$('.prop2').attr('n',$(this).attr('n'));
	});
	
	$('.prop3').hover(
		function(){
			$(this).css({'background-color':'#FF9966','cursor':'pointer'});
		}
	,function(){
			$(this).css('background-color','rgb(170,140,110)');
	});
	$('.prop3').click(function(){
		$('.prop2').html($(this).html());
		$('.prop2').attr('n',$(this).attr('n'));
	});
	var showi=0; 
	$('.trandiv').click(
		function(){
			if(showi==0){
				$('.prop').hide();
				$('.prop3').show();
				$('.prop2').html('增肌');
				$('.prop2').attr('n',2);
				$('.trandiv').attr('title','点击可选择开启随机道具模式！');
				showi=1;				
			}else if(showi==1){
				$('.prop3').hide();
				$('.prop').show();
				$('.prop2').html('关闭');
				$('.prop2').attr('n',0);
				$('.trandiv').attr('title','点击可选择开启单种道具模式！');
				showi=0;
			}
		}
	);
//	**
	$('.music').hover(
		function(){
			$(this).css({'background-color':'#FF9966','cursor':'pointer'});
		}
	,function(){
			$(this).css('background-color','rgb(170,140,110)');
	});
	$('.music').click(function(){
		$('.music2').html($(this).html());
	});
//	**

})
