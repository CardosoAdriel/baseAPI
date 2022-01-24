const router = require('express').Router()
const Product = require('../models/Product')


// Create
router.post('/', async (req, res) => {
  // Manipulate data received of the request (req.body)
  const { description, price, image } = req.body

  //Every validate if all values received in request, if some incorret value, we have to return an error 
  //The error menssage can be value specific or generic message for all values.
  if (!description || !price || !image) {
    res.status(422).json({Error: "Body of request is not completed !!!"})
    return
  }

  const product = {
    description,
    price,
    image
  }

  try {
    const createdProduct = await Product.create(product)
    const {_id } = createdProduct
    res.status(201).json({ message: "Product created successful", id: _id})
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Read All
router.get('/', async (req, res) => {
  try {
    // The method find() is used for get all data of collection in data base
    const products = await Product.find()

    if(!products) {
      res.status(422).json({ message: 'There are no registred products'})
    } 

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

//Read specific product
router.get('/:id', async (req, res) => {
  //extract data request to url = req.params
  const id = req.params.id  

  try {
    const product = await Product.findOne({ _id: id })

    if(!product){
      res.status(422).json({ message: 'User is not find'})
      return
    }  

    res.status(200).json(product)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { description, image, price } = req.body

  const newProduct = {
    description,
    image,
    price
  }
  
  try {
    const updateProduct = await Product.updateOne({ _id: id}, newProduct)

    if(updateProduct.matchedCount === 0) {
      res.status(422).json({ message: 'Product is not find'})
      return
    }

    res.status(200).json(newProduct)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const product = await Product.findOne({ _id: id })
  if(!product){
    res.status(422).json({ message: 'Product is not find'})
    return
  }

  try {
    await Product.deleteOne({ _id: id})
    
    res.status(201).json({Message: 'Product deleted successful'})
  } catch (error) {
    res.status(500).json({error: error})
  }

})

module.exports = router