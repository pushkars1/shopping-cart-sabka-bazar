import BaseView from "./baseView";

class SliderDotView extends BaseView {
  constructor() {
    super("sliderdots");
  }

  sliderDotsClickListener(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        handler(slide);
      }
    });
  }
}

export default new SliderDotView();