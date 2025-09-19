// --- Daten ---
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

// --- Zustand ---
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// rendern menü
function renderMenu() {
  const kategorien = ["Hauptgerichte", "Nachspeisen", "Getränke"];

  kategorien.forEach((kategorie) => {
    const bereich = document.getElementById(kategorie);
    if (!bereich) return;
    bereich.innerHTML = "";

    const gefiltert = menu.filter((item) => item.category === kategorie);

    gefiltert.forEach((item) => {
      const index = menu.indexOf(item);
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${item.name}</strong><br>
        ${item.price.toFixed(2).replace(".", ",")} €
        <button onclick="addToCart(${index})">+</button>
        <hr>
      `;
      bereich.appendChild(div);
    });
  });
}

// Artikel in den Warenkorb legen
function addToCart(index) {
  const artikel = menu[index];        // artikel aus Menü holen

  // schauen, ob er schon im Warenkorb liegt
  const gefunden = cart.find(x => x.name === artikel.name);

  if (gefunden) {
    gefunden.qty++;                   // menge erhöhen
  } else {
    cart.push({ ...artikel, qty: 1 }); // artikel hinzufügen
  }

  updateCart(); // warenkorb neu anzeigen
}

function increaseQty(i) {
  cart[i].qty++;     // wert um 1 erhöhen
  updateCart();   // erneut rendern
}

function decreaseQty(i) {
  if (cart[i].qty > 1) {  
    cart[i].qty--;   
  } else {
    cart.splice(i, 1); 
  }
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart(); 
}

// --- Cart rendern ---
function updateCart() {
  const liste = document.getElementById("cart-items");
  if (!liste) return;
  liste.innerHTML = "";

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
            <button onclick="decreaseQty(${i})">-</button>
            <span>${item.qty}x</span>
            <button onclick="increaseQty(${i})">+</button>
          </span>
          <span class="price">${postenPreis.toFixed(2).replace(".", ",")} €</span>
          <button onclick="removeItem(${i})">🗑️</button>
        </li>
      `;
    }
  }

  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl) subtotalEl.textContent = summe.toFixed(2).replace(".", ",") + " €";

  const shipping = 5;
  const shippingSpan = document.querySelector("#summary p:nth-child(2) span");
  if (shippingSpan) shippingSpan.textContent = shipping.toFixed(2).replace(".", ",") + " €";

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = (summe + shipping).toFixed(2).replace(".", ",") + " €";

  const btn = document.getElementById("order-btn");
  if (btn) btn.disabled = cart.length === 0;
}

// --- Start ---
renderMenu();
updateCart();

const orderBtn = document.getElementById("order-btn");
if (orderBtn) {
  orderBtn.addEventListener("click", function () {
    alert("Die Bestellung ist eingegangen! Vielen Dank!");
  });
}
