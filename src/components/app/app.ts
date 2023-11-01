/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-cycle */
import Page from '../../templates/page';
import MainPage from '../../pages/main';
import CatalogPage from '../../pages/catalog';
import AboutPage from '../../pages/about';
import BasketPage from '../../pages/basket';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/registration';
import Header from '../header';
import ErrorPage, { ErrorTypes } from '../../pages/error';
import UserService from '../../business-services/user-service';
import ProfilePage from '../../pages/profile';
import ProductPage from '../../pages/product';
import CustomersRepository from '../../repositories/customers-repository';

export const enum PageIds {
  MainPage = 'main-page',
  CatalogPage = 'catalog-page',
  AboutPage = 'about-page',
  BasketPage = 'basket-page',
  LoginPage = 'login-page',
  RegisterPage = 'register-page',
  ProductPage = 'product-page',
  ProfilePage = 'profile',
}

class App {
  private static container: HTMLElement = document.body;

  private static customersRepository: CustomersRepository = new CustomersRepository();

  private static defaultPageId: string = 'current-page';

  private header: Header;

  constructor() {
    this.header = new Header('header', 'header');
  }

  static async renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.CatalogPage) {
      page = new CatalogPage(idPage);
    } else if (idPage === PageIds.AboutPage) {
      page = new AboutPage(idPage);
    } else if (idPage === PageIds.ProfilePage) {
      page = new ProfilePage(idPage, App.customersRepository);
    } else if (idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else if (idPage === PageIds.LoginPage) {
      page = new LoginPage(idPage);
    } else if (idPage === PageIds.RegisterPage) {
      page = new RegisterPage(idPage);
    } else if (idPage === PageIds.ProductPage) {
      page = new ProductPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      await page.init();
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
      page.addListeners();
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', async () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('product')) {
        await App.renderNewPage(PageIds.ProductPage);
        return;
      }
      if (UserService.isAuthorised &&
        (hash === PageIds.LoginPage || hash === PageIds.RegisterPage)) {
        await App.renderNewPage(PageIds.MainPage);
        window.location.hash = PageIds.MainPage;
        return;
      }
      if (!UserService.isAuthorised && hash === PageIds.ProfilePage) {
        await App.renderNewPage(PageIds.LoginPage);
        window.location.hash = PageIds.LoginPage;
        return;
      }

      await App.renderNewPage(hash);
    });
  }

  async start() {
    UserService.init();
    App.container.append(this.header.render());
    await App.renderNewPage(this.resolveStartPage());
    this.enableRouteChange();
  }

  private resolveStartPage(): string {
    const hashString = window.location.hash.slice(1);
    if (hashString) {
      return hashString;
    }
    return PageIds.MainPage;
  }
}

export default App;
