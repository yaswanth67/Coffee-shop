// Coffee-shop/app.js
const express = require("express");
const axios = require("axios");
const helmet = require('helmet');

const { coffees, orders } = require("./data");

const app = express();
app.use(helmet());
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

module.exports = app;

// Helper function to check flags
async function checkFlags(shopId) {
  try {
    console.log("Checking feature flags for shopId:", shopId);
    const featureUrl = process.env.FEATURE_API_URL || "http://localhost:8080";
    const response = await axios.get(`${featureUrl}/features/${shopId}`);
    return response.data["show-promo-banner"] === true;
  } catch (e) {
    console.error("Feature check failed:", e.message);
    return false;
  }
}

app.get("/coffees", (req, res) => {
  console.log("Fetching all coffees");
  res.json(coffees);
});

app.get("/shop-config", async (req, res) => {
  console.log("Fetching shop config for shop_id:", req.query.shop_id);
  const shopId = req.query.shop_id;
  if (!shopId) {
    return res.status(400).json({ error: "Missing shop_id" });
  }

  try {
    const featureUrl = process.env.FEATURE_API_URL || "http://localhost:8080";
    const response = await axios.get(`${featureUrl}/features/${shopId}`);
    const showBanner = response.data["show-promo-banner"] === true;
    console.log("Feature flag 'show-promo-banner':", showBanner);
    res.json({ showBanner });
  } catch (error) {
    res.json({ showBanner: false });
  }
});

app.post("/order", async (req, res) => {
  console.log("Received order:", req.body);
  const { coffeeId, quantity, shopId } = req.body;

  const coffee = coffees.find((c) => c.id === coffeeId);
  if (!coffee) {
    return res.status(400).json({ error: "Invalid coffee ID" });
  }

  // Default to full price
  let finalPrice = coffee.price;

  // ONLY check for discount if a shopId was actually provided
  if (shopId) {
    const isPromoActive = await checkFlags(shopId);
    if (isPromoActive) {
      finalPrice = coffee.price * 0.5;
    }
  }

  const order = {
    orderId: orders.length + 1,
    coffeeName: coffee.name,
    quantity,
    total: finalPrice * quantity,
  };

  orders.push(order);
  console.log("Order stored:", order);
  res.status(201).json(order);
});

app.get("/orders", (req, res) => {
  console.log("Fetching all orders");
  res.json(orders);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
