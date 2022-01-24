const mongoose = require('mongoose')

const Product = mongoose.model('Person', {
  description: String,
  price: Number,
  image: String
})

module.exports = Product