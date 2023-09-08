const nodemailer = require("nodemailer");

const sendEmail = async (email, html) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Cuahangdientu" <no-reply@cuahangdientu.com>`,
        to: email,
        subject: "Quên mật khẩu",
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;
