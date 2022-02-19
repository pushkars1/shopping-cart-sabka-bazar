import { loadProductsByCategory } from "../model/store";
import BaseView from "./baseView";
import productsGalleryView from "./productsGalleryView";
import routesView from "./routesView";
import { state } from "../model/store";

class DropDownView extends BaseView {
  constructor() {
    super("dropdown");
  }

  dropdownClickListener(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  async changeDropDownValue(value, id) {
    this._parentElement.querySelector("input").value = value;
    routesView.navigateTo("/products#" + id);

    try {
      await loadProductsByCategory(id);
    } catch (err) {
      console.log(err);
    }

    const parentElement = document.querySelector(
      ".products__gallery--products"
    );

    productsGalleryView.clearHTML(parentElement);
    productsGalleryView.render(parentElement, { products: state.products }, 'afterbegin');
    this._parentElement.classList.remove('active');
    

  }

  dropdownOptionClickListener(handler) {
    const options = [...this._parentElement.querySelectorAll(".option--item")];
    options.forEach((option) => {
      option.addEventListener("click", handler);
    });
  }
}

export default new DropDownView();
