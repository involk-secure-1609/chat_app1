const nodemailer = require("nodemailer");

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
        user: "kevintj916@gmail.com",
        pass: "oyrc dfsh mcsy akzn",
      },
    });
  }

  async sendEmail(email, subject, text) {
    try {
      await this.transporter.sendMail({
        from: "kevintj916@gmail.com",
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
