<?php
/* require the user as the parameter */
{

  /* connect to the db */
  $link = mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!") or die('Cannot connect to the DB');
  mysql_select_db('websysS143',$link) or die('Cannot select the DB');
  $ID = $_POST['user'];
  $format =  'json';
  
  
  
  /* grab the posts from the db */
  $query1 = "(SELECT MYID1 AS MY, MYID2 AS OTHERS,FNAME AS NAME, EMAIL,time
           FROM REQUESTS, USERS
           WHERE MYID1 = '$ID' AND MYID1_STATUS = 0 AND ID = MYID2
           ORDER BY time)
               UNION 
           (SELECT MYID2 AS MY, MYID1 AS OTHERS ,FNAME AS NAME, EMAIL, time 
           FROM REQUESTS,USERS
           WHERE MYID2 = '$ID' AND MYID2_STATUS = 0 AND ID = MYID1
           ORDER BY time); "; 
           
           
  $result = mysql_query($query1,$link) or die('Errant query:  '.$query1);
  /*$result2 = mysql_query($query1,$link) or die('Errant query:  '.$query2);*/
   
 /* create one master array of the records */
  $requests = array();
  if(mysql_num_rows($result)) {
    while($request = mysql_fetch_assoc($result)) {
      $requests[] = array('request'=>$request);
    }
  }



  /* output in necessary format */
  if($format == 'json') {
    header('Content-type: application/json');
    echo json_encode(array('requests'=>$requests));
  }
  else {
    header('Content-type: text/xml');
    echo '<posts>';
    foreach($posts as $index => $post) {
      if(is_array($post)) {
        foreach($post as $key => $value) {
          echo '<',$key,'>';
          if(is_array($value)) {
            foreach($value as $tag => $val) {
              echo '<',$tag,'>',htmlentities($val),'</',$tag,'>';
            }
          }
          echo '</',$key,'>';
        }
      }
    }
    echo '</posts>';
  }
  
    /* disconnect from the db */
  @mysql_close($link);
  
}
?>
