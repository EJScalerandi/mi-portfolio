// send-test.js
import "dotenv/config";
import nodemailer from "nodemailer";

function assertEnv(name) {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Falta variable ${name}. ¿Está en .env y sin comillas/espacios?`);
  }
  return v;
}

(async () => {
  try {
    const SMTP_USER = assertEnv("SMTP_USER");
    const SMTP_PASS = assertEnv("SMTP_PASS");
    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
    const MAIL_TO   = process.env.MAIL_TO || SMTP_USER;

    console.log("ENV OK →",
      { SMTP_USER, SMTP_PASS_len: SMTP_PASS.length, SMTP_HOST, SMTP_PORT, MAIL_TO });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${SMTP_USER}>`,
      to: MAIL_TO,
      subject: "Prueba de contacto desde Node",
      text: "Hola Esteban! Este es un test de tu portfolio 🚀",
    });

    console.log("Mensaje enviado:", info.messageId);
  } catch (err) {
    console.error("ERROR:", err);
  }
})();
