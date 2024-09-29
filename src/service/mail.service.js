import transporter from '../config/email.config';

const mailService = {
    async sendEmail({emailFrom, emailTo, emailSubject, emailText}) {
        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            text: emailText,
        });
    },
};

Object.freeze(mailService);

export default mailService;