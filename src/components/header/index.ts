/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import Component from '../../templates/components';
import СreateElement from '../../templates/constructor';
import { PageIds } from '../app/app';
import "./index.css";
import logoIconPath from '../../assets/images/logo_greenshop.png';
import basketPath from '../../assets/images/basket.svg';
import userPath from '../../assets/images/user_icon.svg'
import loginBtnImgPath from '../../assets/images/login.svg';
import UserService from '../../business-services/user-service';
import TokenConstants from '../../constants/token-constants/token-constants';


const Menu = [
  {
    id: PageIds.MainPage,
    text: 'Main',
  },
  {
    id: PageIds.CatalogPage,
    text: 'Catalog',
  },
  {
    id: PageIds.AboutPage,
    text: 'About Us',
  },
];

const HeaderButtonsArray = [
  {
    id: PageIds.BasketPage,
    text: 'Basket',
  },
  {
    id: PageIds.LoginPage,
    text: 'Login',
  },
  {
    id: PageIds.RegisterPage,
    text: 'Register',
  },
  {
    id: PageIds.MainPage,
    text: 'Log out',
  },
  {
    id: PageIds.ProfilePage,
    text: 'Profile',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);

    UserService.subscribeToAuthorizationStatusChanged(() => {
      this.removeElements();
      this.render();
    });
  }

  renderHeaderMenu() {
    const headerSection = new СreateElement('div', ['header-section']).appendTo(this.container);
    const logoBlock = new СreateElement('a', ['logo-block'], [{ prop: 'href', value: `#${Menu[0].id}` }]).appendTo(headerSection);
    const logoIcon = new СreateElement('img', ['logo-icon'], [{ prop: 'src', value: logoIconPath }]).appendTo(logoBlock);
    const headerMenu = new СreateElement('nav', ['header-menu'], [{ prop: 'src', value: logoIconPath }]).appendTo(headerSection);
    Menu.forEach((button) => {
      const menuItem = new СreateElement('a', ['menu-item'], [{prop: 'href', value: `#${button.id}`}], button.text).appendTo(headerMenu);
    });
    const headerButtons = new СreateElement('div', ['header-buttons']).appendTo(headerSection);
    const basketBlock = new СreateElement('a', ['basket-block'], [{ prop: 'href', value: `#${HeaderButtonsArray[0].id}` }]).appendTo(headerButtons);
    const basket = new СreateElement('img', ['basket'], [{ prop: 'src', value: basketPath }]).appendTo(basketBlock);
    if (UserService.isAuthorised) {
      const userBlock = new СreateElement('a', ['user-block'], [{ prop: 'href', value: `#${HeaderButtonsArray[4].id}` }]).appendTo(headerButtons);
      const user = new СreateElement('img', ['user-image'], [{ prop: 'src', value: userPath }]).appendTo(userBlock);
      const logOutBtn = new СreateElement('a', ['logout-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[3].id}` }]).appendTo(headerButtons);
      const buttonText = new СreateElement('p', [], [], HeaderButtonsArray[3].text).appendTo(logOutBtn);
      const logOutBtnImg = new СreateElement('img', ['login-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(logOutBtn);

      logOutBtn.addEventListener('click', () => {
        localStorage.removeItem(TokenConstants.USER_TOKEN);
        UserService.update();
        const buttonsContainer = document.querySelector(".buttons-block")
        buttonsContainer?.remove()
      })
    } else {
      const loginBtn = new СreateElement('a', ['login-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[1].id}` }]).appendTo(headerButtons);
      const loginBtnImg = new СreateElement('img', ['login-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(loginBtn);
      const buttonText = new СreateElement('p', [], [], HeaderButtonsArray[1].text).appendTo(loginBtn);
      const registrationBtn = new СreateElement('a', ['register-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[2].id}` }]).appendTo(headerButtons);
      const registrBtnImg = new СreateElement('img', ['registr-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(registrationBtn);
      const registrButtonText = new СreateElement('p', [], [], HeaderButtonsArray[2].text).appendTo(registrationBtn);
    }
    const mobileMenuIcon = new СreateElement('div', ['mobile-menu-icon']).appendTo(headerSection);
    const mobileMenuLine1 = new СreateElement('div', ['mobile-menu-line']).appendTo(mobileMenuIcon);
    const mobileMenuLine2 = new СreateElement('div', ['mobile-menu-line']).appendTo(mobileMenuIcon);
    const mobileMenuLine3 = new СreateElement('div', ['mobile-menu-line']).appendTo(mobileMenuIcon);

    const menuMobileBlock = new СreateElement('div', ['menu-mobile-block', 'menu-mobile-block-notactive']).appendTo(headerSection);
    const menuMobile = new СreateElement('ul', ['menu-mobile']).appendTo(menuMobileBlock);
    const menuMobileItem1 = new СreateElement('a', ['menu-mobile-item', 'menu-item'], [{prop: 'href', value: '#main-page'}], 'Main').appendTo(menuMobile);
    const menuMobileItem2 = new СreateElement('a', ['menu-mobile-item', 'menu-item'], [{prop: 'href', value: '#catalog-page'}], 'Catalog').appendTo(menuMobile);
    const menuMobileItem3 = new СreateElement('a', ['menu-mobile-item', 'menu-item'], [{prop: 'href', value: '#about-page'}], 'About').appendTo(menuMobile);
    const basketBlockMobile = new СreateElement('a', ['basket-block'], [{ prop: 'href', value: `#${HeaderButtonsArray[0].id}` }]).appendTo(menuMobile);
    const basketMobile = new СreateElement('img', ['basket'], [{ prop: 'src', value: basketPath }]).appendTo(basketBlockMobile);
    if (UserService.isAuthorised) {
      const userBlockMobile = new СreateElement('a', ['user-block'], [{ prop: 'href', value: `#${HeaderButtonsArray[4].id}` }]).appendTo(menuMobile);
      const user = new СreateElement('img', ['user-image'], [{ prop: 'src', value: userPath }]).appendTo(userBlockMobile);
      const logOutBtnMobile = new СreateElement('a', ['logout-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[3].id}` }]).appendTo(menuMobile);
      const buttonText = new СreateElement('p', [], [], HeaderButtonsArray[3].text).appendTo(logOutBtnMobile);
      const logOutBtnImg = new СreateElement('img', ['login-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(logOutBtnMobile);
      logOutBtnMobile.addEventListener('click', () => {
        localStorage.removeItem(TokenConstants.USER_TOKEN);
        UserService.update();
      })
    } else {
      const loginBtnMobile = new СreateElement('a', ['login-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[1].id}` }]).appendTo(menuMobile);
      const loginBtnImgMobile = new СreateElement('img', ['login-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(loginBtnMobile);
      const buttonTextMobile = new СreateElement('p', [], [], HeaderButtonsArray[1].text).appendTo(loginBtnMobile);
      const registrationBtnMobile = new СreateElement('a', ['register-btn'], [{ prop: 'href', value: `#${HeaderButtonsArray[2].id}` }]).appendTo(menuMobile);
      const registrBtnImgMobile = new СreateElement('img', ['registr-btn_img'], [{ prop: 'src', value: loginBtnImgPath }]).appendTo(registrationBtnMobile);
      const registrButtonTextMobile = new СreateElement('p', [], [], HeaderButtonsArray[2].text).appendTo(registrationBtnMobile);
    }

    mobileMenuIcon.addEventListener('click', () => {
      if (menuMobileBlock.classList.contains('menu-mobile-block-notactive')) {
        menuMobileBlock.classList.remove('menu-mobile-block-notactive');
        mobileMenuIcon.classList.add('mobile-menu-icon-active');
      } else {
        menuMobileBlock.classList.add('menu-mobile-block-notactive');
        mobileMenuIcon.classList.remove('mobile-menu-icon-active');
      }
    });
  }


  removeElements() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
    }

  render() {
    this.renderHeaderMenu();
    return this.container;
  }
}

export default Header;
