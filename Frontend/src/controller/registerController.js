import registerView from "../views/registerView";
import routesView from "../views/routesView";
import { routerController } from "./routesController";

const submitFormEvent = function (data) {
  //store user data at local storage
  const userDetails = { ...data };
  const users = registerView.getUsersFromLocalStorage() || [];
  if (users && users.some((item) => item.email === userDetails.email)) {
    return alert("email already exists");
  }
  registerView.saveUsersDataToLocalStorage([...users, userDetails]);
  routesView.navigateTo('/signin');
  routerController();
};

const init = function () {
  registerView.submitEvent(submitFormEvent);
};

export default init;
