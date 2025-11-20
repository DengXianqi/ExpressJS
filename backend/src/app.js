import express from "express";
const app = express();
app.use(express.json());

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
  const r = parseFloat(req.params.r);

  const area = Math.PI * r * r;
  const circumference = Math.PI * 2 * r;

  res.json({
    area: Number(area.toFixed(2)),
    perimeter: Number(circumference.toFixed(2))
  });
});

app.get('/math/rectangle/:width/:height', (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  const area = width * height;
  const perimeter = (width * 2) + (height * 2);

  res.json({
    area: area,
    perimeter: perimeter
  });
});

app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  const result = Math.pow(base, exponent);

  const response = {
    result: result
  };

  if (req.query.root === 'true') {
    response.root = Math.sqrt(base);
  }

  res.json(response);
});

let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

app.get('/quotebook/categories', (req, res) => {
  // 1. Transform the array into a single string
  // We map over each category to add the phrase, then join them with a newline character
  let responseText = categories.map(cat => `A possible category is ${cat}`  ).join('\n \n');

  // 2. Send as plain text
  // Express detects a string and sends it as text/html or text/plain automatically
  res.type("text").send(responseText);
});

app.get('/quotebook/quote/:category', (req, res) => {
  const category = req.params.category;

  // 1. Create a "Map" object to link string names to the actual arrays
  // This lets us look up data dynamically: allQuotes["successQuotes"]
  const allQuotes = {
    successQuotes: successQuotes,
    perseveranceQuotes: perseveranceQuotes,
    happinessQuotes: happinessQuotes
  };

  // 2. Check if the category exists in our map
  const quotesList = allQuotes[category];

  if (!quotesList) {
    // Case: Category not found
    // We set status to 400 (Bad Request) and send the required error JSON
    return res.status(400).json({
      'error': `no category listed for ${category}`
    });
  }

  // 3. Pick a Random Quote
  // Math.floor(Math.random() * length) gives a random index number
  const randomIndex = Math.floor(Math.random() * quotesList.length);
  const randomQuote = quotesList[randomIndex];

  // 4. Send the JSON response
  res.json(randomQuote);
});

// ----------------------------------------------------
// Exercise 1.3: Add a quote
// Endpoint: /quotebook/quote/new
// Method: POST
// ----------------------------------------------------
app.post('/quotebook/quote/new', (req, res) => {
  // 1. Extract parameters from the Request Body
  const { category, quote, author } = req.body;

  // 2. Validate Input
  // Condition A: Are any parameters missing? (!category || !quote || !author)
  // Condition B: Is the category NOT in our allowed list? (!categories.includes(category))
  if (!category || !quote || !author || !categories.includes(category)) {
    return res.status(400).json({
      'error': 'invalid or insufficient user input'
    });
  }

  // 3. Map the category string to the actual array variable
  // (We use an object map so we can update the global arrays by reference)
  const allQuotes = {
    successQuotes: successQuotes,
    perseveranceQuotes: perseveranceQuotes,
    happinessQuotes: happinessQuotes
  };

  // 4. Push the new quote object into the correct array
  allQuotes[category].push({
    quote: quote,
    author: author
  });

  // 5. Respond with Plain Text "Success!"
  res.type('text').send('Success!');
});