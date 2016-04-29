
<?php header("Content-Type: text/html; charset=utf-8");
// <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
$servername = "127.0.0.1:3306";
$username = "root";
$password = "";
$dbname = "ukrurbat_main";


$mongo = new Mongo(); // соединяемся с сервером
      $db = $mongo->ukrurbat;
      $collection = 'posts_test';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
 
$sql =  "SELECT * FROM `os0fr_ucm_content` LIMIT 3";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
	$count = 0;
    while($row = $result->fetch_assoc()) {
    	// $collection->insert(
			
  				   		 $data =	array('id'      =>    $count++,
						  	//   'ref_id'     	=>    $row['ref_id'],
						  	//   'title'     	=>    $row['title'],
						  	//   'fulltext'   	=>    $row['fulltext'],
						  	//   'url'	   		=>	  $row['url'],
						  	//   'created'     =>    $row['created'],
							//   'modified'	=>    $row['modified'],
						  	//   'image_url'   =>    $row['image_url'],
						  	//   'params'     	=>    $row['params'],
						  	  'message'     =>    $row['message']);	

        echo "id: "  .$data. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>
