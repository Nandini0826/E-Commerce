const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const ownerModel = require("../models/owners-model");
const { generateToken } = require("../utils/generatetoken");



    router.post("/adminregister", async function(req, res)
    {
        try {
            const { email, password, fullname } = req.body;
        
            // Check for existing user
            const existingAdmin = await ownerModel.findOne({ email });
            if (existingAdmin) {
              return res.status(400).json({ error: "Admin already exists" });
            }
            bcrypt.genSalt(10, function (err, salt) {
              if (err) return res.send(err.message);
              bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                  let admin = await ownerModel.create({
                    fullname,
                    email,
                    password: hash,
                  });
                  let token = generateToken(admin);
                  res.cookie("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "lax",
                  });
                  // Success response
                  res.status(201).json({ message: "Admin created", admin});
                }
              });
            });
          } catch (err) {
            console.log("Backend error:", err);
            res.status(500).json({ error: err.message || "Registration failed" });
          }
        
    });


router.post("/adminlogin", async function(req, res)
{
    try {
        const { email, password } = req.body;
        const admin = await ownerModel.findOne({ email });
    
        if (!admin) {
          return res.status(401).json({ error: "Email or password incorrect" });
        }
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          return res.status(401).json({ error: "Email or password incorrect" });
        }
    
        // Generate token
        const token = generateToken(admin);
    
        // Set cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
    
        // Success response
        res.json({ message: "Logged in successfully" });
      } catch (err) {
        console.log("Login error:", err);
        res.status(500).json({ error: "Login failed" });
      }
})

router.post("/logout", async function (req, res) {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});




module.exports = router;