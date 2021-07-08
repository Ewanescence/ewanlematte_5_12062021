;(() => {
    console.log('cart.js')
    const products = Cart.products
    displayProducts(products)
})()

function displayProducts(products) {
    const productList = Object.values(products)
    productList.forEach((product) => {
      buildProducts(product)
    })
  }

function buildProducts(product)
{
    const template = document.getElementById('singleItem')
    const clone = document.importNode(template.content, true)
    
    const name = clone.getElementById('name')
    const qty = clone.getElementById('qty')
    const price = clone.getElementById('price')
    const del = clone.getElementById('delete')

    name.textContent = product.name 
    qty.textContent = product.quantity
    price.textContent = `${product.price / 100}.00 €`

    del.onclick = (event) => {
      event.preventDefault()
      Cart.updateProductQuantity(product._id)
      document.location.reload()
    }

    document.getElementById('items').appendChild(clone)

    name.removeAttribute('id')
    qty.removeAttribute('id')
    price.removeAttribute('id')
    del.removeAttribute('id')

    document.getElementById('total__price').textContent = Cart.getTotalPrice() + '.00€'
}