function formatMenuPrice(price) {
  return price.toFixed(2).replace(".", ",") + " €";
}

function getItemsByCategory(menu, category) {
  const filtered = [];
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].category === category) {
      filtered.push(menu[i]);
    }
  }
  return filtered;
}

function getMenuItemHtml(item, index) {
  return `
    <div class="menu-item">
      <div class="menu-item-info">
        <strong>${item.name}</strong>
        <span class="menu-item-price">${formatMenuPrice(item.price)}</span>
      </div>
      <button class="add-btn" onclick="addToCart(${index})" aria-label="${item.name} hinzufügen">+</button>
    </div>
  `;
}

function renderMenu(menu) {
  const categories = ["Hauptgerichte", "Nachspeisen", "Getränke"];

  for (let k = 0; k < categories.length; k++) {
    const category = categories[k];
    const container = document.getElementById(category);
    if (!container) continue;

    const filtered = getItemsByCategory(menu, category);
    let menuHtml = "";

    for (let j = 0; j < filtered.length; j++) {
      const item = filtered[j];
      const index = menu.indexOf(item);
      menuHtml += getMenuItemHtml(item, index);
    }

    container.innerHTML = menuHtml;
  }
}
