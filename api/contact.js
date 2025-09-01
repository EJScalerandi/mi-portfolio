// /api/contact.js (Node 18+ en Vercel)
import nodemailer from "nodemailer";
import "dotenv/config";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, message, hp } = req.body || {};

    // Honeypot anti-spam
    if (hp) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Faltan campos" });
    }

    // Valida email básico
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      return res.status(400).json({ ok: false, error: "Email inválido" });
    }

    // Transport Gmail con App Password (recomendado)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER, // tu gmail
        pass: process.env.SMTP_PASS, // app password
      },
    });

    const to = process.env.MAIL_TO || process.env.SMTP_USER;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to,
      subject: `Nuevo contacto: ${name} <${email}>`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo contacto desde tu portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap;font-family:system-ui,Segoe UI,Roboto">${message}</pre>
      `,
      replyTo: email, // para que puedas responder directo desde Gmail
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ ok: false, error: "No se pudo enviar" });
  }
}
