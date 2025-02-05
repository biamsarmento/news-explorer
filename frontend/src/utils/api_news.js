class ApiNews {
    constructor({ baseUrl, headers, apiKey }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.apiKey = apiKey;
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

        return fetch(`${this.baseUrl}${endpoint}&apiKey=${this.apiKey}`, options)
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
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        const from = sevenDaysAgo.toISOString().split('T')[0];
        const to = today.toISOString().split('T')[0];
        
        return this._makeRequest(`/everything?q=${encodeURIComponent(keyword)}&from=${from}&to=${to}&pageSize=100`);
    }
}

const api_news = new ApiNews({
    baseUrl: "https://nomoreparties.co/news/v2",
    headers: {
        "Content-Type": "application/json"
    },
    apiKey: "adc519f31f414dc4a8ddab0a383b2146"
});

export default api_news;
