import { BASE_IMG_URL } from "../../constants";
import compiledProducts from "../handlebars/products.handlebars";
import { state, loadProductByID } from "../model/store";
import BaseView from "./baseView";
import productsSidebarView from "./productsSidebarView";
import dropDownView from "./dropDownView";

import {
  dropdownClickHandler,
  dropdownOptionClickHandler,
} from "../controller/dropdownController";
import { buyNowBtnClickHandler } from "../controller/productsController";

export class ProductsView extends BaseView {
  constructor() {
    super("products");
  }

  classesToBeAdded() {
    return ["products__gallery", "margin-auto"];
  }

  classesToBeRemoved() {
    return ["form__container"];
  }

  buyNowBtnClickListener(handler) {
    const btns = [...document.querySelectorAll(".btn-buy-now")];
    state.buttonsDOM = btns;
    btns.forEach((btn) => {
      const { productId } = btn.dataset;
      ////check if the item in cart already
      const inCart = state.cart.find((item) => item.id === productId);
      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      btn.addEventListener("click", function (event) {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        handler(event, productId);
      });
    });
  }

  async getProduct(id) {
    try {
      const product = await loadProductByID(id);
      return product[0];
    } catch (err) {
      console.log(err);
    }
  }

  getButton(id) {
    return state.buttonsDOM.find((btn) => btn.dataset.productId === id);
  }

  renderProductView(rootELement, position="afterbegin") {
    this.render(rootELement, { products: state.products }, position);
    this.addClasses(this.classesToBeAdded());
    this.removeClasses(this.classesToBeRemoved());
  }

  generateCompleteHTMLForProductsPage(rootELement, position, hash) {
    
    this.renderProductView(rootELement, position);
    this.buyNowBtnClickListener(buyNowBtnClickHandler);
    this._parentElement.querySelector(".products__gallery--products").style.zIndex = 30;

    //////////////////////////for width less than 500px show dropdown for side navigation////////////////////////
    if (window.innerWidth > 500) {
      productsSidebarView.render(
        document.querySelector(".products__gallery--nav"),
        {
          categories: state.categories,
          hashId: hash,
        },
        position
      );
    } else {
      dropDownView.render(
        document.querySelector(".dropdown"),
        { categories: state.categories },
        "afterbegin"
      );
      dropDownView.dropdownClickListener(dropdownClickHandler);
      dropDownView.changeDropDownValue("All Products", "allproducts");
      dropDownView.dropdownOptionClickListener(dropdownOptionClickHandler);
    }
  }
}

export default new ProductsView();
