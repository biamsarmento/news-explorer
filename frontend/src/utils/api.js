class Api {
  constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
  }

  _makeRequest(endpoint, method = 'GET', body = null) {
        const token = localStorage.getItem('token');
        const options = {
            method,
            headers: {
                ...this.headers,
                ...(token && { authorization: `Bearer ${token}` })
            }
        };

        if (body) {
            options.headers['Content-Type'] = 'application/json'; 
            options.body = JSON.stringify(body);
        }

        return fetch(`${this.baseUrl}${endpoint}`, options)
            .then((res) => {
                if (!res.ok) throw new Error(`Server ERROR: ${res.status}`);
                return res.json();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
  }

  getUserInfo() {
    return this._makeRequest('/users/me');
  }

  addCard({publishedAt, urlToImage, title, description, source}) {
    return this._makeRequest('/articles', 'POST', { publishedAt, urlToImage, title, description, source });
  }

  getUserCards() {
    return this._makeRequest('/articles/me');
  }

  deleteCard(cardId) {
      return this._makeRequest(`/articles/${cardId}`, 'DELETE');
  }
}

const api = new Api({
baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
