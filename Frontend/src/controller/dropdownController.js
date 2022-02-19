import dropDownView from "../views/dropDownView"

export const dropdownClickHandler = function (event) {
  console.log(event);
  dropDownView._parentElement.classList.toggle("active"); 
}

export const dropdownOptionClickHandler = function (event) {
  event.stopImmediatePropagation();
  const { id, name } = event.target.dataset;
  dropDownView.changeDropDownValue(name, id);
}