<?php
	header("Content-Type:text/html;charset=utf-8");
	$level=$_POST['level'];
	$name=$_POST['name'];
	$fenshu=$_POST['fenshu'];
	mysql_connect('xxx.com','xxx','xxx');
	mysql_query("set names utf8");   
    mysql_select_db('xxx');
	$sql="insert into fenshulist (level,name,fenshu) values ($level,'$name',$fenshu)";
	$res=mysql_query($sql);
	if($res){
		echo '1';
	}
?>