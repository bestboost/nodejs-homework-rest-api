import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const msg =
  // (data) =>
  {
    to: "nahelo2910@lanxi8.com",
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    from: SENDGRID_EMAIL_FROM,
    //   const email = { ...data, from: SENDGRID_EMAIL_FROM };
    //   return email;
  };
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

export default sgMail;
