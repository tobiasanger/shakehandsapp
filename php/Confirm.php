<?php
/* require the user as the parameter */
{

  /* connect to the db */
  $link = mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!") or die('Cannot connect to the DB');
  mysql_select_db('websysS143',$link) or die('Cannot select the DB');
   
$MYID1 = $_POST[MYID1];
$MYID2 = $_POST[MYID2];
$TIME = $_POST[TIME];



 $format =  'json';

  
  /* grab the friends from the db */
  $query1 = "(SELECT MYID1, MYID2 FROM FRIEND
           WHERE MYID1 = '$MYID1' 
           ORDER BY TIME)
               UNION 
           (SELECT MYID2 , MYID1 
           FROM FRIEND
           WHERE MYID2 = '$MYID1' 
           ORDER BY TIME); "; 
           
           
  $result1 = mysql_query($query1,$link) or die('Errant query:  '.$query1);
  
  /* If its not present insert it */
  if(mysql_num_rows($result1)) 
  {
    
  /* If its already present in the database retrive it to load page7 */

$query = "SELECT * FROM SHAKEHANDS WHERE PHONENUMBER = '$MYID2'";

$result = mysql_query($query,$link) or die('Errant query:  '.$query);


/* create one master array of the records */

  if(mysql_num_rows($result)==1) {
  $post = mysql_fetch_assoc($result); 
  $status = 1;
  $arr = array('status' => 1, 'PHONE'=> $post['PHONENUMBER'],'FNAME'=> $post['FNAME'],'LNAME' => $post['LNAME'], 'EMAIL' => $post['EMAIL'], 'FACEBOOK' => $post['FACEBOOK'], 'PHOTO' => $post['PHOTO'], 'TWITTER' => $post['TWITTER'] , 'LINKEDIN' => $post['LINKEDIN'] , 'INSTAGRAM' => $post['INSTAGRAM'] ,'Bio' => $post['BIO']);
  }



  }
  else
  {
  $query2 ="INSERT INTO FRIEND(MYID1, MYID2, TIME) VALUES ('$MYID1','$MYID2','$TIME')" ;
  
  $result2 = mysql_query($query2,$link) or die('Errant query:  '.$query2);
  
     /* If its inserted successfully , retrive the details of the new friend to load the page 7 */
  
       	  if(mysql_num_rows($result2)==0) 
			{
    
  
$query = "SELECT * FROM SHAKEHANDS WHERE PHONENUMBER = '$MYID2'";

$result = mysql_query($query,$link) or die('Errant query:  '.$query);


/* create one master array of the records */

  if(mysql_num_rows($result)==1) {
  $post = mysql_fetch_assoc($result); 
  $status = 1;
  $arr = array('status' => 1, 'PHONE'=> $post['PHONENUMBER'],'FNAME'=> $post['FNAME'],'LNAME' => $post['LNAME'], 'EMAIL' => $post['EMAIL'], 'FACEBOOK' => $post['FACEBOOK'], 'PHOTO' => $post['PHOTO'], 'TWITTER' => $post['TWITTER'] , 'LINKEDIN' => $post['LINKEDIN'] , 'INSTAGRAM' => $post['INSTAGRAM'] ,'Bio' => $post['BIO']);
         }


      }
  
  
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
  
}
?>
