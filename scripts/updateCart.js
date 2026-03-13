function formatPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function updateCart() {
  const liste = document.getElementById("cart-items");
  if (!liste) return;
  liste.innerHTML = "";

  const cart = window.cart || [];
  let summe = 0;

  if (cart.length === 0) {
    liste.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      const postenPreis = item.price * item.qty;
      summe += postenPreis;

      liste.innerHTML += `
        <li>
          <span class="name">${item.name}</span>
          <span class="controls">
            <button class="cart-btn" onclick="decreaseQty(${i})">-</button>
            <span class="count">${item.qty}x</span>
            <button class="cart-btn" onclick="increaseQty(${i})">+</button>
          </span>
          <span class="price">${formatPrice(postenPreis)}</span>
          <button class="cart-btn" onclick="removeItem(${i})">×</button>
        </li>
      `;
    }
  }

  // zeigt die zwischensumme in card an
  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl) subtotalEl.textContent = formatPrice(summe);

  // meine Versandkosten:
  const shipping = 5;

  // zeigt meine Versandkosten im warenkorb-bereich an
  const shippingSpan = document.querySelector("#summary p:nth-child(2) span");
  if (shippingSpan) shippingSpan.textContent = formatPrice(shipping);

  // Gesamt anzeigen
  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = formatPrice(summe + shipping);

  // Bestellbtn deaktivieren, wenn der Warenkorb leer ist
  const btn = document.getElementById("order-btn");
  if (btn) btn.disabled = cart.length === 0;

  // Aktuellen Warenkorb im jetzt zustand in localstorage speichern
  localStorage.setItem("cart", JSON.stringify(cart));
}
