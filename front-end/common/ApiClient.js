class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async makeApiCall(endpoint, method, data, token, id) {
    // console.log("ApiClient.makeApiCall called with:", { endpoint, method, data, token, id });
    console.log("ApiClient.makeApiCall :", endpoint);
    let fullUrl = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    if (token !== null) {
      headers["session-token"] = token;
    }
    if (id !== null) {
      headers["user-id"] = id;
    }

    if (method === "GET" || method === "DELETE") {
      if (data) {
        const query = new URLSearchParams(data).toString();
        fullUrl += `?${query}`;
      }
    }

    const request = {
      method,
      headers,
    };

    if (method !== "GET" && method !== "DELETE") {
      request.body = JSON.stringify(data);
    }


    try {
      // console.log("Making API call to:", fullUrl, "with request:", request);
      const response = await fetch(fullUrl, request);
      const Data = await response.json();
      return Data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { ApiClient };
