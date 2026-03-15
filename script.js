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
renderMenu(menu);
updateCart();
const mobileCart = setupMobileCart();

setupOrderModal({
  canOpen: function () {
    return cart.length > 0;
  },
  onConfirm: function () {
    cart.length = 0;
    updateCart();
    mobileCart.closeCart();
  },
});
