const baseUrl = "/coffee-app";
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const shopId = urlParams.get("shop_id");

  if (!shopId) {
    document.body.innerHTML =
      "<h1>Error: No Shop ID</h1><p>Please add ?shop_id=101 to the URL.</p>";
    return;
  }

  console.log(`Loading App for Shop ID: ${shopId}`);

  axios
    .get(`${baseUrl}/shop-config?shop_id=${shopId}`)
    .then((configResponse) => {
      // Check if discount is active
      const isPromoActive = configResponse.data.showBanner === true;

      if (isPromoActive) {
        const banner = document.getElementById("promo-banner");
        if (banner) banner.style.display = "block";
      }

      axios.get(`${baseUrl}/coffees`).then((coffeeResponse) => {
        const coffeeList = document.getElementById("coffeeList");

        coffeeResponse.data.forEach((coffee) => {
          const listItem = document.createElement("li");
          let displayPrice = coffee.price;

          if (isPromoActive) {
            displayPrice = coffee.price / 2;
          }

          listItem.textContent = `${coffee.name} - $${displayPrice}`;

          const orderButton = document.createElement("button");
          orderButton.textContent = "Order";
          orderButton.style.marginLeft = "10px";
          orderButton.onclick = () => placeOrder(coffee.id);

          listItem.appendChild(orderButton);
          coffeeList.appendChild(listItem);
        });
      });
    })
    .catch((err) => {
      console.log("Error loading shop config or coffees", err);
    });
});

function placeOrder(coffeeId) {
  const urlParams = new URLSearchParams(window.location.search);
  const shopId = urlParams.get("shop_id");

  if (!shopId) {
    alert("Cannot place order: Shop ID is missing from URL.");
    return;
  }

  axios
    .post(`${baseUrl}/order`, {
      coffeeId: coffeeId,
      quantity: 1,
      shopId: shopId,
    })
    .then((response) => {
      alert(
        `Ordered ${response.data.coffeeName}! Total: $${response.data.total}`
      );
    })
    .catch((error) => {
      alert("Error placing order.");
    });
}
