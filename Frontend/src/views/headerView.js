import BaseView from "./baseView";

class HeaderView extends BaseView {
  
  constructor() {
    super("header");
    this._parentElement = document.getElementById("header-container");
  }

}

export default new HeaderView();
