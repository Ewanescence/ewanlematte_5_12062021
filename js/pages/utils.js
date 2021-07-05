// classe object
class CartObject {

    // On récupère un panier existant ou bien, rien du tout.
    get products() {
      return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
    }
  
    // On crée un objet du nom de shoppingCart dans le localStorage avec les produits associés au panier.
    set products(products) {
      localStorage.setItem('shoppingCart', JSON.stringify(products))
    }
  
    // On ajoute un produit au panier.
    addProduct(productObject) {
      let products = this.products
  
      // On vérifie que le produit n'est pas déjà présent dans le panier, dans ce cas...
      const productAlreadyInCarte = !!products[productObject._id]
  
      if (productAlreadyInCarte) {
        //... on incrémente de un la quantité du produit, sinon...
        products[productObject._id].quantity++
      } else {
        //... on ajoute le produit au panier, tout en créant une propriété quantity définie à 1.
        products[productObject._id] = {
          quantity: 1,
          ...productObject,
        }
      }
      this.products = products
    }
  
    // On récupère la quantité d'un produit dans le panier.
    getProductQuantity(productId) {
      const products = this.products
      return products[productId].quantity
    }
  
    // On met à jour la quantité d'un produit dans le panier.
    updateProductQuantity(productId, quantity) {
      const products = this.products
      products[productId].quantity = quantity
      console.log(products)
      this.products = products
    }
  
    // On calcule le prix total du panier.
    getTotalPrice() {
      const products = this.products
      const totalPrice = Object.values(products).reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity) / 100
      }, 0)
      return totalPrice
    }
  }
  
  // On initialise le panier
  const Cart = new CartObject()