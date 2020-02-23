<?php

if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
    die('Method is not allowed');
}
$token = '1059409727:AAHbI15EDh9zKngL_w7caUU6UR5Tb7gr6fc';
$chatId = "-1001487811544";

if (isset($_POST['name'])
    && isset($_POST['phone'])
    && isset($_POST['email'])){
    $message = 'На сайте заполнена форма:' . PHP_EOL;
    $message .= 'Имя: ' . $_POST['name'] . PHP_EOL;
    $message .= 'Телефон: ' . $_POST['phone'] . PHP_EOL;
    $message .= 'E-mail: ' . $_POST['email'] . PHP_EOL;
    $message .= 'Компания: ' . $_POST['company'];

	$url = 'https://api.telegram.org/bot' . $token . '/sendMessage?chat_id=' . $chatId;
	$url .= '&parse_mode=html&text=' . urlencode($message);
	$ch = curl_init();
	$optArray = [
		CURLOPT_URL => $url,
		CURLOPT_RETURNTRANSFER => true
	];
	curl_setopt_array($ch, $optArray);
	$result = curl_exec($ch);
	curl_close($ch);
	echo $result;
}
