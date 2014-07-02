<?php

//the example of inserting data with variable from HTML form
 $link = mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!") or die('Cannot connect to the DB');
  mysql_select_db('websysS143',$link) or die('Cannot select the DB');

// Get values from form 
$MYID1 = $_POST[MYID];
$MYID2 = $_POST[METID];
$UTIME = $_POST[UTIME];

 echo($MYID1);
 echo($MYID2); 
 echo($UTIME);

$query1 = "SELECT MYID1, MYID2 FROM REQUESTS
           WHERE MYID1 = '$MYID1' AND MYID2 = '$MYID2'
           UNION 
           SELECT MYID2 , MYID1 
           FROM REQUESTS
           WHERE MYID2 = '$MYID1' AND MYID1 = '$MYID2';"; 

$result1 = mysql_query($query1,$link) or die('Errant query:  '.$query1);

echo($result1);

 /* If its not present insert it */
  if(mysql_num_rows($result1)) 
  {

  }
  else
  {
	  $order = "INSERT INTO REQUESTS
	   (MYID1, MYID2 , unixtime)
	  VALUES
	   ('$MYID1','$MYID2','$UTIME')"; 

//declare in the order variable
$result = mysql_query($order);	//order executes
  }
if($result)
{

}
else
{

}
 @mysql_close($link);
?>

