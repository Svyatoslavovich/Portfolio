<?php
/**
 * Created by PhpStorm.
 * User: sviatoslav
 * Date: 17.04.17
 * Time: 15:06
 */

$name = $_POST['projectName'];

$data = array();

if ($name === '') {
    $data['status'] = 'error';
    $data['text'] = 'Заполните имя!';
} else {
    $data['status'] = 'success';
    $data['text'] = 'Имя заполнено!';
}

header("Content-Type: application/json");

echo json_encode($data);

exit;