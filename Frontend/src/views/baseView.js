import {
  BASE_IMG_URL,
  mainRoutes,
  authRoutes,
  logoutRoutes,
} from "../../constants";
import { state } from "../model/store";

//////////////compiled markups///////////////////////////////////
import compiledDotsBtns from "../handlebars/dotsbtns.handlebars";
import compiledSlider from "../handlebars/slider.handlebars";
import compiledHome from "../handlebars/home.handlebars";
import compiledProductsSidebar from "../handlebars/products-sidebar.handlebars";
import compiledProducts from "../handlebars/products.handlebars";
import compiledDropdown from "../handlebars/dropdown.handlebars";
import compiledProductGallery from "../handlebars/products-gallery.handlebars";
import compiledCart from "../handlebars/cart.handlebars";
import compiledHeader from "../handlebars/header.handlebars";
import compiledCartTotal from "../handlebars/cartTotal.handlebars";
import compiledSidedrawer from '../handlebars/sidedrawer.handlebars';

////////////////////views////////////////////////
// import productsView, { ProductsView } from "./productsView";
// import productsSidebarView from "./productsSidebarView";

class BaseView {
  _parentElement = null;
  _data = null;
  _markup = "";
  _contentId = "";

  //////////////cart elements/////////////
  _cartIconDiv = null;
  _mainCart = null;
  _shoppingcart = null;
  _backdrop = null;
  _mainContainer = document.querySelector(".main");
  _bodyContainer = document.querySelector(".container");

  //////////////////////////////////

  constructor(contentId) {
    this._contentId = contentId;
  }

  generateMarkup() {
    let markup = "";

    if (this._contentId === "sliderdots") {
      markup = compiledDotsBtns({
        index: this._data,
      });
    }

    if (this._contentId === "slider") {
      markup = compiledSlider({
        slides: this._data.slides,
        imageURL: BASE_IMG_URL,
      });
    }

    if (this._contentId === "home") {
      markup = compiledHome({
        data: {
          imageURL: BASE_IMG_URL,
          categories: this._data.categories.sort((a, b) => a.order - b.order),
        },
      });
    }

    if (this._contentId === "products-sidebar") {
      markup = compiledProductsSidebar({
        categories: this._data.categories,
        hashId: this._data.hashId,
      });
    }
    if (this._contentId === "products") {
      markup = compiledProducts({
        baseURL: BASE_IMG_URL,
        products: this._data.products,
      });
    }

    if (this._contentId === "dropdown") {
      markup = compiledDropdown({
        categories: this._data.categories,
      });
    }

    if (this._contentId === "products-gallery") {
      markup = compiledProductGallery({
        baseURL: BASE_IMG_URL,
        products: this._data.products,
      });
    }

    if (this._contentId === "cart") {
      markup = compiledCart({
        products: this._data.products,
        cartTotal: this._data.cartTotal,
        baseImageUrl: BASE_IMG_URL,
        cartCount: this._data.cartCount,
      });
    }

    if (this._contentId === "header") {
      markup = compiledHeader({
        mainRoutes,
        authRoutes: state.auth.loggedIn ? logoutRoutes : authRoutes,
        logoImagePath: `${BASE_IMG_URL}/logo.png`,
        totalItems: this._data.count,
      });
    }

    if (this._contentId === "cart-total") {
      markup = compiledCartTotal({
        cartTotal: this._data.cartTotal,
      });
    }

    if (this._contentId === "side-drawer") {
      markup = compiledSidedrawer({
        routes: state.auth.loggedIn
          ? [...mainRoutes, ...logoutRoutes]
          : [...mainRoutes, ...authRoutes],
      });
    }
    return markup;
  }

  render(parentElement, data, position) {
    this._data = data;
    this._parentElement = parentElement;
    this._markup = this.generateMarkup();
    this.insertHTML(position);
  }

  insertHTML(position) {
    this._parentElement.insertAdjacentHTML(position, this._markup);
  }

  clearHTML(element) {
    element.innerHTML = "";
  }

  addClass(classname) {
    this._parentElement.classList.add(classname);
  }

  removeClass(classname) {
    this._parentElement.classList.remove(classname);
  }

  addClasses(classes) {
    classes.forEach((className) => {
      this._parentElement.classList.add(className);
    });
  }

  removeClasses(classes) {
    classes.forEach((className) => {
      this._parentElement.classList.remove(className);
    });
  }

  ////////////////shopping cart icon click
  cartIconClickListener(handler) {
    this._cartIconDiv = document.querySelector(".cart__container");
    this._cartIconDiv.addEventListener("click", handler);
  }

  loadCartContainerElements() {
    this._mainCart = document.querySelector(".main-cart");
    this._shoppingcart = document.querySelector(".shopping-cart");
    this._backdrop = document.querySelector(".backdrop");
  }

  ////algorithm to check the latest render and last render difference. update only the part that is changed.
  update(data) {
    this._data = data;
    this._markup = this.generateMarkup();

    const newDom = document
      .createRange()
      .createContextualFragment(this._markup);
    const newElements = [...newDom.querySelectorAll("*")];
    let currElements = [...this._parentElement.querySelectorAll("*")];
    currElements.forEach((currElement, i) => {
      const newEl = newElements[i];
      if (!newEl || !currElement) return;

      if (!newEl.isEqualNode(currElement)) {
        this.checkForNodeChilds(newEl, currElement);

        Array.from(newEl.attributes).forEach((attr) => {
          currElement.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  checkForNodeChilds(newElement, currElements) {
    if (newElement.childNodes.length > 1) {
      newElement.childNodes.forEach((child, i) => {
        if (child && currElements?.childNodes) {
          this.checkForNodeChilds(child, currElements.childNodes[i]);
        }
      });
    } else {
      if (
        !newElement ||
        !customElements ||
        !newElement?.firstChild ||
        !currElements?.firstChild
      ) {
        return;
      }
      if (
        newElement.firstChild?.nodeValue?.trim() !==
        currElements.firstChild?.nodeValue?.trim()
      ) {
        currElements.textContent = newElement.textContent;
      }
    }
  }
}

export default BaseView;
