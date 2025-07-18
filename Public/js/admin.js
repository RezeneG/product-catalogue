// === Select DOM Elements ===
const form = document.getElementById("adminForm");
const editIndexInput = document.getElementById("editIndex");

const nameInput = document.getElementById("productName");
const descInput = document.getElementById("productDescription");
const priceInput = document.getElementById("productPrice");

const categorySelect = document.getElementById("categorySelect");
const newCategoryInput = document.getElementById("newCategoryInput");
const toggleNewCategoryBtn = document.getElementById("toggleNewCategory");

const imageInput = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");

const availabilityInput = document.getElementById("productAvailable");

const successMessage = document.getElementById("successMessage");
const successText = document.getElementById("successText");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

const productList = document.getElementById("productList");

const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

const submitButton = document.getElementById("submitButton");
const cancelEditBtn = document.getElementById("cancelEdit");

const themeToggle = document.getElementById("themeToggle");

// === Data: load products from localStorage or start with empty array ===
let products = JSON.parse(localStorage.getItem("products")) || [];

// === Utility functions ===

// Show an alert message for success or error
function showAlert(element, message) {
  element.textContent = message;
  element.parentElement.classList.remove("d-none");
  setTimeout(() => {
    element.parentElement.classList.add("d-none");
  }, 4000);
}

// Validate URL format for image link
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// Clear form inputs and reset form state
function clearForm() {
  form.reset();
  imagePreview.src = "";
  imagePreview.style.display = "none";
  editIndexInput.value = "";
  submitButton.textContent = "Add Product";
  cancelEditBtn.classList.add("d-none");

  // Reset category inputs
  if (!newCategoryInput.classList.contains("d-none")) {
    toggleCategoryInput();
  }
}

// Get unique categories from products array
function getCategories() {
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
  cats.sort();
  return cats;
}

// Populate category dropdown and filter dropdown
function populateCategoryDropdowns() {
  // Clear existing options
  categorySelect.innerHTML = "";
  filterCategory.innerHTML = '<option value="">All categories</option>';

  // Add default option to category select
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select category";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  categorySelect.appendChild(defaultOption);

  getCategories().forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);

    // For filter dropdown
    const filterOption = document.createElement("option");
    filterOption.value = cat;
    filterOption.textContent = cat;
    filterCategory.appendChild(filterOption);
  });
}

// Calculate average rating or return no ratings message
function getAverageRating(ratings) {
  if (!ratings || ratings.length === 0) return "No ratings yet";
  const avg = ratings.reduce((a,b) => a+b, 0) / ratings.length;
  return `⭐ ${avg.toFixed(1)} (${ratings.length})`;
}

// Render product cards with Edit and Delete buttons
function renderProducts(filteredProducts = null) {
  productList.innerHTML = "";
  const list = filteredProducts || products;

  if (list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((product, idx) => {
    const card = document.createElement("div");
    card.className = "col";

    card.innerHTML = `
      <div class="card h-100" tabindex="0" aria-label="Product: ${product.name}">
        <img src="${product.image}" alt="${product.name}" class="card-img-top" style="max-height: 180px; object-fit: contain;"
          onerror="this.onerror=null; this.src='https://via.placeholder.com/180x150?text=No+Image';" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text flex-grow-1">${product.description}</p>
          <p class="card-text"><strong>Category:</strong> ${product.category}</p>
          <p class="card-text"><strong>Price:</strong> £${product.price.toFixed(2)}</p>
          <p class="card-text"><strong>Availability:</strong> ${product.availability ? "Available" : "Unavailable"}</p>
          <p class="card-text"><strong>Rating:</strong> ${getAverageRating(product.ratings)}</p>
          <div class="mt-auto">
            <button class="btn btn-primary btn-sm edit-btn" data-index="${idx}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${idx}">Delete</button>
          </div>
        </div>
      </div>
    `;

    productList.appendChild(card);
  });

  // Attach event listeners for Edit/Delete buttons
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", handleDelete);
  });
}

