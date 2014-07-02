<?php

$link=mysql_connect("websys3.stern.nyu.edu","websysS143","websysS143!!")or die('Cannot connect to the DB');
mysql_select_db("websysS143",$link) or die('Cannot select the DB');

// Get values from form 
$FNAME = $_POST['REG_FNAME'];
$LNAME = $_POST['REG_LNAME'];
$EMAIL = $_POST['REG_EMAIL'];
$PHONENUMBER = $_POST['REG_PHONENUMBER'];
$PASSWORD = $_POST['REG_PASSWORD'];
$format =  'json';

//inserting data order
$order = "INSERT INTO SHAKEHANDS
	   (FNAME, LNAME, EMAIL, PHONENUMBER, PASSWORD)
	  VALUES
	   ('$FNAME', '$LNAME', '$EMAIL', '$PHONENUMBER', '$PASSWORD')";

//declare in the order variable
$result = mysql_query($order,$link) or die('Errant query:  '.$query);	//order executes
$query = "SELECT PHONENUMBER FROM SHAKEHANDS WHERE PHONENUMBER = '$PHONENUMBER'";
$query_run = mysql_query($query,$link) or die('Errant query:  '.$query);



if($result)
{
//$response["status"] = "1";
//$response["PHONENUMBER"] = $PHONENUMBER;
$status = 1;
$arr = array('status' => 1,'PHONENUMBER'=> $PHONENUMBER);
header('Content-type: application/json');
echo json_encode($arr);
//echo json_encode($response);
 
}

elseif(mysql_num_rows($query_run)==1){
$status = 0;
$arr = array('status' => "0",'PHONENUMBER'=> $PHONENUMBER);
header('Content-type: application/json');
echo json_encode($arr);
}

else
{
$status = 3;
$arr = array('status' => "3",'PHONENUMBER'=> $PHONENUMBER);
header('Content-type: application/json');
echo json_encode($arr);
}


@mysql_close($link);

?>

