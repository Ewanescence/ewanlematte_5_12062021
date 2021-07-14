;(() => {

    // On récupère les informations de la commande
    const order = getOrder()

    // On affiche les informations de la commande 
    document.getElementById('order__id').textContent = order.orderId
    document.getElementById('order__price').textContent = Cart.getTotalPrice() + '.00 €'
    document.getElementById('order__name').textContent = order.contact['firstName']
    document.getElementById('order__adress').textContent = order.contact['address']
    document.getElementById('order__mail').textContent = order.contact['email']
    
    // On efface toute trace du panier et de la commande dans le localStorage
    localStorage.removeItem('shoppingCart')
    localStorage.removeItem('order')

  })()

function getOrder() {
  return JSON.parse(localStorage.getItem('order') || '{}')
}