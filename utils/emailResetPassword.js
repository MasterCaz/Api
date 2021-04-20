const nodemailer = require('nodemailer');

//Host y credencial del SMTP
const SERVIDOR_SMTP = 'smtp.office365.com';
const USUARIO_SMTP = 'javier.cazarez18@utim.edu.mx';
const PASSWORD_SMTP = 'Cazarez117';

exports.emailResetPassword = async (nombre, email, token) => {
  try {
    //usar nodemailer
    let transporter = nodemailer.createTransport({
      host: SERVIDOR_SMTP,
      port: 587,
      secure: false,
      auth:{
        user: USUARIO_SMTP,
        pass: PASSWORD_SMTP,
      },
    });

    let mensaje = `Hola, ${nombre}<br>`;
    mensaje += 'Has solicitado restaurar tu contraseña';
    mensaje += `<a href = "http://localhost:3000/restablecer-contrasena/${token}">Haz clic aqui</a>.<br>`;
    mensaje += `El enlace es valido solo por una hora desde su envio`;

    let info = await transporter.sendMail({
      from: `Uitsmetl<${USUARIO_SMTP}>`,
      to: `${nombre}<${email}>`,
      subject: "Recuperación de contraseña",
      html: mensaje,
    });
    console.log("Message sent: %s", info.messageId);
    return true;

  } catch (error) {
    console.log(error)
    return false;
  }
};