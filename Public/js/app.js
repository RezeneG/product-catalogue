document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
});

function renderProducts(productList) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};

  productList.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const fullStars = Math.floor(product.rating);
    const stars = "★".repeat(fullStars) + "☆".repeat(5 - fullStars);

    const allReviews = [...(product.reviews || []), ...(storedReviews[product.id] || [])];
    const reviewsHtml = allReviews.length
      ? allReviews.map(r => `<li>${r}</li>`).join("")
      : "<li>No reviews yet.</li>";

    const stockStatus = product.inStock
      ? `<span class="in-stock">✅ In Stock</span>`
      : `<span class="out-of-stock">❌ Out of Stock</span>`;

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3>${product.name}</h3>
      <p>£${product.price.toFixed(2)}</p>
      <p>Status: ${stockStatus}</p>
      <p class="rating">Rating: ${stars} (${product.rating.toFixed(1)})</p>
      <ul class="review-list">${reviewsHtml}</ul>
      <form class="review-form">
        <input type="text" placeholder="Write a review..." required />
        <button type="submit">Submit</button>
      </form>
    `;

    // Add review submission handling
    const form = productCard.querySelector(".review-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector("input");
      const newReview = input.value.trim();
      if (newReview === "") return;

      if (!storedReviews[product.id]) storedReviews[product.id] = [];
      storedReviews[product.id].push(newReview);
      localStorage.setItem("reviews", JSON.stringify(storedReviews));

      input.value = "";
      renderProducts(productList); // Re-render
    });

    container.appendChild(productCard);
  });
}
