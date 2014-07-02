<?php

//the example of inserting data with variable from HTML form
$link=mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!")or die('Cannot connect to the DB');
mysql_select_db("websysS143",$link) or die('Cannot select the DB');


// Get values from form 
$FBID = $_POST[FBID];
$FNAME = $_POST[FBFNAME];
$LNAME = $_POST[FBLNAME];
$format =  'json';

$query1 = "SELECT ID FROM USERS WHERE FACEBOOK_ID = '$FBID'";
$result2 = mysql_query($query1,$link) or die('Errant query:  '.$query1);	

if(mysql_num_rows($result2))
{
$status = 0;
$post1 = mysql_fetch_assoc($result2); 
$arr = array('status' => 0,'ID'=> $post1['ID']);
header('Content-type: application/json');
echo json_encode($arr);	

  }
  else
{
//inserting data order
$order = "INSERT INTO USERS
	   (FNAME, LNAME, FACEBOOK_ID)
	  VALUES
	   ('$FNAME', '$LNAME', '$FBID')";

//declare in the order variable
$result = mysql_query($order,$link) or die('Errant query:  '.$order);	
  


if($result)
{
$query = "SELECT ID FROM USERS WHERE FACEBOOK_ID = '$FBID'";
$result1 = mysql_query($query,$link) or die('Errant query:  '.$query);	

if(mysql_num_rows($result1))
{
$post = mysql_fetch_assoc($result1); 
$status = 1;
$arr = array('status' => 1,'ID'=> $post['ID']);
header('Content-type: application/json');
echo json_encode($arr);	
	
}

else
{
$status = 2;
$arr = array('status' => "2");
header('Content-type: application/json');
echo json_encode($arr);
}
 
}

else
{
$status = 3;
$arr = array('status' => "3");
header('Content-type: application/json');
echo json_encode($arr);
}
}

@mysql_close($link);
?>
