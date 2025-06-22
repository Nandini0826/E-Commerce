const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model")
const isLoggedin = require("../middlewares/isLoggedin")

router.post("/create", upload.single("image"), async function (req, res){
try{
    let { name, price, discount, details} = req.body;   
    let product = await productModel.create({
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype // Capture MIME type
        },
        name, 
        price,
        discount,
        details
       
});
res.status(201).json({ 
    message: "Product created successfully",
    product 
  });
}
catch(err){
    res.status(500).json({ 
        error: err.message || "Failed to create product" 
      });
  }
});

router.get("/shop", async (req, res) => {
  try {
    const products = await productModel.find();
    
    const productsWithImages = products.map(product => {
      const productObj = product.toObject();
      
      if (productObj.image?.data && productObj.image.contentType) {
        productObj.imageUrl = `data:${productObj.image.contentType};base64,${productObj.image.data.toString('base64')}`;
      }
      else {
         productObj.imageUrl = null; 
       }
      return productObj;
    });

    res.json({ products: productsWithImages });
  } catch (err) {
    console.error("Shop route error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});



module.exports = router;