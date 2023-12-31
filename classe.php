<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

function readCSV($fileName) {
    $rows = [];
    if (($handle = fopen($fileName, "r")) !== FALSE) {
        $headers = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== FALSE) {
            $rows[] = array_combine($headers, $data);
        }
        fclose($handle);
    }
    return $rows;
}

function writeCSV($fileName, $data) {
    if (($handle = fopen($fileName, "w")) !== FALSE) {
        fputcsv($handle, array_keys($data[0]));

        foreach ($data as $row) {
            fputcsv($handle, $row);
        }

        fclose($handle);
        return true;
    } else {
        return false;
    }
}

$requestMethod = $_SERVER['REQUEST_METHOD'];
$uriSegments = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
$classId = $uriSegments[3] ?? null;

if ($requestMethod == 'GET') {
    if ($classId === null) {
        echo json_encode(readCSV('class.csv'));
    } else {
        $class = getRecordById('class.csv', $classId);
        if ($class !== null) {
            echo json_encode($class);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Class not found']);
        }
    }
}
if ($requestMethod == 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    if (
        isset($postData['name']) &&
        isset($postData['level'])
    ) {
        $data = readCSV('class.csv');
        $lastId = end($data)['id'] ?? 0;
        $newId = $lastId + 1;
        $newClasse = [
            'id' => $newId,
            'name' => $postData['name'],
            'level' => $postData['level']
        ];
        $data[] = $newClasse;
        writeCSV('class.csv', $data);

        http_response_code(201);
        echo json_encode(['message' => 'Classe créée avec succès']);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Données POST invalides']);
    }
}

if ($requestMethod == 'PATCH') {
    $patchData = json_decode(file_get_contents("php://input"), true);
    $classId = $uriSegments[3] ?? null;

    if ($classId !== null) {
        $class = getRecordById('class.csv', $classId);
        if ($class !== null) {
            foreach ($patchData as $key => $value) {
                if (isset($class[$key])) {
                    $class[$key] = $value;
                }
            }

            $data = readCSV('class.csv');
            foreach ($data as $index => $row) {
                if ($row['id'] == $classId) {
                    $data[$index] = $class;
                    break;
                }
            }
            writeCSV('class.csv', $data);

            http_response_code(200);
            echo json_encode(['message' => 'Classe mise à jour avec succès']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Class not found']);
        }
    }
}

if ($requestMethod == 'PUT') {
    $putData = json_decode(file_get_contents("php://input"), true);
    $classId = $uriSegments[3] ?? null;

    if ($classId !== null) {
        $class = getRecordById('class.csv', $classId);
        if ($class !== null) {
            $class = $putData;

            $data = readCSV('class.csv');
            foreach ($data as $index => $row) {
                if ($row['id'] == $classId) {
                    $data[$index] = $class;
                    break;
                }
            }
            writeCSV('class.csv', $data);

            http_response_code(200);
            echo json_encode(['message' => 'Classe mis à jour avec succès']);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Class not found']);
        }
    }
}

function getRecordById($fileName, $id) {
    if (($handle = fopen($fileName, "r")) !== FALSE) {
        $headers = fgetcsv($handle);
        while (($data = fgetcsv($handle)) !== FALSE) {
            if ($data[0] == $id) {
                return array_combine($headers, $data);
            }
        }
        fclose($handle);
    }
    return null;
}
?>