import sliderView from "../views/sliderView";

export const slideLeftRightBtnClickHandler = function (id) {
  if (id === "right") {
    sliderView.nextSlide();
  } else if (id === "left") {
    sliderView.prevSLide();
  }
};

