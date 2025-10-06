const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // you can use any email service
  auth: {
    user: "abhalbenny3@gmail.com",      // your Gmail
    pass: "bymv dsre abzu efob",         // app password if using Gmail
  },
});

// function to send OTP
const sendOtp = async (toEmail, otp) => {
  const mailOptions = {
    from: "dazton.com",
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

const sendEmail = async (toEmail, password) => {
  const mailOptions = {
    from: "dazton.com",
    to: toEmail,
    subject: "New Account Created",
    text: `Email: ${toEmail}\nPassword: ${password}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};


const sendToMultiple = async (emails, subject, text) => {
  const mailOptions = {
    from: "dazton.com",
    to: emails.join(', '), // join array into comma-separated string
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Bulk email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending bulk email:", error);
    return false;
  }
};
module.exports = { sendOtp, sendEmail, sendToMultiple };

