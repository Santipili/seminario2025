class UseFetch {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async makeCall(endpoint, method, data, token, id) {
        const fullUrl = `${this.baseUrl}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
        };

        // Agregar headers de token si se proporciona token y Id
        if (token !== null && id !== null) {
            headers["session-token"] = token;
            headers["user-id"] = id;
        }

        const request = {
            method,
            headers,
            body: method !== "GET" ? JSON.stringify(data) : undefined,
        };

        try {
            const response = await fetch(fullUrl, request);
            const Data = await response.json();
            return Data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export { UseFetch };