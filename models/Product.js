const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
  description: String,
  price: Number,
  image: String
})

module.exports = Product