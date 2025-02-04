class ApiNews {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _makeRequest(endpoint, method = 'GET', body = null) {
        const options = {
            method,
            headers: this.headers,
        };

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.baseUrl}${endpoint}&apiKey=adc519f31f414dc4a8ddab0a383b2146`, options)
            .then((res) => {
                if (!res.ok) throw new Error(`Server ERROR: ${res.status}`);
                return res.json();
            })
            .catch((error) => {
                console.error("Error:", error);
                return Promise.reject(error);
            });
    }

    newsSearch(keyword) {
        return this._makeRequest(`/everything?q=${encodeURIComponent(keyword)}`);
    }
}

const api_news = new ApiNews({
    baseUrl: "https://nomoreparties.co/news/v2",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api_news;
