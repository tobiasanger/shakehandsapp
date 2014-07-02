<?php
$link=mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!")or die('Cannot connect to the DB');
mysql_select_db("websysS143",$link) or die('Cannot select the DB');

// Get values from form 
$PHONENUMBER = $_POST['PHONENUMBER'];
$PASSWORD = $_POST['PASSWORD'];
$format =  'json';

$query = "SELECT FNAME FROM SHAKEHANDS WHERE  PHONENUMBER = '$PHONENUMBER' AND PASSWORD ='$PASSWORD'" ;

$result = mysql_query($query,$link) or die('Errant query:  '.$query);


/* create one master array of the records */

  if(mysql_num_rows($result)==1) {
  $post = mysql_fetch_assoc($result); 
  $status = 1;
  $arr = array('status' => 1, 'FNAME'=> $post['FNAME']);
  }
  else
  {  
  $status = 0;
  $arr = array('status' => 0);  	  
  }



  /* output in necessary format */
  if($format == 'json') {
    header('Content-type: application/json');
    echo json_encode($arr);
  }
  else {
    header('Content-type: text/xml');
    echo $post;
  
  }

  /* disconnect from the db */
 
@mysql_close($link);

?>
