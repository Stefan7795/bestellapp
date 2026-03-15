function setupMobileCart() {
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

  return { openCart, closeCart };
}

function setupOrderModal(options) {
  const { canOpen, onConfirm } = options;
  const orderBtn = document.getElementById("order-btn");
  const orderModal = document.getElementById("order-modal");
  const orderModalCloseBtn = document.getElementById("order-modal-close");

  function openOrderModal() {
    if (!orderModal) return;
    orderModal.classList.add("open");
    orderModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove("open");
    orderModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  if (orderBtn) {
    orderBtn.addEventListener("click", function () {
      if (!canOpen()) return;
      openOrderModal();
    });
  }

  if (orderModalCloseBtn) {
    orderModalCloseBtn.addEventListener("click", function () {
      closeOrderModal();
      onConfirm();
    });
  }
}
