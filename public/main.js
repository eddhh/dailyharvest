'use strict'

// send a request to search the API and display results
var searchProducts = async () => {
  // fetch response from the API
  let response = await fetch('/search?ingredient_name=' + document.getElementById('search').value)
  // convert the response to JSON
  let data = await response.json()
  // concatenate and display the results
  let products = ''
  data.forEach((item) => { products = `${products}${item.name}<br>` })
  document.getElementById('results').innerHTML = products
}
