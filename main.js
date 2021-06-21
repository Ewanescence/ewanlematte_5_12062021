// Requête API

var header = document.querySelector('header');
var section = document.querySelector('section');

var url = 'http://localhost:3000/api/teddies';
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';
request.send();

request.onload = function() {
    var teddies = request.response;
    listProducts(teddies);
}

// Affiche la liste des produits en page d'accueil

function listProducts(jsonObj) {
    
    var ours = jsonObj;
  
    for (var i = 0; i < jsonObj.length; i++) {
      var myA = document.createElement('a');
      var myArticle = document.createElement('article');
      var myFooter = document.createElement('footer');
      var myImg = document.createElement('img');
      var myH2 = document.createElement('h2');
      var myPara1 = document.createElement('p');
  
      myA.href = '/products.html?id=' + ours[i].id;
      myImg.src = ours[i].imageUrl;
      myH2.textContent = ours[i].name;
      myPara1.textContent = ours[i].price + " €";

      myArticle.appendChild(myImg);
      myFooter.appendChild(myH2);
      myFooter.appendChild(myPara1);
      myArticle.appendChild(myFooter);
      myA.appendChild(myArticle);
      section.appendChild(myA);     
      }
    }


    