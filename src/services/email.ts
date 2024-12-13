import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (email: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Urban Homes',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your One-Time Password</h2>
          <p>Here is your OTP for Urban Homes verification:</p>
          <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    return false;
  }
};