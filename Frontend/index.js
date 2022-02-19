require("babel-core/register");
// require("babel-polyfill");
global._babelPolyfill = false;

import sidedrawerView from "./src/views/sidedrawerView";
import cartView from "./src/views/cartView";
import routesInit from "./src/controller/routesController";
import { state } from "./src/model/store";
import { cartIconClickHandler } from "./src/controller/baseController";

import "./main.scss";
import headerView from "./src/views/headerView";
function init() {
  state.cart = cartView.getCartFromLocalStorage() || [];
  const { cartItemCount, cartTotal } = cartView.getCartTotalAndItemCount(
    state.cart
  );
  state.cartTotal = cartTotal;
  state.cartCount = cartItemCount;

  headerView.render(
    headerView._parentElement,
    { count: state.cartCount },
    "afterbegin"
  );
  cartView.cartIconClickListener(cartIconClickHandler);
  //////////////////load sidedrawer///////////////////
  if (window.innerWidth < 401) {
    sidedrawerView.render(
      document.getElementById("side-drawer"),
      {},
      "afterbegin"
    );
    const sidedrawernav = document.querySelector(".side-drawer__nav");
    const navlinks = document.querySelectorAll(".side-drawer__nav a");
    navlinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        sidedrawernav.classList.remove("side-drawer__active");
      });
    });
    document.querySelector(".menu-btn").onclick = () => {
      if (sidedrawernav.classList.contains('side-drawer__active')) {
        sidedrawernav.parentElement.style.zIndex = 0;
      } else {
        sidedrawernav.parentElement.style.zIndex = 90;
      }
      sidedrawernav.classList.toggle("side-drawer__active");
    };
  }

  ////////////render header view///////////////////////

  routesInit();
}

init();
