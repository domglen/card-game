<?php 
	if( $_REQUEST["dir"] ) {

		$dir = $_REQUEST['dir'];
		//$imgs = "";
		$files = array_filter(scandir('./images/'.$dir), function($item) {
                    return !is_dir('./images/'.$dir . '/' . $item);
                });
		if ($files) {
			echo json_encode($files); //as $filename){
                //$filename = basename($filename);
                //if (preg_match('/\.(jpg|png|gif)$/i', $filename)) {
                        //echo "<div id='thumbnail'>";
                //        $imgs .= "<img src='" . $filename . "''/>";
                        //echo "</div>";
                //}
                        } else {
                                echo "nothing in folder";
                        }
            }
?> 