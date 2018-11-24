<?php
header("Content-Type:text/html;charset=utf-8");
	mysql_connect('xxx','xxx','xxx');
	mysql_query("set names utf8");   
    mysql_select_db('xxx');
if(!empty($_POST['levels'])){
	$a=$_POST['levels'];
	$arr=array();
	$res=mysql_query("select * from fenshulist where level=$a order by fenshu desc limit 0,10");
	if($res){
		for($i=0;$i<10;$i++){
			$arr[$i]=mysql_fetch_assoc($res);
		}
		if(!empty($arr[9]['fenshu'])){
			$fen10=$arr[9]['fenshu'];
			mysql_query("delete from fenshulist where level=$a and fenshu<$fen10");
		}
		echo (json_encode($arr)) ;
	}else{
		echo 'xx';
	}
}else{
	echo "1";
}
?>