const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minlength: 3,
    trim: true,
  },
  email: String,
  password: String,
  cart: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }
],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],

  orders: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});
module.exports = mongoose.model("user", userSchema);
