<?php

$entityBody = file_get_contents('php://input');

$entityBody = json_decode($entityBody, true);

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    if (!empty($entityBody['name']) &&
        !empty($entityBody['email']) &&
        !empty($entityBody['phone']) &&
        !empty($entityBody['message'])) {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host = 'ssl://smtp.mail.ru';                     //Set the SMTP server to send through
            $mail->SMTPAuth = true;                                   //Enable SMTP authentication
            $mail->Username = 'info@moicode.ru';                     //SMTP username
            $mail->Password = 'Dba8LwQzQmde7ryM8Wc3';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            $mail->CharSet = 'UTF-8';

            //Recipients
            $mail->setFrom('info@moicode.ru', 'Мой Код');
            $mail->addAddress('info@moicode.ru', 'Мой Код');     //Add a recipient

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Письмо клиента!';
            $mail->Body = '<ul>
                                <li><strong>Имя клиента: </strong>' . $entityBody['name'] . '</li>
                                <li><strong>Email клиента: </strong>' . $entityBody['email'] . '</li>
                                <li><strong>Телефон клиента: </strong>' . $entityBody['phone'] . '</li>
                                <li><strong>Соообщение клиента: </strong>' . $entityBody['message'] . '</li>
                            </ul>';

            $mail->Debugoutput = function () { };
            $mail->send();
            echo json_encode(["status" => 200]);
    } else {
        echo json_encode(["status" => 400]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => 400, "error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}