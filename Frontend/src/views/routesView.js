class RoutesView {
  routesClickEvent(handler) {
    document.addEventListener("click",  (e) =>  {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigateTo(e.target.href);
        handler();
      }
    });
  }

  navigateTo(url) {
    history.pushState(null, null, url);
  }
}

export default new RoutesView();