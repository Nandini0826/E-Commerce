const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken");
const mongoose = require("mongoose");

// Register
module.exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.send(err.message);
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        const user = await userModel.create({ fullname, email, password: hash });
        const token = generateToken(user);

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        res.status(201).json({ message: "User created", user });
      });
    });
  } catch (err) {
    console.log("Backend error:", err);
    res.status(500).json({ error: err.message || "Registration failed" });
  }
};

// Login
module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email or password incorrect" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    console.log("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
};

// Logout
module.exports.logout = async function (req, res) {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
};

// JWT Middleware
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Add to Wishlist
module.exports.wishlist = async function (req, res) {
  const userId = req.user.id;
  const { productId } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update wishlist" });
  }
};

// Add to Cart
module.exports.cart = async function (req, res) {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const user = await userModel.findById(userId);
    const existingItem = user.cart.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart" });
  }
};

// Update Cart Quantity
module.exports.updateCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  console.log("Received updateCart request with:", { userId, productId, quantity });

  if (!productId || quantity === undefined) {
    return res.status(400).json({ error: "Missing productId or quantity" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if (!cartItem) {
      console.log("Product not found in user's cart");
      return res.status(404).json({ error: "Product not found in cart" });
    }

    if (quantity < 1) {
      console.log("Removing product from cart");
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    } else {
      console.log("Updating product quantity");
      cartItem.quantity = quantity;
      
    }

    await user.save();
    console.log("Cart successfully updated");
    res.status(200).json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
};

// Get Cart (Fixed)
module.exports.getcart = async function (req, res) {
  try {
    const user = await userModel.findById(req.user.id).populate({
      path: 'cart.productId',
      select: '_id name price image details discount'
    });
    let totalBill = 0;
    const cartWithImages = user.cart
      .filter(item => item.productId) // Skip items with missing products
      .map(item => {
        const product = item.productId.toObject();
        product._id = item.productId._id;
  
        const originalPrice = product.price;
        const discount = product.discount || 0;
        const discountedPrice = originalPrice - (originalPrice * discount / 100);
        const subtotal = discountedPrice * item.quantity;
        let price = product.price;
        if (product.discount) {
          price = price - (price * product.discount / 100);
        }

        // Add to total bill
        totalBill += subtotal;
        if (product.image?.data && product.image.contentType) {
          
          product.imageUrl = `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`;
        }
        else {
          product.imageUrl = '/default-product-image.png';
        }

        return {
          ...product,
          quantity: item.quantity,
          cartItemId: item._id,
          originalPrice,
          discountPercentage: discount,
          discountedPrice,
          subtotal,
        
        };
      });

    res.status(200).json({ cart: cartWithImages, totalBill});
  } catch (err) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Get Wishlist (with null check)
module.exports.getwishlist = async function (req, res) {
  try {
    const user = await userModel.findById(req.user.id).populate({
      path: 'wishlist',
      select: 'name price image details discount'
    });

    const wishlistImages = user.wishlist
      .filter(product => product) // Skip null products
      .map(product => {
        const productObj = product.toObject();
        
        if (productObj.image?.data && productObj.image.contentType) {
        productObj.imageUrl = `data:${productObj.image.contentType};base64,${productObj.image.data.toString('base64')}`;
      }
      else {
         productObj.imageUrl = null; 
       }

        return productObj;
      });

    res.status(200).json({ wishlist: wishlistImages });
  } catch (err) {
    console.log("Wishlist fetch error:", err);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};
 
