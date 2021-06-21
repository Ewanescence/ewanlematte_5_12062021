// Requête API
;(async () => {
  const products = await getProducts()
  displayProducts(products)
})()

// Récupération des produits
async function getProducts() {
  return fetch('http://localhost:3000/api/teddies')
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => products)
    .catch((error) => {
      console.log(error)
    })
}

// Affichage complet des produits
function displayProducts(products) {
  products.forEach((product) => {
    buildProducts(product)
  })
}

// Affichage unitaire des produits

function buildProducts(product) {

  // Juste un raccourci

  const sngp = 'singleProduct__'

  // Sélection du template

  const template = document.getElementById('singleProduct')
  const clone = document.importNode(template.content, true)
 
  // Quelques raccourcis vers les pointeurs des éléments

  const link = clone.getElementById(sngp + 'link')
  const description =  clone.getElementById(sngp + 'description')
  const price = clone.getElementById(sngp + 'price')
  const name = clone.getElementById(sngp + 'name')
  const image = clone.getElementById(sngp + 'image')
  
  // Définition du contenu de chaque élément

  link.href = `/product.html?id=${product._id}`
  description.textContent = product.description
  price.textContent = product.price
  name.textContent = product.name
  image.src = product.imageUrl

  document.getElementById('products').appendChild(clone)

  /* Suppression des ids et ajout des classes, 
  afin d'éviter des erreurs W3C pour utilisation multiple d'un id */

  link.removeAttribute('id')
  link.classList.add(sngp + 'link')
  description.removeAttribute('id')
  description.classList.add(sngp + 'description')
  price.removeAttribute('id')
  price.classList.add(sngp + 'price')
  name.removeAttribute('id')
  name.classList.add(sngp + 'name')
  image.removeAttribute('id')
  image.classList.add(sngp + 'image')
  
}


    