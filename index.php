<?php
$requestMethod = $_SERVER['REQUEST_METHOD'];
$uri = trim($_SERVER['REQUEST_URI'], '/');
$uriSegments = explode('/', $uri);

$resource = $uriSegments[2] ?? null;

switch ($resource) {
    case 'classe': 
        require 'classe.php';
        break;
    case 'student':
        require 'student.php';
        break;
    default:
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Resource not found']);
        break;
}
?>