const express = require('express')
const app = express()
const jsonfile = require('jsonfile')
const _ = require('lodash')

// start the express server on this port
const listenPort  = 6789

// Store the provided JSON in memory
const ingredients = jsonfile.readFileSync('ingredients.json')
const products = jsonfile.readFileSync('products.json')

// set static content
app.use(express.static('public'))

/**
 * "Search" API to find products containing a specific ingredient
 *
 * @parameter {string} "ingredient_name" the name of the ingredient to search for
 */
app.get('/search', (request, response) => {
  // wrap the func in a try/catch block for graceful error handling
  try {
    // get the ingredient name passed in to the API and convert to lowercase to remove case sensitivity when searching
    let ingredientName = _.toLower(request.query.ingredient_name)
    // find the ingredient ID using the provided ingredient name
    let ingredientId = _.find(ingredients.ingredients, (ingredient) => {
      return _.toLower(ingredient.name) === ingredientName
    }).id

    // find products that contain the provided ingredient
    let productsContainingIngredient = _.filter(products.products, (product) => {
      return _.includes(product.ingredient_ids, ingredientId)
    })

    // return the list of products containing the provided ingredient 
    response.send(productsContainingIngredient)
  } catch (err) {
    // generic response on error so user will just the below error
    response.send([{ name: 'No matching ingredient/product found' }])
  }
})

console.log('Server starting @ http://localhost:' + listenPort)

module.exports = app.listen(listenPort)
