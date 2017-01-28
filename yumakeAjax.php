<?php
header("Access-Control-Allow-Origin: *");
$code = $_POST['code'];
$key = $_POST['key'];
$type = $_POST['type'];
$url = "http://api.yumake.jp/1.1/forecastPref.php?code={$code}&key={$key}&format={$format}";
$html = file_get_contents($url);
echo json_encode($html);
exit();
