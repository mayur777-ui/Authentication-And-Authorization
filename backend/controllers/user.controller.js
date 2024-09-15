import express from 'express';
import "dotenv/config";
import User from '../models/db.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if(!email || !password || !role){
      return res.status(400).json({
        message: "Please fill all the fields",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "User logged in successfully",
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user
export const logout = (req, res) => {
  res.clearCookie('token'); 
  res.status(200).json({ message: "Logged out successfully" });
};
