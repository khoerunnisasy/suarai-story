import HomeView from "../../pages/home/home-view";
import HomePresenter from "../../pages/home/home-presenter";

export default class HomePage {
  async render() {
    return HomeView.render();
  }

  async afterRender() {
    const presenter = new HomePresenter({
      view: HomeView,
    });

    presenter.init();
  }
}