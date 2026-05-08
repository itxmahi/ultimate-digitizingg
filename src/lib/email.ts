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
