const nodemailer = require('nodemailer');

async function enviarCorreo(destinatario, asunto, mensajeHTML) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // tu correo
      pass: process.env.EMAIL_PASSWORD    // tu contraseña o app password
    }
  });

  const mailOptions = {
    from: `"Voz Ciudadana" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: asunto,
    html: mensajeHTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Correo enviado a:', destinatario);
  } catch (error) {
    console.error('❌ Error al enviar correo:', error);
    throw error;
  }
}

module.exports = enviarCorreo;
