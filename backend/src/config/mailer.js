import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bawjee0@gmail.com",
    pass: "zlsnmkyvmyhfkhxr",
  },
});

export default transporter;