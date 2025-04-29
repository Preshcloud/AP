let allProducts = [];

async function fetchProducts() {
  try {
    const res = await fetch('products.json');
    const data = await res.json();
    allProducts = data;
    displayProducts(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-list');
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 150px; object-fit: contain;">
      <p>₦${product.price.toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}

document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);

function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const categoryValue = document.getElementById('categoryFilter').value;

  const filtered = allProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchValue);
    const matchesCategory = categoryValue === 'all' || product.category === categoryValue;
    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

fetchProducts();
