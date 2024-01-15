const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			port:  465,
			secure: false,
			logger: true,
			debug: true,
			secureConnection:false,
			auth: {
				user: "kevintj916@gmail.com",
				pass: "oyrc dfsh mcsy akzn",
			},
		});

		await transporter.sendMail({
			from: "kevintj916@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		// console.log("email not sent!");
		console.log(error);
		return error;
	}
};