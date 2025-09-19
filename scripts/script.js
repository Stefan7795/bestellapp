// Alle Gerichte (Daten)
const menu = [
  // Hauptgerichte
  { name: "Pizza Krabben", price: 9.5, category: "Hauptgerichte" },
  { name: "Krabbenburger", price: 5.9, category: "Hauptgerichte" },
  { name: "Krabben Ei Burger", price: 8.5, category: "Hauptgerichte" },
  { name: "Hausgemachter Veggie-Burger", price: 12.9, category: "Hauptgerichte" },

  // Nachspeisen
  { name: "Schoko Muffin", price: 3.0, category: "Nachspeisen" },
  { name: "Tiramisu", price: 4.5, category: "Nachspeisen" },

  // Getränke
  { name: "Cola (0,5l)", price: 2.5, category: "Getränke" },
  { name: "Wasser mit Plankton geschmack(0,5l)", price: 2.0, category: "Getränke" },
  { name: "Tee mit Quallenstücke (Bubble-Tea) (0,5l)", price: 2.0, category: "Getränke" },
];

// cart (aus localStorage holen oder leeres Array)
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// hilfsfunktion: Euro anzeigen (einfach)
function euro(value) {
  return value.toFixed(2) + " €";
}

// menü in die bereiche schreiben
function renderMenu() {
  // IDs in HTML: #Hauptgerichte, #Nachspeisen, #Getränke
  const kategorien = ["Hauptgerichte", "Nachspeisen", "Getränke"];

  kategorien.forEach((kategorie) => {
    const bereich = document.getElementById(kategorie);
    bereich.innerHTML = ""; // vorsichtshalber leeren

    // hole alle passenden Gerichte für diese Kategorie 
    const gefiltert = menu.filter((item) => item.category === kategorie);

    // zeile für gericht bauen 
    gefiltert.forEach((item) => {
      const index = menu.indexOf(item); // index über menu
      const div = document.createElement("div");

      // 
      div.innerHTML = `
        <strong>${item.name}</strong><br>
        ${euro(item.price)}
        <button onclick="addToCart(${index})">+</button>
        <hr>
      `;

      bereich.appendChild(div);
    });
  });
}

// artikel in den cart legen
function addToCart(index) {
  const artikel = menu[index];

  // Prüfen ob es den Artikel schon im cart gibt
  const gefunden = cart.find((x) => x.name === artikel.name);

  if (gefunden) {
    // Menge erhöhen
    gefunden.qty++;
  } else {
    // Neu hinzufügen mit qty = 1
    cart.push({ ...artikel, qty: 1 });
  }

  updateCart();
}

// zeige cart + gesamte summen rechnen + speichern
function updateCart() {
  const liste = document.getElementById("cart-items");
  liste.innerHTML = ""; // alte Einträge löschen

  let summe = 0;

  if (cart.length === 0) {
    // Hinweis, wenn leer
    const li = document.createElement("li");
    li.textContent = "Your cart is empty.";
    liste.appendChild(li);
  } else {
    // jeden artikel im cart als li anzeigen
    cart.forEach((item, i) => {
      const li = document.createElement("li");

      // Name
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = item.name;

      // menge steuern (— 3x +)
      const controls = document.createElement("span");
      controls.className = "controls";

      const wenigerBtn = document.createElement("button");
      wenigerBtn.className = "qty-btn";
      wenigerBtn.type = "button";
      wenigerBtn.textContent = "−";
      wenigerBtn.onclick = function () {
        decreaseQty(i);
      };

      const anzahl = document.createElement("span");
      anzahl.className = "count";
      anzahl.textContent = item.qty + "x";

      const mehrBtn = document.createElement("button");
      mehrBtn.className = "qty-btn";
      mehrBtn.type = "button";
      mehrBtn.textContent = "+";
      mehrBtn.onclick = function () {
        increaseQty(i);
      };

      controls.appendChild(wenigerBtn);
      controls.appendChild(anzahl);
      controls.appendChild(mehrBtn);

      // menge * preis
      const postenPreis = item.price * item.qty;
      const preis = document.createElement("span");
      preis.className = "price";
      preis.textContent = euro(postenPreis);

      // lösch-btn
      const loeschBtn = document.createElement("button");
      loeschBtn.className = "remove-btn";
      loeschBtn.type = "button";
      loeschBtn.setAttribute("aria-label", "Remove");
      loeschBtn.textContent = "🗑️";
      loeschBtn.onclick = function () {
        removeItem(i);
      };

      // zusammenbauen
      li.appendChild(name);
      li.appendChild(controls);
      li.appendChild(preis);
      li.appendChild(loeschBtn);
      liste.appendChild(li);

      // Summe erhöhen 
      summe += postenPreis;
    });
  }

  // Summen im DOM setzen
  document.getElementById("subtotal").textContent = euro(summe);

  const shipping = 5; // einfach fix 5 €
  document.querySelector("#summary p:nth-child(2) span").textContent = euro(shipping);

  const total = summe + shipping;
  document.getElementById("total").textContent = euro(total);

  // cart speichern
  localStorage.setItem("cart", JSON.stringify(cart));

  // btn soll nur aktiv sein, wenn cart nicht leer ist
  const btn = document.getElementById("order-btn");
  if (btn) btn.disabled = cart.length === 0;
}

// menge der produkte erhöhen
function increaseQty(i) {
  cart[i].qty++;
  updateCart();
}

// menge der produkte verringern oder entfernen
function decreaseQty(i) {
  if (cart[i].qty > 1) {
    cart[i].qty--;
  } else {
    cart.splice(i, 1); // wenn 1 → Eintrag löschen
  }
  updateCart();
}

// Komplett entfernen
function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

// cart im handymodus (bleiber btn)
const cartFab = document.getElementById("cart-toggle");
const cartAside = document.getElementById("cart");
const cartClose = cartAside.querySelector(".cart-close");

// cart im handymodus öffnen
function openCart() {
  cartAside.classList.add("open");
  document.body.classList.add("no-scroll");
  cartFab.setAttribute("aria-expanded", "true");
}
// cart schließen
function closeCart() {
  cartAside.classList.remove("open");
  document.body.classList.remove("no-scroll");
  cartFab.setAttribute("aria-expanded", "false");
}

// btn unten
cartFab.addEventListener("click", function () {
  if (cartAside.classList.contains("open")) {
    closeCart();
  } else {
    openCart();
  }
});

// schließen btn im overlay
cartClose.addEventListener("click", closeCart);

// overlay schließen, wenn man außerhalb klickt
cartAside.addEventListener("click", function (e) {
  if (e.target.classList.contains("cart-close")) {
    return;
  }

  if (!e.target.closest("#cart")) {
    closeCart();
  }
});

// beim laden alles anzeigen
renderMenu();
updateCart();

// order-btn mit meldung
const orderBtn = document.getElementById("order-btn");
if (orderBtn) {
  orderBtn.addEventListener("click", function () {
    alert("Die Bestellung ist eingegangen ! Vielen Dank !");
  });
}
