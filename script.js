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

window.cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cart = window.cart;

function addToCart(index) {
  const artikel = menu[index];
  let existingItem = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === artikel.name) {
      existingItem = cart[i];
      break;
    }
  }

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...artikel, qty: 1 });
  }

  updateCart();
}

function increaseQty(i) {
  cart[i].qty++;
  updateCart();
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
