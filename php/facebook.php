<?php

//the example of inserting data with variable from HTML form
$link=mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!")or die('Cannot connect to the DB');
mysql_select_db("websysS143",$link) or die('Cannot select the DB');


// Get values from form 
$ID = $_POST[ID];
$FBLINK = $_POST[FBLINK];
$FBIMAGE = $_POST[FBIMAGE];
$format =  'json';



//inserting data order
$order = "UPDATE SHAKEHANDS SET
	   FACEBOOK = 
	   ('$FBLINK'), PHOTO = ('$FBIMAGE') WHERE PHONENUMBER =('$ID')";

//declare in the order variable
$result = mysql_query($order,$link) or die('Errant query:  '.$query);	
if($result)
{
$status = 1;
$arr = array('status' => 1);
header('Content-type: application/json');
echo json_encode($arr);
 
}
else {
$status = 0;
$arr = array('status' => 0);
header('Content-type: application/json');
echo json_encode($arr);
}
@mysql_close($link);
?>
