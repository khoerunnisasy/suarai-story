import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import AddPage from "../pages/add/add-page";
import LogIn from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import DetailPage from '../pages/detail/detail-page.js';
import KeepPage from "../pages/keep/keep-page";
import NotFoundPage from "../pages/not-found/notfound-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/add": new AddPage(),
  "/login": new LogIn(),
  "/register": new RegisterPage(),
  "/detail/:id": new DetailPage(),
  "/keep": new KeepPage(),
  "/404": new NotFoundPage(),
};

export default routes;
