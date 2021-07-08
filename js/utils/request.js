// Gestion des requêtes génériques pour éviter le duplicata de code

class request {

    static get(url) {
        return fetch(url)
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json()
                } else {
                    console.log(httpBodyResponse.statusText)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
}