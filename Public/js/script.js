<script>
  const productsPerPage = 10;
  let currentPage = 1;

  function renderStars(rating) {
    const fullStar = '★';
    const halfStar = '⯪';
    const emptyStar = '☆';
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const total = 5;
    let stars = fullStar.repeat(full);
    if (hasHalf) stars += halfStar;
    stars += emptyStar.repeat(total - stars.length);
    return stars;
  }

  function renderProducts() {
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    const search = searchInput.value.toLowerCase();

    let filtered = products.filter(p => {
      return (category === 'all' || p.category === category) &&
        (p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search));
    });

    switch (sort) {
      case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': filtered.sort((a, b) => b.rating - a.rating); break;
    }

    productList.innerHTML = '';

    if (filtered.length === 0) {
      productList.innerHTML = '<p>No products found.</p>';
      return;
    }

    // PAGINATION: slice the filtered products
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = filtered.slice(start, end);

    paginatedProducts.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';

      div.innerHTML = `
        <img src="Public/Images/${product.image}" alt="${product.name}"
          onerror="this.onerror=null;this.src='https://via.placeholder.com/220x140?text=No+Image';" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="price-rating">
          <span class="price">£${product.price.toFixed(2)}</span>
          <span class="rating">${renderStars(product.rating)}</span>
        </div>
        <div class="reviews">
          <strong>Reviews:</strong>
          <ul>${(product.reviews || []).map(review => `<li>${review}</li>`).join('')}</ul>
        </div>
        <button data-id="${product.id}">Add to Cart</button>
      `;

      productList.appendChild(div);

      // Fade-in effect
      requestAnimationFrame(() => {
        div.classList.add('fade-in');
      });
    });

    // Update pagination buttons
    renderPagination(filtered.length);
  }

  function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / productsPerPage);
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    paginationNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = 'pagination-number';
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');

      btn.addEventListener('click', () => {
        currentPage = i;
        renderProducts();
      });

      paginationNumbers.appendChild(btn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
      }
    };

    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
      }
    };
  }

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ product, quantity: 1 });
    }
    updateCartCount();
  }

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      document.getElementById('cart-total').textContent = 'Total: £0.00';
      return;
    }

    cart.forEach(({ product, quantity }, index) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${product.name}</span>
        <div class="quantity-controls">
          <button class="decrease" data-index="${index}">-</button>
          <span>${quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <span>£${(product.price * quantity).toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}" title="Remove">&times;</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = `Total: £${totalPrice.toFixed(2)}`;

    // Add listeners for quantity controls
    cartItemsContainer.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        cart[idx].quantity++;
        renderCart();
        updateCartCount();
      });
    });

    cartItemsContainer.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        if (cart[idx].quantity > 1) {
          cart[idx].quantity--;
        } else {
          cart.splice(idx, 1);
        }
        renderCart();
        updateCartCount();
      });
    });

    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.getAttribute('data-index');
        cart.splice(idx, 1);
        renderCart();
        updateCartCount();
      });
    });
  }

  // DOM Elements
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('category');
  const sortFilter = document.getElementById('sort');
  const searchInput = document.getElementById('search');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const closeCartBtn = document.getElementById('close-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('checkout-btn');
  let cart = [];

  // Event Listeners
  productList.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      addToCart(id);
    }
  });

  [categoryFilter, sortFilter, searchInput].forEach(el => {
    el.addEventListener('input', () => {
      currentPage = 1;
      renderProducts();
    });
  });

  cartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'flex';
  });

  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert('Checkout is not implemented in this demo.');
    }
  });

  cartModal.addEventListener('click', e => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  // Initial render
  renderProducts();
  updateCartCount();
</script>
