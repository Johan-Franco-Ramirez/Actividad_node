<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// 1️⃣ Recibir datos del frontend
$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$email = $data->email ?? '';
$password = $data->password ?? '';

// 2️⃣ Validar datos
if (!$name || !$email || !$password) {
    echo json_encode([
        "success" => false,
        "message" => "Todos los campos son obligatorios"
    ]);
    exit;
}

// 3️⃣ Conectar a la base de datos
$conn = new mysqli("localhost", "root", "", "biblioteca");

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a la base de datos"
    ]);
    exit;
}

// 4️⃣ Verificar si el correo ya existe
$sql = $conn->prepare("SELECT id FROM users WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "El correo ya está registrado"
    ]);
    exit;
}

// 5️⃣ Encriptar contraseña
$hashedPass = password_hash($password, PASSWORD_BCRYPT);

// 6️⃣ Insertar usuario
$insert = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$insert->bind_param("sss", $name, $email, $hashedPass);

if ($insert->execute()) {

    // 7️⃣ Crear token para sesión
    $token = bin2hex(random_bytes(20));

    echo json_encode([
        "success" => true,
        "message" => "Usuario registrado correctamente",
        "token" => $token,
        "user" => [
            "id" => $insert->insert_id,
            "name" => $name,
            "email" => $email
        ]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al registrar usuario"
    ]);
}
?>
