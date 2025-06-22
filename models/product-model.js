const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
image:  {
    data: Buffer,      // Store image buffer
    contentType: String // Store MIME type (e.g., "image/png")
  },
    name: String,
details: String,
price: Number,
discount: {
    type: Number,
    default: 0
},

});
module.exports = mongoose.model("product", productSchema);