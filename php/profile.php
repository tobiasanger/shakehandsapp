<?php
$link=mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!")or die('Cannot connect to the DB');
mysql_select_db("websysS143",$link) or die('Cannot select the DB');

// Get values from form 


$PHONENUMBER = $_POST['user'];


$format =  'json';

$query = "SELECT * FROM SHAKEHANDS WHERE PHONENUMBER = '$PHONENUMBER'";

$result = mysql_query($query,$link) or die('Errant query:  '.$query);


/* create one master array of the records */

  if(mysql_num_rows($result)==1) {
  $post = mysql_fetch_assoc($result); 
  $status = 1;
  $arr = array('status' => 1, 'PHONE'=> $post['PHONENUMBER'],'FNAME'=> $post['FNAME'],'LNAME' => $post['LNAME'], 'EMAIL' => $post['EMAIL'], 'FACEBOOK' => $post['FACEBOOK'], 'PHOTO' => $post['PHOTO'], 'TWITTER' => $post['TWITTER'] , 'LINKEDIN' => $post['LINKEDIN'] , 'INSTAGRAM' => $post['INSTAGRAM'] ,'Bio' => $post['BIO']);
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
