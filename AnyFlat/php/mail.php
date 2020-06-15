<?php

if ($_SERVER["REQUEST_METHOD"] !== 'POST') {
    die('Method is not allowed');
}
$token = '1236150874:AAF0649XkaC9QYT-ZndGj6FKpe4sZ0vofaI';
$chatId = "858300823";

if (isset($_POST['name'])
    && isset($_POST['phone'])){
    $message = 'На сайте заполнена форма:' . PHP_EOL;
    $message .= 'Имя: ' . $_POST['name'] . PHP_EOL;
    $message .= 'Телефон: ' . $_POST['phone'] . PHP_EOL;
    $message .= 'Первоначальный взнос: ' . $_POST['minSum'] . PHP_EOL;
    $message .= 'Стоимость авто: ' . $_POST['carSum'];
    $message .= 'Период: ' . $_POST['monthNubmer'];
    $message .= 'Период: ' . $_POST['week'];
    $message .= 'Период: ' . $_POST['month'];

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
