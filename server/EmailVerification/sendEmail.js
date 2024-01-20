const nodemailer = require("nodemailer");
require('dotenv').config();

const userEmail=process.env.EmailAuthUser;
const userPassword=process.env.EmailAuthPassword;
class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: userEmail,
        pass: userPassword,
      },
    });
  }

  async sendEmail(email, subject, text) {
    try {
      await this.transporter.sendMail({
        from: userEmail,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      return error;
    }
  }
}

module.exports = EmailSender;