// Handle clicking Edit - prefill form for editing product
function handleEdit(e) {
  const index = e.target.dataset.index;
  const product = products[index];
  if (!product) return;

  nameInput.value = product.name;
  descInput.value = product.description;
  priceInput.value = product.price;
  imageInput.value = product.image;
  imagePreview.src = product.image;
  imagePreview.style.display = "block";
  availabilityInput.checked = product.availability;

  // Handle category input toggle for existing category
  if (getCategories().includes(product.category)) {
    if (newCategoryInput.classList.contains("d-none")) {
      categorySelect.value = product.category;
    } else {
      toggleCategoryInput();
      categorySelect.value = product.category;
    }
  } else {
    if (!newCategoryInput.classList.contains("d-none")) {
      newCategoryInput.value = product.category;
    } else {
      toggleCategoryInput();
      newCategoryInput.value = product.category;
    }
  }

  editIndexInput.value = index;
  submitButton.textContent = "Update Product";
  cancelEditBtn.classList.remove("d-none");
  nameInput.focus();
}

// Handle clicking Delete - confirm and remove product
function handleDelete(e) {
  const index = e.target.dataset.index;
  if (confirm(`Delete "${products[index].name}"?`)) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    populateCategoryDropdowns();
    applyFilters();
    showAlert(successText, "Product deleted successfully.");
    clearForm();
  }
}

// Validate form inputs before submission
function validateForm() {
  let valid = true;

  // Reset previous error styling
  [nameInput, descInput, priceInput, categorySelect, newCategoryInput, imageInput].forEach(el => {
    el.classList.remove("is-invalid");
  });

  if (!nameInput.value.trim()) {
    nameInput.classList.add("is-invalid");
    valid = false;
  }
  if (!descInput.value.trim()) {
    descInput.classList.add("is-invalid");
    valid = false;
  }
  if (!priceInput.value || parseFloat(priceInput.value) <= 0) {
    priceInput.classList.add("is-invalid");
    valid = false;
  }

  if (!newCategoryInput.classList.contains("d-none")) {
    if (!newCategoryInput.value.trim()) {
      newCategoryInput.classList.add("is-invalid");
      valid = false;
    }
  } else {
    if (!categorySelect.value) {
      categorySelect.classList.add("is-invalid");
      valid = false;
    }
  }

  if (!imageInput.value.trim() || !isValidURL(imageInput.value.trim())) {
    imageInput.classList.add("is-invalid");
    valid = false;
  }

  return valid;
}

// Toggle category input between select and new category input
function toggleCategoryInput() {
  newCategoryInput.classList.toggle("d-none");
  categorySelect.classList.toggle("d-none");
  toggleNewCategoryBtn.textContent = newCategoryInput.classList.contains("d-none")
    ? "Add new category"
    : "Select existing category";
}

// Apply search and category filters and render products
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const filterCat = filterCategory.value;

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);
    const matchesCategory = filterCat ? p.category === filterCat : true;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

// === Event Listeners ===

// Preview image URL input
imageInput.addEventListener("input", () => {
  if (isValidURL(imageInput.value.trim())) {
    imagePreview.src = imageInput.value.trim();
    imagePreview.style.display = "block";
  } else {
    imagePreview.style.display = "none";
  }
});

// Toggle between category select and new category input
toggleNewCategoryBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCategoryInput();
});

// Handle form submission (add or update product)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showAlert(errorText, "Please fix the errors in the form.");
    return;
  }

  const category = newCategoryInput.classList.contains("d-none")
    ? categorySelect.value
    : newCategoryInput.value.trim();

  const editIndex = editIndexInput.value;

  // Preserve existing ratings if editing
  const existingRatings = editIndex ? (products[editIndex].ratings || []) : [];

  const product = {
    name: nameInput.value.trim(),
    description: descInput.value.trim(),
    price: parseFloat(priceInput.value),
    category: category,
    image: imageInput.value.trim(),
    availability: availabilityInput.checked,
    ratings: existingRatings,
  };

  if (editIndex) {
    products[editIndex] = product;
    showAlert(successText, "Product updated successfully.");
  } else {
    products.push(product);
    showAlert(successText, "Product added successfully.");
  }

  localStorage.setItem("products", JSON.stringify(products));
  populateCategoryDropdowns();
  applyFilters();
  clearForm();
});

// Cancel editing and clear form
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clearForm();
});

// Search and category filter inputs
searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);

// Theme toggle button
themeToggle.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "Switch to Light Theme";
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "Switch to Dark Theme";
  }
});

// === Initialization ===
function init() {
  // Check admin login status stored in sessionStorage
  if (!sessionStorage.getItem("isAdmin")) {
    alert("You must be logged in as admin!");
    window.location.href = "login.html"; // Redirect if not logged in
    return;
  }

  populateCategoryDropdowns();
  renderProducts();
  clearForm();

  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Switch to Light Theme";
  } else {
    themeToggle.textContent = "Switch to Dark Theme";
  }
}

init();
