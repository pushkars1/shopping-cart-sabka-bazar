import registerView from "../views/registerView";
import signinView from "../views/signinView";
import routesView from "../views/routesView";
import { routerController } from "./routesController";
import { state } from "../model/store";
import { headerTemplate } from "../..";
import headerView from "../views/headerView";
import cartView from "../views/cartView";
import { cartIconClickHandler } from "./baseController";
import sidedrawerView from "../views/sidedrawerView";

const submitFormEvent = function (data) {
  //api calls

  const users = registerView.getUsersFromLocalStorage();
  if (!users) return;
  const user = users.find((item) => item.email === data.email);
  if (!user) {
    routesView.navigateTo("/register");
    return routerController();
  }
  state.auth = {
    ...state.auth,
    loggedIn: true,
    userDetails: data,
  };

  routesView.navigateTo("/products");
  routerController();
  headerView.clearHTML(headerView._parentElement);
  headerView.render(
    headerView._parentElement,
    { count: state.cartCount },
    "afterbegin"
  );
  cartView.cartIconClickListener(cartIconClickHandler);

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
      if (sidedrawernav.classList.contains("side-drawer__active")) {
        sidedrawernav.parentElement.style.zIndex = 0;
      } else {
        sidedrawernav.parentElement.style.zIndex = 90;
      }
      sidedrawernav.classList.toggle("side-drawer__active");
    };
  }
  // headerTemplate(state.cartCount);
};

const init = function () {
  signinView.submitEvent(submitFormEvent);
};

export default init;
