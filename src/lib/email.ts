import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmation = async (email: string, orderId: string, productName: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - Ultimate Digitizing #${orderId}`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order for <strong>${productName}</strong> has been confirmed.</p>
      <p>Order ID: <strong>#${orderId}</strong></p>
      <p>The stitch file will be delivered to your email shortly.</p>
      <br/>
      <p>Best regards,<br/>Ultimate Digitizing Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};
export const sendCustomStitchEmail = async (data: {
  email: string,
  description: string,
  stitchType: string,
  fabricType: string,
  size: string,
  image?: { filename: string, content: Buffer }
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "swdevil290@gmail.com",
    subject: `NEW CUSTOM STITCH PROTOCOL - ${data.email}`,
    html: `
      <div style="font-family: sans-serif; background: #020617; color: white; padding: 40px; border-radius: 20px;">
        <h1 style="color: #3b82f6; font-style: italic;">ULTIMATE DIGITIZING REQUEST</h1>
        <p style="color: #64748b; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Technical Specification Protocol</p>
        <hr style="border: 1px solid #1e293b; margin: 20px 0;">
        <div style="margin-bottom: 20px;">
          <strong style="color: #3b82f6;">CLIENT EMAIL:</strong> ${data.email}
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #3b82f6;">STITCH TYPE:</strong> ${data.stitchType}
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #3b82f6;">FABRIC TYPE:</strong> ${data.fabricType}
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #3b82f6;">DIMENSIONS:</strong> ${data.size}
        </div>
        <div style="margin-bottom: 20px;">
          <strong style="color: #3b82f6;">SPECIFICATIONS:</strong>
          <p style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;">${data.description}</p>
        </div>
        <p style="color: #64748b; font-size: 10px; margin-top: 40px;">AUTOMATED DEPLOYMENT SYSTEM</p>
      </div>
    `,
    attachments: data.image ? [
      {
        filename: data.image.filename,
        content: data.image.content
      }
    ] : []
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
};
