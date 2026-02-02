"use server";

import { Resend } from "resend";
import { ContactSchema } from "@/lib/contact-validation";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: unknown) {
  const result = ContactSchema.safeParse(data);
  if (!result.success) {
    return { error: "Los datos enviados son inválidos." };
  }

  const { name, email, phone, message } = result.data;

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: "Muebles Maldonado <onboarding@resend.dev>",
      to: ["mueblesmaldonadoec@gmail.com"],
      subject: `Nueva Consulta: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb;">
          
          <div style="padding: 25px; border-bottom: 2px solid #4A3728;">
            <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; color: #4A3728;">
              Muebles Maldonado
            </h1>
            <p style="margin: 0; font-size: 12px; color: #6b7280;">Notificación de Formulario de Contacto</p>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 14px; margin-bottom: 25px;">Se ha recibido una nueva solicitud de información con los siguientes detalles:</p>
            
            <table width="100%" style="border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 100px;">Cliente:</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">Teléfono:</td>
                <td style="padding: 8px 0;">${phone || "No proporcionado"}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 20px; background-color: #fafaf9; border-radius: 4px;">
              <p style="margin-top: 0; font-size: 12px; font-weight: bold; color: #4A3728; text-transform: uppercase;">Mensaje:</p>
              <p style="margin-bottom: 0; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; border-radius: 2px;">
                RESPONDER AL CLIENTE
              </a>
            </div>
          </div>

          <div style="padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af;">
            Este correo fue enviado automáticamente desde el sitio web de Muebles Maldonado.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error oficial de Resend:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (e) {
    console.error("Error inesperado:", e);
    return { error: "Error de conexión" };
  }
}
