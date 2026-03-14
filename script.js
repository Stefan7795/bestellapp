// Daten im array:
const menu = [
  { name: "Pizza Krabben", price: 9.5, category: "Hauptgerichte" },
  { name: "Krabbenburger", price: 5.9, category: "Hauptgerichte" },
  { name: "Krabben Ei Burger", price: 8.5, category: "Hauptgerichte" },
  { name: "Hausgemachter Veggie-Burger", price: 12.9, category: "Hauptgerichte" },
  { name: "Schoko Muffin", price: 3.0, category: "Nachspeisen" },
  { name: "Tiramisu", price: 4.5, category: "Nachspeisen" },
  { name: "Cola (0,5l)", price: 2.5, category: "Getränke" },
  { name: "Wasser mit Plankton geschmack(0,5l)", price: 2.0, category: "Getränke" },
  { name: "Tee mit Quallenstücke (Bubble-Tea) (0,5l)", price: 2.0, category: "Getränke" },
];

//  holt werte auf local storage 
window.cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cart = window.cart;

//  Menü anzeigen 
function renderMenu() {
  const kategorien = ["Hauptgerichte", "Nachspeisen", "Getränke"];

  for (let k = 0; k < kategorien.length; k++) {
    const kategorie = kategorien[k];
    const bereich = document.getElementById(kategorie);
    if (!bereich) continue;
    bereich.innerHTML = "";

    // menüeinträge filtern
    const gefiltert = [];
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].category === kategorie) {
        gefiltert.push(menu[i]);
      }
    }

    // einträge anzeigen
    for (let j = 0; j < gefiltert.length; j++) {
      const item = gefiltert[j];
      const index = menu.indexOf(item);
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `
        <div class="menu-item-info">
          <strong>${item.name}</strong>
          <span class="menu-item-price">${item.price.toFixed(2).replace(".", ",")} €</span>
        </div>
        <button class="add-btn" onclick="addToCart(${index})" aria-label="${item.name} hinzufügen">+</button>
      `;
      bereich.appendChild(div);
    }
  }
}

// artikel zum Warenkorb hinzufügen
function addToCart(index) {
  const artikel = menu[index];
  let gefunden = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === artikel.name) {
      gefunden = cart[i];
      break;
    }
  }

  if (gefunden) {
    gefunden.qty++;
  } else {
    cart.push({ ...artikel, qty: 1 });
  }

  updateCart();
}

// menge erhöhen 
function increaseQty(i) {
  cart[i].qty++;
  updateCart();
}

// menge verringern 
function decreaseQty(i) {
  if (cart[i].qty > 1) {
    cart[i].qty--;
  } else {
    cart.splice(i, 1);
  }
  updateCart();
}

//  Artikel entfernen 
function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

// Start der funktionen
renderMenu();
updateCart();

// bestellen
const orderBtn = document.getElementById("order-btn");
const orderModal = document.getElementById("order-modal");
const orderModalCloseBtn = document.getElementById("order-modal-close");

function openOrderModal() {
  if (!orderModal) return;
  orderModal.classList.add("open");
  orderModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeOrderModalAndClearCart() {
  if (!orderModal) return;

  orderModal.classList.remove("open");
  orderModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");

  cart.length = 0;
  updateCart();
  closeCart();
}

if (orderBtn) {
  orderBtn.addEventListener("click", function () {
    if (cart.length === 0) return;
    openOrderModal();
  });
}

if (orderModalCloseBtn) {
  orderModalCloseBtn.addEventListener("click", closeOrderModalAndClearCart);
}

// mobile cart öffnen/schließen
const cartEl = document.getElementById("cart");
const cartToggleBtn = document.getElementById("cart-toggle");
const cartCloseBtn = document.querySelector(".cart-close");

function openCart() {
  if (!cartEl || !cartToggleBtn) return;
  cartEl.classList.add("open");
  document.body.classList.add("no-scroll");
  cartToggleBtn.setAttribute("aria-expanded", "true");
}

function closeCart() {
  if (!cartEl || !cartToggleBtn) return;
  cartEl.classList.remove("open");
  document.body.classList.remove("no-scroll");
  cartToggleBtn.setAttribute("aria-expanded", "false");
}

if (cartToggleBtn) {
  cartToggleBtn.addEventListener("click", openCart);
}

if (cartCloseBtn) {
  cartCloseBtn.addEventListener("click", closeCart);
}
