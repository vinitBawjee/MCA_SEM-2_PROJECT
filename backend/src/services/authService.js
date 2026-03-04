import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";

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
      role,
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
        $or: [{ email: identifier }, { mobile: identifier }],
      });
    } 
    else if (role === "seller" || role === "admin") {
      user = await Seller.findOne({
        $or: [{ email: identifier }, { mobile: identifier }],
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
  
    // if (user.isBlocked) {
    //   throw { 
    //     status: 403, 
    //     message: "Your account is blocked by admin" 
    //   };
    // }
  
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
        role: user.role,
      },
      token,
    };
  }
}

export default new AuthService();