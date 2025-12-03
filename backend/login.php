<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// 1️⃣ Recibir datos del login
$data = json_decode(file_get_contents("php://input"));
$email = $data->email ?? '';
$password = $data->password ?? '';

// Validar datos
if (!$email || !$password) {
    echo json_encode(["status" => "error", "message" => "Campos incompletos"]);
    exit;
}

// 2️⃣ Conectar a la base de datos
$conn = new mysqli("localhost", "root", "", "biblioteca");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error de conexión"]);
    exit;
}

// 3️⃣ Buscar usuario
$sql = "SELECT id, name, email, password FROM users WHERE email='$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
    exit;
}

$user = $result->fetch_assoc();

// 4️⃣ Verificar contraseña
if (!password_verify($password, $user["password"])) {
    echo json_encode(["status" => "error", "message" => "Contraseña incorrecta"]);
    exit;
}

// 5️⃣ Crear token JWT simple (sin librerías)
$header = base64_encode(json_encode(["alg" => "HS256", "typ" => "JWT"]));
$payload = base64_encode(json_encode([
    "id" => $user["id"],
    "name" => $user["name"],
    "email" => $user["email"],
    "exp" => time() + (60 * 60 * 24) // Token válido por 24h
]));

$secret_key = "CLAVE_SECRETA_123"; // 🔐 CAMBIA ESTA CLAVE

$signature = hash_hmac("sha256", "$header.$payload", $secret_key, true);
$signature = base64_encode($signature);

// Token final
$token = "$header.$payload.$signature";

// 6️⃣ Respuesta final
echo json_encode([
    "status" => "success",
    "message" => "Login exitoso",
    "token" => $token,
    "user" => [
        "id" => $user["id"],
        "name" => $user["name"],
        "email" => $user["email"]
    ]
]);
?>
