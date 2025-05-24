const axios = require("axios");

const runTests = async (req, res) => {
  const endpoints = req.body.endpoints;
  const results = [];

  for (let ep of endpoints) {
    const { method, url, body } = ep;

    const options = {
      method,
      url,
      data: body ? JSON.parse(body) : {},
      validateStatus: () => true,
    };

    const result = {
      name: ep.name,
      method,
      url,
    };

    try {
      const start = Date.now();
      const response = await axios(options);
      const duration = Date.now() - start;

      result.status = response.status;
      result.time = duration + " ms";
      result.error = response.status >= 400 ? response.data : null;
    } catch (err) {
      result.status = "ERR";
      result.time = "-";
      result.error = err.message;
    }

    results.push(result);
  }

  res.json({ results });
};

module.exports = { runTests };
