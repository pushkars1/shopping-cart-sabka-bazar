import BaseView from "../views/baseView";
import cartView from "../views/cartView";
import { state } from "../model/store";
import { closeCartHandler, plusMinusButtonClickHandler, proceedToCheckoutHandler, removeItemFromCartHandler, resizeEventHandler } from "./cartController";

export const cartIconClickHandler = function (e) {
  if (state.cart.length === 0) {
    return alert("cart is empty");
  }

  cartView.loadCartContainerElements();
  cartView.clearHTML(cartView._shoppingcart);
  cartView.render(
    cartView._shoppingcart,
    {
      products: state.cart,
      cartTotal: state.cartTotal,
      cartCount: state.cartCount,
    },
    "afterbegin"
  );
  cartView.dynamicPositionShoppingCart();
  cartView.resizeEventListener(resizeEventHandler);

  cartView.closeCartListener(closeCartHandler);

  cartView.openCart();
  cartView.removeItemFromCartListener(removeItemFromCartHandler);
  cartView.plusMinusButtonClickListener(plusMinusButtonClickHandler);
  cartView.proceedToCheckoutListener(proceedToCheckoutHandler);
};
