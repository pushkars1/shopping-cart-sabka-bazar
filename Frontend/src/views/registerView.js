import compiledRegister from "../handlebars/register.handlebars";

class RegisterView {
  _rootElement = document.getElementById("root");
  _markup = null;
  _form = null;

  render() {
    this._rootElement.classList.add("form__container");
    this._markup = this.generateMarkup();
    this._rootElement.innerHTML = "";
    this._rootElement.insertAdjacentHTML("afterbegin", this._markup);
  }

  generateMarkup() {
    return compiledRegister({});
  }

  saveUsersDataToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users'));
  }

  submitEvent(handler) {
    if (!this._form) return;

    // console.log(this._form);
    this._form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);
      const entries = formData.entries();
      const data = Object.fromEntries(entries);
      // console.log("-----data", data);
      handler(data);
    });
  }
}

export default new RegisterView();
