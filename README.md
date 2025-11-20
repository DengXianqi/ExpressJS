# Math API Documentation

This API allows the client to calculate the power of a given base raised to a specified exponent. Additionally, clients can request the square root of the base as part of the response.

## Calculate Power
**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided, the square root of the `base` will also be returned in the response.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "result": 16
}
```

**Example Request with Root:** `/math/power/9/2?root=true`

**Example Response with Root:**
```json
{
    "result": 81,
    "root": 3
}
```

---

***

## Radical Rectangles
**Request Format:** `/math/rectangle/:width/:height`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the area and perimeter of a rectangle based on the `width` and `height` parameters provided in the URL.

**Example Request:** `/math/rectangle/5/5`

**Example Response:**
```json
{
    "area": 25,
    "perimeter": 20
}
```

---

## Exquisite Exponents
**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided and set to `true`, the square root of the `base` will also be included in the response.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "result": 16
}
```

**Example Request with Root:** `/math/power/9/2?root=true`

**Example Response with Root:**
```json
{
    "result": 81,
    "root": 3
}
```

---

## Fetch Categories
**Request Format:** `/quotebook/categories`

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Responds with a plain text list of all available quote categories. Each category is on its own line and prepended with the phrase "A possible category is ".

**Example Request:** `/quotebook/categories`

**Example Response:**
```text
A possible category is successQuotes
A possible category is perseveranceQuotes
A possible category is happinessQuotes
```

---

## Get Random Quote by Category
**Request Format:** `/quotebook/quote/:category`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a random quote object (containing `quote` and `author`) from the specified `:category`. If the category does not exist, it responds with a 400 status code and an error message.

**Example Request:** `/quotebook/quote/happinessQuotes`

**Example Response:**
```json
{
   "quote": "For every minute you are angry you lose sixty seconds of happiness.",
   "author": "Ralph Waldo Emerson"
}
```

**Example Error Response:**
```json
{
   "error": "no category listed for dinosaurQuotes"
}
```

---

## Add New Quote
**Request Format:** `/quotebook/quote/new`

**Request Type:** POST

**Returned Data Format**: Plain Text (Success) or JSON (Error)

**Description:** Adds a new quote to the server's data. Expects a JSON body containing `category`, `quote`, and `author`. If successful, it returns the text "Success!". If parameters are missing or the category is invalid, it returns a 400 error.

**Example Request Body:**
```json
{
    "category": "successQuotes",
    "quote": "The way to get started is to quit talking and begin doing.",
    "author": "Walt Disney"
}
```

**Example Response (Success):**
```text
Success!
```

**Example Response (Error):**
```json
{
    "error": "invalid or insufficient user input"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `base` or `exponent` is not a valid number, returns an error with message `{"error": "Invalid base or exponent. Please provide numeric values."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

## Notes:
- The `base` and `exponent` must be provided as part of the URL path.
- Both `base` and `exponent` are expected to be numeric. Non-numeric values will result in an error.
- The optional `root` query parameter does not require a value. Its presence in the request query indicates that the square root of the `base` should also be calculated and included in the response.
