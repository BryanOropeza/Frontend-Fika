<?php
// Recibir los datos del formulario
$destinatario = $_POST['email']; // La dirección de correo ingresada en el formulario
$asunto = "Confirmación de reserva"; // Asunto del correo
$mensaje = "Tipo de tratamiento: " . $_POST['tratamiento'] . "\n"; // Obtener el tipo de tratamiento desde el formulario
$mensaje .= "¡Tu reserva ha sido confirmada! Gracias por elegirnos."; // Mensaje de confirmación de reserva

// Enviar el correo electrónico
if (mail($destinatario, $asunto, $mensaje)) {
    echo json_encode(["success" => true, "message" => "Correo enviado con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al enviar el correo"]);
}
?>