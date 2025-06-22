const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin")
const userModel = require("../models/user-model")
const productModel = require("../models/product-model")


router.get("/", function(req, res){
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
});

router.get("/cart", isLoggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email}).populate("cart");
    console.log("User Cart:", user.cart);
    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);


    res.render("cart", {user, bill});
});
router.get("/addtocart/:id", isLoggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email});
    console.log("Before adding:", user.cart);
user.cart.push(req.params.id);
await user.save();
console.log("After adding:", user.cart);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});


module.exports = router;