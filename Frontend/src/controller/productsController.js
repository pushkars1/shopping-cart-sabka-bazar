import productsView from "../views/productsView";
import cartView from "../views/cartView";
import {state} from "../model/store";
import headerView from "../views/headerView";

export const buyNowBtnClickHandler = async function (event, id) {
  /////get product by ID
  const product = await productsView.getProduct(id);

  /////add product to cart
  state.cart = [...state.cart, { ...product, qty: 1, productTotal: product.price }];

  //////update the cart count and total
  cartView.updateCart(state.cart);

  //////////update item count in the header view
  headerView.update({ count: state.cartCount });

  /////////update the local storage
  cartView.saveCartToLocalStorage(state.cart);
};
