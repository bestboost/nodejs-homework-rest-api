import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;

const sendEmail = (data) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const email = { ...data, from: SENDGRID_EMAIL_FROM };

  sgMail
    .send(email)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendEmail;
