class request {

    static get(url) {
        return fetch(url)
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json();
                } else {
                    throw new Error(`${httpBodyResponse.status} - ${httpBodyResponse.statusText}`);
                }
            })
            .catch((error) => {
                throw new Error(`Fetch catch : ${error}`);
            });
    }
    
}