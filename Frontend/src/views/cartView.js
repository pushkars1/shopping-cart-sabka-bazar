import { state } from "../model/store";
import BaseView from "./baseView";
import headerView from "./headerView";

class CartView extends BaseView {
  constructor() {
    super("cart");
  }

  saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  dynamicPositionShoppingCart() {
    const headerContainer = headerView._parentElement;
    const headerChild = headerView._parentElement.firstChild;
    if (window.innerWidth <= 400) {
      this._mainCart.style.right = 20 + "px";
    } else if (window.innerWidth <= 600) {
      this._mainCart.style.right =
        (this._bodyContainer.offsetWidth - headerChild.offsetWidth) / 2 +
        20 +
        "px";
    } else if (window.innerWidth >= 1200) {
      this._mainCart.style.right =
        (window.innerWidth - headerChild.offsetWidth) / 2 + 30 + "px";
    } else {
      this._mainCart.style.right =
        (this._bodyContainer.offsetWidth - this._mainContainer.offsetWidth) /
          2 +
        30 +
        "px";
    }
    this._mainCart.style.top = headerContainer.offsetHeight + 35 + "px";
  }

  closeCart() {
    // console.log(this._shoppingcart.children);
    this._shoppingcart.removeChild(this._shoppingcart.children[0]);
    this._shoppingcart.classList.remove("shopping-cart__active");
    this._backdrop.classList.remove("backdrop__show");
    this._mainCart.style.display = 'none';
    this._mainCart.style.zIndex = 0;
    this._backdrop.style.zIndex = 0;
  }

  openCart() {
    this._shoppingcart.classList.add("shopping-cart__active");
    this._backdrop.classList.add("backdrop__show");
    this._mainCart.style.display = "block";
    this._mainCart.style.zIndex = 200;
    this._backdrop.style.zIndex = 100;
  }

  getCartTotalAndItemCount(cart) {
    let cartItemCount = 0;
    let cartTotal = 0;
    cart.map((item) => {
      (cartTotal += item.price * item.qty), (cartItemCount += item.qty);
    });
    return {
      cartItemCount,
      cartTotal: parseFloat(cartTotal).toFixed(2),
    };
  }

  getCartFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cart"));
  }

  updateCart(cart) {
    const { cartItemCount, cartTotal } = this.getCartTotalAndItemCount(cart);
    state.cartTotal = cartTotal;
    state.cartCount = cartItemCount;
  }

  closeCartListener(handler) {
    this._mainCart
      .querySelector(".close-icon")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        handler();
      });
  }

  removeItemFromCartListener(handler) {
    const removeIcons = [...this._mainCart.querySelectorAll(".remove__icon")];
    removeIcons.forEach((icon) => {
      icon.addEventListener("click", handler);
    });
  }

  removeProductFromCart(id) {
    state.cart = state.cart.filter((item) => item.id !== id);
  }

  resizeEventListener(handler) {
    window.addEventListener("resize", handler);
  }

  plusMinusButtonClickListener(handler) {
    const minusIcons = [...document.querySelectorAll(".minus-sign")];
    const plusIcons = [...document.querySelectorAll(".plus-sign")];

    minusIcons.forEach((icon) =>
      icon.addEventListener("click", function (e) {
        handler("minus", e);
      })
    );

    plusIcons.forEach((icon) =>
      icon.addEventListener("click", function (e) {
        handler("plus", e);
      })
    );
  }

  proceedToCheckoutListener(handler) {
    const btn = document.querySelector(".checkout-btn");
    btn.addEventListener("click", handler);
  }
}

export default new CartView();
