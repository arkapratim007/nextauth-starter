import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //random token (32 bytes = 64 characters)
    const rawToken = crypto.randomBytes(32).toString("hex");
    
    let updateQuery = {};

    if (emailType === "VERIFY") {
      updateQuery = {
        verifyToken: rawToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000),
      };
    } else if (emailType === "RESET") {
      updateQuery = {
        forgotPasswordToken: rawToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
      };
    }
    await User.findByIdAndUpdate(userId, updateQuery);

    const urlPath = emailType === "VERIFY" ? "/verifyemail" : "/resetpassword";
    const actionUrl = `${process.env.DOMAIN}${urlPath}?token=${rawToken}`;
    const actionText = emailType === "VERIFY" ? "Verify your email" : "Reset your password";
    const title = emailType === "VERIFY" ? "Welcome! Please Verify Your Email" : "Password Reset Request";

 //html template for the email
    const mailOptions = {
      from: '"Auth App" <noreply@authapp.com>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email address" : "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">${title}</h2>
          <p style="color: #555; font-size: 16px;">
            Please click the button below to ${actionText.toLowerCase()}. This link is valid for 1 hour.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${actionUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              ${actionText}
            </a>
          </div>
          <p style="color: #777; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #4F46E5; font-size: 12px; word-break: break-all;">${actionUrl}</p>
        </div>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    console.log("Email sent successfully. Preview URL: %s", nodemailer.getTestMessageUrl(mailResponse));

    return mailResponse;

  } catch (error: any) {
    console.error("Mailer Error:", error);
    throw new Error(error.message);
  }
};