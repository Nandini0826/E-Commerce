const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    console.log('Auth Middleware hit');

    const authHeader = req.headers.authorization || '';
const token = authHeader.startsWith('Bearer ') 
  ? authHeader.split(' ')[1] 
  : authHeader;
   console.log('Extracted Token:', token);
    if(!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try{
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded token:', decoded);

    const user = await userModel.findById( decoded.userId).select("-password");
        if (!user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(401).json({ error: "User not found" });
    }
        req.user = user;
        next();

    }
    catch(err) {
        console.error('JWT Error:', err.message);
    res.status(401).json({ 
      error: "Invalid token",
      details: err.message 
    }); 
    }
}