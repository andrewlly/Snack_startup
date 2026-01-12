

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const products = [
  {
    id: "sku_001",
    name: "Street Kettles™",
    flavor: "Garlic Butter & Roasted Corn",
    price: 4.99,
    size: "5oz",
    inStock: true,
    nutrition: {
        calories: 150,
        fat: "8g",
        carbs: "16g"
    }
  }
];

const subscribers = []; 

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 2. Get Products
app.get('/api/products', (req, res) => {
  // Simulate database delay
  setTimeout(() => {
    res.json(products);
  }, 500);
});

// 3. Subscribe to Newsletter
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Check if already subscribed
  if (subscribers.includes(email)) {
    return res.status(409).json({ message: "You are already on the list!" });
  }

  subscribers.push(email);
  console.log(`New Subscriber: ${email}`);

  return res.status(201).json({ 
    message: "Welcome to The Clean Break.", 
    subscriberCount: subscribers.length 
  });
});

// 4. Store Locator (Mock)
app.get('/api/stores', (req, res) => {
    const stores = [
        { name: "Royal Blue Grocery", lat: 30.2672, lng: -97.7431, stockLevel: "High" },
        { name: "Alienware Outpost", lat: 30.3072, lng: -97.7560, stockLevel: "Medium" }
    ];
    res.json(stores);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Street Kettles Backend running on http://localhost:${PORT}`);
});