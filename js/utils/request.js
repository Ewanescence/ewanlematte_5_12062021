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

    static post(url, requestOptions) {
        return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            window.location.href = `${window.location.origin}/pages/order.html`
            localStorage.setItem('order', JSON.stringify(json))
        })
        .catch(() => {
            alert(error)
        })
    
    }

    
}