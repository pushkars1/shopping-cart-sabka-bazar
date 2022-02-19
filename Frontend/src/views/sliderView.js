import BaseView from "./baseView";
import sliderDotsView from "./sliderDotsView";
import { SLIDES_IMAGES } from "../../constants";

class SliderView extends BaseView {
  _slides = [];
  _currentSlide = 0;
  _maxSlides = SLIDES_IMAGES.length;
  _dotContainer = null;

  constructor() {
    super("slider");
  }

  loadSlidesElements() {
    this._slides = document.querySelectorAll(".slide");
  }

  loadDotsContainer() {
    this._dotContainer = document.querySelector('.dots');
  }

  goToSlide(slide) {
    this._slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  activeDot(slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  goToSlideAndActive(slide) {
    this.goToSlide(slide);
    this.activeDot(slide);
  }

  nextSlide() {
    if (this._currentSlide === this._maxSlides - 1) {
      this._currentSlide = 0;
    } else {
      this._currentSlide++;
    }
    this.goToSlideAndActive(this._currentSlide);
  }

  prevSLide() {
    if (this._currentSlide === 0) {
      this._currentSlide = this._maxSlides - 1;
    } else {
      this._currentSlide--;
    }
    this.goToSlideAndActive(this._currentSlide);
  }

  generateSliderDots() {
    this._slides.forEach((_, i) => {
      sliderDotsView.render(this._dotContainer, i, "beforeend");
    });
  }

  ///////////////////listeners and handlers
  slideLeftRightBtnClickListener(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".slider__btn--right")) handler("right");
      else if (e.target.closest(".slider__btn--left")) handler("left");
    });
  }
}

export default new SliderView();
