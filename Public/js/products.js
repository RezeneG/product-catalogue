const PRODUCTS_KEY = "products";

const defaultProducts = [
  {
    name: "Bluetooth Speaker",
    price: 129.00,
    category: "Electronics",
    image: "./Public/Images/blue-speaker.jpg",
    rating: 4.5,
    stock: "In Stock",
    features: ["Loud and clear", "Portable", "Long battery life"]
  },
  {
    name: "Charging Cable",
    price: 25.00,
    category: "Accessories",
    image: "./Public/Images/charging-cable.jpg",
    rating: 4.6,
    stock: "In Stock",
    features: ["Fast charging", "Durable cable", "Affordable price"]
  },
  {
    name: "Ergonomic Keyboard",
    price: 149.99,
    category: "Accessories",
    image: "./Public/Images/ergonomic-keyboard.jpg",
    rating: 4.3,
    stock: "In Stock",
    features: ["Comfortable typing", "Reduces strain", "Stylish design"]
  },
  {
    name: "Fitness Tracker",
    price: 199.00,
    category: "Electronics",
    image: "./Public/Images/fitness-tracker.jpeg",
    rating: 4.0,
    stock: "In Stock",
    features: ["Tracks well", "Motivates to move", "Good battery life"]
  },
  {
    name: "Gaming Console",
    price: 499.99,
    category: "Electronics",
    image: "./Public/Images/gaming-console.jpg",
    rating: 4.7,
    stock: "In Stock",
    features: ["Great graphics", "Wide game selection", "Responsive controller"]
  },
  {
    name: "Mirrorless Camera",
    price: 799.00,
    category: "Electronics",
    image: "./Public/Images/mirrorless-camera.jpg",
    rating: 4.4,
    stock: "In Stock",
    features: ["High resolution", "Lightweight body", "4K video recording"]
  },
  {
    name: "Smart Blender",
    price: 129.50,
    category: "Appliances",
    image: "./Public/Images/smart-blender.jpg",
    rating: 4.2,
    stock: "In Stock",
    features: ["Powerful motor", "Easy to clean", "Multiple settings"]
  },
  {
    name: "Smart Blood Pressure Monitor",
    price: 299.99,
    category: "Appliances",
    image: "./Public/Images/blood-pressure.jpg",
    rating: 3.8,
    stock: "Out of Stock",
    features: ["Accurate readings", "Bluetooth sync", "Compact size"]
  },
  {
    name: "Smart Light Bulb",
    price: 89.99,
    category: "Appliances",
    image: "./Public/Images/smart-lightbulb.jpg",
    rating: 3.9,
    stock: "In Stock",
    features: ["Easy to install", "Bright light", "Remote control"]
  },
  {
    name: "Smart Thermostat",
    price: 159.99,
    category: "Appliances",
    image: "./Public/Images/smart-thermostat.jpg",
    rating: 3.9,
    stock: "Out of Stock",
    features: ["Easy setup", "Energy-efficient", "Remote access"]
  }
];

// Safely load products from localStorage or use default
function getStoredProducts() {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.warn("Error parsing stored products:", err);
  }
  return null;
}

function saveProductsToStorage(products) {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (err) {
    console.error("Error saving products:", err);
  }
}

function loadProducts() {
  const stored = getStoredProducts();
  if (stored) return stored;

  saveProductsToStorage(defaultProducts);
  return defaultProducts;
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const stockIcon = product.stock === "In Stock" ? "✅" : "❌";
  const stockColor = product.stock === "In Stock" ? "green" : "red";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='./Public/Images/default.jpg';" />
    <h3>${product.name}</h3>
    <p><strong>£${product.price.toFixed(2)}</strong></p>
    <p style="color: ${stockColor}; font-weight: bold;">${stockIcon} ${product.stock}</p>
    <p>Rating: ⭐ ${product.rating.toFixed(1)}</p>
    <ul>
      ${product.features?.map(f => `<li>${f}</li>`).join("")}
    </ul>
  `;
  return card;
}

function displayProducts(productList) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  productList.forEach(p => {
    container.appendChild(createProductCard(p));
  });
}

const products = loadProducts();
displayProducts(products);

// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  displayProducts(filtered);
});

// Sort functionality
document.getElementById("sortSelect").addEventListener("change", function () {
  const value = this.value;
  let sorted = [...products];
  switch (value) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
  }
  displayProducts(sorted);
});
