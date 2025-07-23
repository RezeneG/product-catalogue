const PRODUCTS_KEY = "products";

const defaultProducts = [
  {
    name: "Bluetooth Speaker",
    price: 129.00,
    category: "Electronics",
    image: "./Public/Images/bluetooth-speaker.jpg",
    rating: 4.3,
    stock: "In Stock",
    description: "Compact speaker with rich bass and wireless connectivity.",
    reviews: ["Wireless", "Waterproof", "Long battery life"]
  },
  {
    name: "Charging Cable",
    price: 25.00,
    category: "Electronics",
    image: "./Public/Images/charging-cable.jpg",
    rating: 4.1,
    stock: "In Stock",
    description: "Durable and fast-charging USB cable compatible with all devices.",
    reviews: ["Fast charging", "Durable", "Universal compatibility"]
  },
  {
    name: "Ergonomic Keyboard",
    price: 149.99,
    category: "Electronics",
    image: "./Public/Images/keyboard.jpg",
    rating: 4.5,
    stock: "In Stock",
    description: "Comfortable keyboard designed to reduce wrist strain.",
    reviews: ["Wrist support", "Responsive keys", "USB-C connection"]
  },
  {
    name: "Fitness Tracker",
    price: 199.00,
    category: "Fitness",
    image: "./Public/Images/fitness-tracker.jpg",
    rating: 4.0,
    stock: "In Stock",
    description: "Track your daily activity, heart rate, and sleep quality.",
    reviews: ["Tracks well", "Motivates to move", "Good battery life"]
  },
  {
    name: "Gaming Console",
    price: 499.99,
    category: "Electronics",
    image: "./Public/Images/gaming-console.jpg",
    rating: 4.7,
    stock: "In Stock",
    description: "Next-gen console with stunning graphics and exclusive games.",
    reviews: ["Great graphics", "Wide game selection", "Responsive controller"]
  },
  {
    name: "Get Coding",
    price: 30.00,
    category: "Books",
    image: "./Public/Images/get-coding.jpg",
    rating: 4.9,
    stock: "In Stock",
    description: "A handbook of agile software craftsmanship for beginners.",
    reviews: ["Beginner-friendly", "Hands-on projects", "Covers HTML/CSS/JS"]
  },
  {
    name: "Men's Casual T-Shirt",
    price: 15.00,
    category: "Clothing",
    image: "./Public/Images/tshirt.jpg",
    rating: 4.2,
    stock: "In Stock",
    description: "100% cotton casual t-shirt perfect for everyday wear.",
    reviews: ["Comfortable", "Breathable", "Machine washable"]
  },
  {
    name: "Mirrorless Camera",
    price: 799.00,
    category: "Electronics",
    image: "./Public/Images/mirrorless-camera.jpg",
    rating: 4.4,
    stock: "In Stock",
    description: "High-resolution mirrorless camera with 4K video support.",
    reviews: ["High resolution", "Lightweight body", "4K video recording"]
  },
  {
    name: "Pro Django",
    price: 25.00,
    category: "Books",
    image: "./Public/Images/django.jpg",
    rating: 4.6,
    stock: "In Stock",
    description: "Comprehensive guide to Django for building web applications.",
    reviews: ["Full stack guide", "Best practices", "Advanced techniques"]
  },
  {
    name: "Smart Blender",
    price: 129.50,
    category: "Appliances",
    image: "./Public/Images/smart-blender.jpg",
    rating: 4.2,
    stock: "In Stock",
    description: "Powerful blender with multiple settings and easy cleanup.",
    reviews: ["Powerful motor", "Easy to clean", "Multiple settings"]
  },
  {
    name: "Smart Blood Pressure Monitor",
    price: 299.99,
    category: "Appliances",
    image: "./Public/Images/blood-pressure.jpg",
    rating: 3.8,
    stock: "Out of Stock",
    description: "Accurate digital blood pressure monitor with Bluetooth sync.",
    reviews: ["Accurate readings", "Bluetooth sync", "Compact size"]
  },
  {
    name: "Smart Light Bulb",
    price: 89.99,
    category: "Appliances",
    image: "./Public/Images/smart-lightbulb.jpg",
    rating: 3.9,
    stock: "In Stock",
    description: "",
    reviews: ["Easy to install", "Bright light", "Remote control"]
  },
  {
    name: "Smart Thermostat",
    price: 159.99,
    category: "Appliances",
    image: "./Public/Images/smart-thermostat.jpg",
    rating: 3,
    stock: "Out of Stock",
    description: "",
    reviews: ["Easy setup", "Energy-efficient", "Remote access"]
  },
  {
    name: "Pro Django",
    category: "Books",
    price: 25,
    description: "Classic guide for django.",
    image: "./Public/Images/pro-django.jpg",
    rating: 4.5,
    stock: "In Stock",
    reviews: ["Excellent read", "Handy TOOL", "You have to have it in your bookshelf"]
  },
  {
    name: "Get Coding",
    category: "Books",
    price: 30,
    description: "A handbook of agile software craftsmanship.",
    image: "./Public/Images/get-coding.jpg",
    rating: 5,
    stock: "In Stock",
    reviews: ["You will code", "Excellent guide", "You must have"]
  },
  {
    name: "LED Desk Lamp",
    category: "Home",
    price: 35,
    description: "Bright LED desk lamp.",
    image: "./Public/Images/led-desk-lamp.jpg",
    rating: 2,
    stock: "In Stock",
    reviews: ["Poor quality!", "It does what it says", "I would get better quality"]
  },
  {
    name: "Men's Casual T-Shirt",
    category: "Clothing",
    price: 15,
    description: "100% cotton casual wear.",
    image: "./Public/Images/mens-tshirt.jpg",
    rating: 4.2,
    stock: "Out Of Stock",
    reviews: ["Looks good", "Slim fit & looks good", "Love it"]
  }
];

let cart = [];

// Save and load cart (optional - for persistence)
const CART_KEY = "cart";

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function loadCart() {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    cart = JSON.parse(stored);
  }
}

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
  card.className = "product";

  const stockIcon = product.stock === "In Stock" ? "✅" : "❌";
  const stockColor = product.stock === "In Stock" ? "green" : "red";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='./Public/Images/default.jpg';" />
    <h3>${product.name}</h3>
    <p>${product.description || ''}</p>
    <p><strong>£${product.price.toFixed(2)}</strong></p>
    <p style="color: ${stockColor}; font-weight: bold;">${stockIcon} ${product.stock}</p>
    <p>Rating: ⭐ ${product.rating.toFixed(1)}</p>
    <p><strong>Reviews:</strong></p>
    <ul>
      ${(product.reviews || []).map(review => `<li>${review}</li>`).join('')}
    </ul>
   <button class="add-to-cart" data-id="${product.name}">Add to Cart</button>

  `;
  return card;
}

function displayProducts(productList) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";
  productList.forEach(p => {
    container.appendChild(createProductCard(p));
  });
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {
    const name = this.dataset.id;
    const product = products.find(p => p.name === name);
    if (product) addToCart(product);
  });
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
