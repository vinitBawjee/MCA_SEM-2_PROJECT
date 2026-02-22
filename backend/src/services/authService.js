import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generatePassword from "../utils/generatePassword.js";
import transporter from "../config/mailer.js";

class AuthService {
  async registerUser(data) {
    const { name, email, mobile } = data;

    const existing = await User.findOne({ email });
    if (existing) throw new Error("User already exists");

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

      await transporter.sendMail({
        from: '"Auction App" <bawjee0@gmail.com>',
        to: email,
        subject: "Your Account Password",
        text: `Your password is: ${plainPassword}`,
      });

      const user = await User.create({
        name,
        email,
        mobile,
        password: hashedPassword,
      });

      return user;
  
  }
}

export default new AuthService();