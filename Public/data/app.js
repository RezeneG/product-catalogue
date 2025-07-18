document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("category-filter");
  const productContainer = document.getElementById("product-container");

  function renderProducts(productList) {
    productContainer.innerHTML = ""; // Clear before re-rendering

    productList.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <strong>$${product.price.toFixed(2)}</strong><br />
        Status:
        <span class="${product.available ? 'in-stock' : 'out-of-stock'}">
          ${product.available ? '✅ In Stock' : '❌ Out of Stock'}
        </span>
      `;

      productContainer.appendChild(card);
    });
  }

  // Initial render
  renderProducts(products);

  // Filter listener
  categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "All") {
      renderProducts(products);
    } else {
      const filtered = products.filter(
        (p) => p.category === selectedCategory
      );
      renderProducts(filtered);
    }
  });
});
