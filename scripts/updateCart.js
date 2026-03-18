function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function getCartItemHtml(item, i, itemTotalPrice) {
  return `
    <li>
      <span class="name">${item.name}</span>
      <span class="controls">
        <button class="cart-btn" onclick="decreaseQty(${i})">-</button>
        <span class="count">${item.qty}x</span>
        <button class="cart-btn" onclick="increaseQty(${i})">+</button>
      </span>
      <span class="price">${formatPrice(itemTotalPrice)}</span>
      <button class="cart-btn" onclick="removeItem(${i})">×</button>
    </li>
  `;
}

function updateCart() {
  const liste = document.getElementById("cart-items");
  if (!liste) return;
  liste.innerHTML = "";

  const cart = window.cart || [];
  let summe = 0;
  let totalCount = 0;

  if (cart.length === 0) {
    liste.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const itemTotalPrice = item.price * item.qty;
      summe += itemTotalPrice;
      totalCount += item.qty;
      liste.innerHTML += getCartItemHtml(item, i, itemTotalPrice);
    }
  }

  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(summe);

  const shipping = 5;

  const shippingSpan = document.querySelector("#summary p:nth-child(2) span");
  if (shippingSpan) shippingSpan.textContent = formatPrice(shipping);

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = formatPrice(summe + shipping);

  const btn = document.getElementById("order-btn");
  if (btn) btn.disabled = cart.length === 0;

  const cartCountBadge = document.getElementById("cart-count-badge");
  if (cartCountBadge) {
    if (totalCount > 0) {
      cartCountBadge.textContent = String(totalCount);
      cartCountBadge.classList.remove("is-hidden");
    } else {
      cartCountBadge.textContent = "";
      cartCountBadge.classList.add("is-hidden");
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
