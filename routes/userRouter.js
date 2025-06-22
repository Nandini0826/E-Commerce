const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin")
const {registerUser, loginUser, logout,authenticateToken, wishlist, cart,  getcart, updateCart, getwishlist} = require("../controllers/authcontroller")


router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logoutuser",logout);
router.post("/wishlist", authenticateToken, wishlist);
router.post("/cart", authenticateToken, cart);
router.get("/getcart", authenticateToken, getcart);
router.get("/getwishlist", authenticateToken, getwishlist);
router.put("/updatecart", authenticateToken, updateCart);

module.exports = router;