;(() => {
    //On récupère la panier
    const products = Cart.products

    //On gère l'affichage du panier
    displayProducts(products)

    //On gère le formulaire de commande
    listeningForm()
})()

function displayProducts(products) {

  // Pour chaque produit, on génère un nouveau champ à partir d'un template
    const productList = Object.values(products)
    productList.forEach((product) => {
      buildProducts(product)
    })
  }

function buildProducts(product) {


  // On récupère le template pour pouvoir le cloner
  const template = document.getElementById('singleProduct')
  const clone = document.importNode(template.content, true)
    
  // On récupère chaque éléments du template
  const item = clone.getElementById('item')
  const name = clone.getElementById('name')
  const qty = clone.getElementById('qty')
  const price = clone.getElementById('price')
  const del = clone.getElementById('delete')

  
  // Remplissage des informations du produit
  name.textContent = product.name 
  qty.textContent = product.quantity
  price.textContent = `${product.price / 100}.00 €`

  // Gestion du bouton de suppresion du produit
  del.onclick = (event) => {
    
    // On écarte le comportement par défaut
    event.preventDefault()

    // On passé l'id du produit concerné à notre fonction
    Cart.updateProductQuantity(product._id)

    // On recharge notre page de manière invisible pour l'utilisateur :))
    document.location.reload()

  }

  // Création et insertion d'un produit dans le parent 'items' 
  document.getElementById('items').appendChild(clone)

  // Suppression des IDs pour éviter les erreurs W3C et ajout de classe si besoin
  item.removeAttribute('id')
  item.classList.add('singleProduct__container')
  name.removeAttribute('id')
  qty.removeAttribute('id')
  price.removeAttribute('id')
  del.removeAttribute('id')

  // Création et insertion du prix total
  document.getElementById('total__price').textContent = Cart.getTotalPrice() + '.00€'

}

// Gestion du formulaire de commande
function listeningForm() {

  // On écoute l'évènement 'onclick' sur notre bouton
  document.getElementById('confirm').onclick = (event) => {
    event.preventDefault()
    checkOrder()
  }
}

// Fonction de vérification et d'envoi de la commande
function checkOrder() {

  // On récupère tous les champs d'entrée textuelles
  const firstname = document.getElementById('firstname').value
  const lastname = document.getElementById('lastname').value
  const adress = document.getElementById('adress').value
  const zipcode = document.getElementById('zipcode').value
  const email = document.getElementById('email').value
  const city = document.getElementById('city').value

  // Règles faîtes avec https://regexr.com/ pour contrôler les entrées mail et code postal
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/

  // On vérifie que tous les champs soient remplis ou remplis et respectant les règles regex...
  if (!(
    firstname.length > 1
    && lastname.length > 1
    && emailRegex.test(email)
    && adress.length > 6
    && zipcodeRegex.test(zipcode)
    && city.length > 1
  )) {
    
    //... Sinon on retourne une erreur et on sort de notre fonction pour empêcher l'envoi de fausses données
    alert("Veuillez remplir les champs correctements avant de procéder au paiement")
    return
  }

  // On récupère les produits du panier pour en faire un tableau
  const products = Object.values(Cart.products).map((product) => {
    return product._id
  })

  // On initialise un objet contact pour l'envoi des données
  const order = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress + ' ' + zipcode,
      city: city,
      email: email,
    },
    products: products,
  }

  // Paramètres de requête d'envoi
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }

  // Envoi des données, on récupère l'id renvoyé par le backend et on le transmet dans l'url
  fetch(`http://localhost:3000/api/teddies/order`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      localStorage.removeItem('shoppingCart')
      window.location.href = `${window.location.origin}/pages/order.html?orderId=${json.orderId}`
    })
    .catch(() => {
      alert(error)
    })

}
