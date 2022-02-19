///////////////VIEWS////////////////////////////
import routesView from "../views/routesView";
import homeView from "../views/homeView";
import productsView from "../views/productsView";
import signinView from "../views/signinView";
import registerView from "../views/registerView";
import sliderView from "../views/sliderView";
import sliderDotsView from "../views/sliderDotsView";
import productsSidebarView from "../views/productsSidebarView";
import BaseView from "../views/baseView";

/////////////////CONTROLLERS///////////////////////////////////
import { slideLeftRightBtnClickHandler } from "./sliderController";
import { sliderDotsClickHandler } from "./sliderDotsController";

// import homeInit from "../controller/homeController";
import productsInit from "../controller/productsController";
import signinInit from "../controller/signinController";
import registerInit from "../controller/registerController";

import { SLIDES_IMAGES } from "../../constants";

import {
  state,
  loadCategories,
  loadProducts,
  loadProductsByCategory,
} from "../model/store";
// const rootELement = document.getElementById("root");
export const routerController = async function () {
  const pathName = location.pathname;
  const hash = location.hash.slice(1);

  const rootELement = document.getElementById("root");

  try {
    await loadCategories();
  } catch (err) {
    console.log(err);
  }

  //////prevent unwanted renering of the same component/////////////////
  // if (rootELement.classList.contains('main-home') && pathName === '/') {
  //   return;
  // }

  if (pathName === "/") {
    // localStorage.setItem("currUrlDetails", JSON.stringify(window.location));
    ////load categoried data from server
    // await loadCategories();

    // console.log('//////////', state.categories);

    ///clear the HTML on loaded
    homeView.clearHTML(rootELement);

    ////render home page layout
    homeView.render(
      rootELement,
      { categories: state.categories },
      "afterbegin"
    );

    // homeView.addClass('main-home');

    ///remove unwanted classes
    homeView.removeIrrelevantClasses();

    //render the slider
    sliderView.render(
      document.querySelector(".products"),
      { slides: SLIDES_IMAGES },
      "afterbegin"
    );

    ////fetch all .slide elements from dom
    sliderView.loadSlidesElements();

    ////attach btn lft and right arrow even listener
    sliderView.slideLeftRightBtnClickListener(slideLeftRightBtnClickHandler);

    ////load dots container
    sliderView.loadDotsContainer();

    /////render sliderDotViews
    sliderView.generateSliderDots();

    ////attach listener to dots click
    sliderDotsView.sliderDotsClickListener(sliderDotsClickHandler);

    /////active the dot at 0th position
    sliderView.activeDot(0);
  }

  if (pathName === "/products") {
    productsView.clearHTML(rootELement);
    if (hash || (rootELement.classList.contains("products__gallery") && hash)) {
      try {
        await loadProductsByCategory(hash);
      } catch (err) {
        console.log(err);
      }
      productsView.generateCompleteHTMLForProductsPage(
        rootELement,
        "afterbegin",
        hash || "alloptions"
      );
    } else {
      if (!hash) {
        try {
          await loadProducts();
        } catch (err) {
          console.log(err);
        }
        productsView.generateCompleteHTMLForProductsPage(
          rootELement,
          "afterbegin",
          "allproducts"
        );
      }
      ///////////////////render products/////////////////////////

      ////////////////////render products page sidebar////////////////////////
    }
  }

  if (pathName === "/signin") {
    signinView.render();
    signinView._form = document.getElementById("signinform");
    signinInit();
  }

  if (pathName === "/register") {
    registerView.render();
    registerView._form = document.getElementById("registerform");
    registerInit();
  }
};

const init = function () {
  routesView.routesClickEvent(routerController);
};

window.addEventListener("popstate", routerController);

window.addEventListener("DOMContentLoaded", routerController);

export default init;

/////////////to keep track of previous and current url//////////////////////////////////////////////////
  // const prevousURL = JSON.parse(localStorage.getItem("prevUrlDetails")) || null;
  // const currentURL =
  //   JSON.parse(localStorage.getItem("currentUrlDetails")) || null;

  // if (!prevousURL || !currentURL) {
  //   localStorage.setItem("prevUrlDetails", JSON.stringify(window.location));
  //   localStorage.setItem("currentUrlDetails", JSON.stringify(window.location));
  // } else if (currentURL.pathname !== pathName) {
  //   localStorage.setItem("prevUrlDetails", JSON.stringify(currentURL));
  //   localStorage.setItem("currentUrlDetails", JSON.stringify(window.location));
  // }
///////////////////////////////////////////////////////////////////////////////////////////////////////////
