import app from "./app";
import { transporter } from "./src/config/mailer";
const PORT = 5000;

transporter
  .sendMail({
    from: `"CryptoTrucker" <${process.env.EMAIL_USER}>`,
    to: "vitalik_dd@ukr.net",
    subject: "Verification code",
    text: "Hello world",
    html: "<b>Your code is 7459123</b>",
  })
  .then(() => console.log("all is send"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
