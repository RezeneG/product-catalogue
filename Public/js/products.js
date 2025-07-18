let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    description: "High-quality wireless headphones with noise cancellation.",
    image: "https://source.unsplash.com/300x200/?headphones",
    availability: true,
    ratings: 4.5,
    reviews: [
      { user: "Alice", comment: "Great sound quality!" },
      { user: "Bob", comment: "Very comfortable to wear." }
    ]
  },
  {
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 99.99,
    description: "Brew your perfect coffee every morning.",
    image: "https://source.unsplash.com/300x200/?coffee+maker",
    availability: true,
    ratings: 4.2,
    reviews: [
      { user: "Cara", comment: "Makes great coffee!" },
      { user: "John", comment: "Easy to use and clean." }
    ]
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 149.99,
    description: "Keep track of your fitness and notifications.",
    image: "https://source.unsplash.com/300x200/?smart+watch",
    availability: false,
    ratings: 3.8,
    reviews: [
      { user: "Dave", comment: "Great features but battery drains fast." }
    ]
  },
  {
    name: "Standing Desk",
    category: "Furniture",
    price: 250.0,
    description: "Adjustable height desk for sitting or standing work.",
    image: "https://source.unsplash.com/300x200/?standing+desk",
    availability: true,
    ratings: 4.7,
    reviews: [
      { user: "Eve", comment: "Really helps my back pain." },
      { user: "Frank", comment: "Solid build and easy to adjust." }
    ]
  },
  {
    name: "Yoga Mat",
    category: "Fitness",
    price: 25.0,
    description: "Non-slip yoga mat for home or studio use.",
    image: "https://source.unsplash.com/300x200/?yoga+mat",
    availability: true,
    ratings: 4.3,
    reviews: [
      { user: "Grace", comment: "Nice grip and thickness." }
    ]
  },
  {
    name: "LED Desk Lamp",
    category: "Home Decor",
    price: 40.0,
    description: "Energy-efficient desk lamp with brightness controls.",
    image: "https://source.unsplash.com/300x200/?desk+lamp",
    availability: false,
    ratings: 3.9,
    reviews: [
      { user: "Hank", comment: "Stylish design but not very bright." }
    ]
  },
  {
    name: "Gaming Keyboard",
    category: "Electronics",
    price: 79.99,
    description: "Mechanical RGB keyboard with customizable lighting.",
    image: "https://source.unsplash.com/300x200/?keyboard",
    availability: true,
    ratings: 4.8,
    reviews: [
      { user: "Ian", comment: "Awesome keys and lights!" }
    ]
  },
  {
    name: "Fitness Tracker",
    category: "Fitness",
    price: 49.99,
    description: "Track steps, heart rate, and calories burned.",
    image: "https://source.unsplash.com/300x200/?fitness+tracker",
    availability: true,
    ratings: 4.1,
    reviews: [
      { user: "Jill", comment: "Accurate and long battery life." }
    ]
  },
  {
    name: "Air Purifier",
    category: "Home Appliances",
    price: 120.0,
    description: "Cleans air from allergens and pollutants.",
    image: "https://source.unsplash.com/300x200/?air+purifier",
    availability: true,
    ratings: 4.0,
    reviews: [
      { user: "Ken", comment: "Silent and effective!" }
    ]
  },
  {
    name: "Bookshelf",
    category: "Furniture",
    price: 89.0,
    description: "Modern 5-tier bookshelf for home or office.",
    image: "https://source.unsplash.com/300x200/?bookshelf",
    availability: true,
    ratings: 4.6,
    reviews: [
      { user: "Lara", comment: "Looks great in my room!" }
    ]
  },
  {
    name: "Electric Kettle",
    category: "Home Appliances",
    price: 29.99,
    description: "Boil water fast with auto shut-off safety.",
    image: "https://source.unsplash.com/300x200/?electric+kettle",
    availability: true,
    ratings: 4.0,
    reviews: [
      { user: "Mike", comment: "Fast and safe." }
    ]
  },
  {
    name: "Laptop Stand",
    category: "Accessories",
    price: 34.99,
    description: "Adjustable stand for laptops or tablets.",
    image: "https://source.unsplash.com/300x200/?laptop+stand",
    availability: true,
    ratings: 4.4,
    reviews: [
      { user: "Nina", comment: "Ergonomic and sturdy." }
    ]
  },
  {
    name: "Smart Light Bulb",
    category: "Electronics",
    price: 19.99,
    description: "Wi-Fi-enabled bulb with app and voice control.",
    image: "https://source.unsplash.com/300x200/?smart+bulb",
    availability: false,
    ratings: 3.6,
    reviews: [
      { user: "Omar", comment: "Works well with Alexa." }
    ]
  },
  {
    name: "Whiteboard",
    category: "Office",
    price: 45.99,
    description: "Magnetic whiteboard with dry erase markers.",
    image: "https://source.unsplash.com/300x200/?whiteboard",
    availability: true,
    ratings: 4.3,
    reviews: [
      { user: "Pam", comment: "Helps with my study planning." }
    ]
  },
  {
    name: "Portable Projector",
    category: "Electronics",
    price: 199.99,
    description: "Mini projector perfect for home cinema or presentations.",
    image: "https://source.unsplash.com/300x200/?projector",
    availability: true,
    ratings: 4.7,
    reviews: [
      { user: "Quinn", comment: "Clear image and compact size." }
    ]
  }
];

// Save to localStorage only if not already present
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(products));
}
