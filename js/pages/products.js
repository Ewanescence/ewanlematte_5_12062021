;(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  displayProductData(productData)

  const button = document.getElementById('product__button')
})()

// Récupère l'ID du produit dans l'url

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

// Requête au serveur à l'aide de l'id récupéré dans l'url

function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}

// Affichage des informations du produit sur la page
function displayProductData(product) {

  const name = document.getElementById('product__name')
  const image = document.getElementById('product__image')
  const price = document.getElementById('product__price')
  const button = document.getElementById('product__button')

  name.textContent = `Ours en peluche ${product.name}`
  image.src = product.imageUrl
  image.alt = product.name
  price.textContent = `${product.price / 100}.00 €`
  button.textContent = `Ajouter au panier`

  product.colors.forEach((color) => {
    buildColors(color)
  })
}

// Construis le champ personnalisation du produit
function buildColors(color) {
  
  const template = document.getElementById('singleColor')
  const clone = document.importNode(template.content, true)
  const option = clone.getElementById('singleColor__color')

  option.value = color
  option.label = color
  
  document.getElementById('color__select').appendChild(clone)
  
  option.removeAttribute('id')
  option.classList.add('singleColor__color')
}

function addToCart(event) {
  event.preventDefault();
  console.log("Ajout dans le panier...")
}