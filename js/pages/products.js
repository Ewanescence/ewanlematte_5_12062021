;(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  //hydratePage(productData)
})()

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}