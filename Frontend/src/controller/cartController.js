import { state } from "../model/store";
import cartView from "../views/cartView";
import headerView from "../views/headerView";
import productsView from "../views/productsView";
import routesView from "../views/routesView";

export const resizeEventHandler = function (_) {
  cartView.dynamicPositionShoppingCart();
};

export const closeCartHandler = function () {
  cartView.closeCart();
};

export const removeItemFromCartHandler = function (e) {
  if (e) {
    const { id } = e.target.dataset;

    ////remove the item from cart
    cartView.removeProductFromCart(id); ////remove item from state.cart

    cartView.updateCart(state.cart); /////update cart total and count

    headerView.update({ count: state.cartCount }); //////////////update hedaer view

    ////remove cart item from dom
    const cartProductsContainer = document.querySelector(".cart__products");
    const cartProducts = [...document.querySelectorAll(".cart__product")];
    const product = cartProducts.find((item) => item.dataset.id === id);
    cartProductsContainer.removeChild(product);

    ////enable the buy now button
    const button = productsView.getButton(id);
    if (button) {
      button.disabled = false;
      button.innerText = "Buy Now";
    }

    cartView.update({
      products: state.cart,
      cartTotal: state.cartTotal,
      cartCount: state.cartCount,
    });

    cartView.saveCartToLocalStorage(state.cart);
  }
};

export const plusMinusButtonClickHandler = function (opeartion, event) {
  const id = event.target.dataset.id;
  const product = state.cart.find((item) => item.id === id);
  // console.log(product);
  if (opeartion === "plus" && product.stock >= product.qty) {
    product.qty += 1;
  }
  if (opeartion === "minus" && product.qty - 1 > 0) {
    product.qty -= 1;
  }
  product.productTotal = product.qty * product.price;

  cartView.updateCart(state.cart);

  headerView.update({ count: state.cartCount });

  cartView.update({
    products: state.cart,
    cartTotal: state.cartTotal,
    cartCount: state.cartCount,
  });
  // cartOpenHandler();
  cartView.saveCartToLocalStorage(state.cart);
};

export const proceedToCheckoutHandler = function () {
  if (state.auth.loggedIn) {
    alert("order placed successfully");
  } else {
    alert("signin to proceed further");
    cartView.closeCart();
    routesView.navigateTo('/signin');
  }
};
