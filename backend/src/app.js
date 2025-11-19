import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "Hello from Express inside a Dev Container!", name: "Xianqi Deng, Jianxiang Huang, Mohammad Pishbin" });
});

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

app.get('/math/circle/:r', (req, res) => {
  // 1. Extract the radius 'r' from the URL parameter
  const r = parseFloat(req.params.r);

  // 2. Calculate Area and Circumference
  const area = Math.PI * r * r;
  const circumference = Math.PI * 2 * r;

  // 3. Respond with JSON
  res.json({
    area: Number(area.toFixed(2)),
    perimeter: Number(circumference.toFixed(2))
  });
});

app.get('/math/rectangle/:width/:height', (req, res) => {
  // 1. Extract width and height from the URL parameters
  // We use parseFloat so it works with decimals (like 2.5) too
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  // 2. Calculate Area and Perimeter
  const area = width * height;
  const perimeter = (width * 2) + (height * 2);

  // 3. Respond with JSON
  res.json({
    area: area,
    perimeter: perimeter
  });
});

app.get('/math/power/:base/:exponent', (req, res) => {
  // 1. Extract path parameters
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  // 2. Calculate the power (result)
  // You can use Math.pow(base, exponent) or base ** exponent
  const result = Math.pow(base, exponent);

  // 3. Create the response object
  const response = {
    result: result
  };

  // 4. Check for the query parameter 'root'
  // We check if req.query.root is literally the string "true"
  if (req.query.root === 'true') {
    response.root = Math.sqrt(base);
  }

  // 5. Send the JSON response
  res.json(response);
});