import BaseView from "./baseView";

class HomeView extends BaseView {
  constructor() {
    super("home");
  }

  removeIrrelevantClasses() {
    this._parentElement.classList.remove("products__gallery");
    this._parentElement.classList.remove("remove__margin");
    this._parentElement.classList.remove("form__container");
  }
}

export default new HomeView();
