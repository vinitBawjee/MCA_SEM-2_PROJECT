import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import sendEmail from "../utils/sendEmail.js";

const otpStore = {};

class AuthService {

  async registerUser(data) {

    const { name, email, mobile, password, role } = data;

    if (!name || !email || !mobile || !password || !role) {
      throw new Error("All fields are required");
    }

    if (role !== "buyer" && role !== "seller") {
      throw new Error("Invalid role selected");
    }

    const Model = role === "buyer" ? Buyer : Seller;

    const existingEmail = await Model.findOne({ email });
    if (existingEmail) {
      throw new Error("Email already registered");
    }

    const existingMobile = await Model.findOne({ mobile });
    if (existingMobile) {
      throw new Error("Mobile already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Model.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role
    });

    return user;
  }

  async loginUser(data) {

    const { identifier, password, role } = data;

    if (!identifier || !password || !role) {
      throw { status: 400, message: "All fields are required" };
    }

    let user;

    if (role === "buyer") {
      user = await Buyer.findOne({
        $or: [{ email: identifier }, { mobile: identifier }]
      });
    } 
    else if (role === "seller" || role === "admin") {
      user = await Seller.findOne({
        $or: [{ email: identifier }, { mobile: identifier }]
      });
    } 
    else {
      throw { status: 400, message: "Invalid role selected" };
    }

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    if (user.role !== role) {
      throw { status: 403, message: "Access denied for this role" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      },
      token
    };
  }

  async sendOtp(data) {

    const { identifier, role } = data;

    if (!identifier || !role) {
      throw new Error("Identifier and role are required");
    }

    const key = identifier + "_" + role;

    let user;

    if (role === "buyer") {
      user = await Buyer.findOne({
        $or: [{ email: identifier }, { mobile: identifier }]
      });
    } else {
      user = await Seller.findOne({
        $or: [{ email: identifier }, { mobile: identifier }]
      });
    }

    if (!user) {
      throw new Error("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[key] = otp;

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Hello ${user.name},

Your OTP for password reset is:

${otp}

Do not share this OTP with anyone.`
    });

    return { message: "OTP sent to your email" };
  }

  async verifyOtp(data) {

    const { identifier, otp, role } = data;

    const key = identifier + "_" + role;

    const savedOtp = otpStore[key];

    if (!savedOtp) {
      throw new Error("OTP expired");
    }

    if (savedOtp != otp) {
      throw new Error("Invalid OTP");
    }

    return { message: "OTP verified" };
  }

  async resetPassword(data) {

    const { identifier, password, role } = data;

    const key = identifier + "_" + role;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "buyer") {

      await Buyer.updateOne(
        { $or: [{ email: identifier }, { mobile: identifier }] },
        { password: hashedPassword }
      );

    } else {

      await Seller.updateOne(
        { $or: [{ email: identifier }, { mobile: identifier }] },
        { password: hashedPassword }
      );

    }

    delete otpStore[key];

    return { message: "Password reset successful" };
  }
}

export default new AuthService();