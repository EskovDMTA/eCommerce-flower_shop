/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import "./index.css";
import { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import Page from '../../templates/page';
import СreateElement from '../../templates/constructor';
import welcomeImgSmallPath from '../../assets/images/flowers/welcome-img-small.png';
import welcomeImgBigPath from '../../assets/images/flowers/welcome-img-big.png';
import { PageIds } from '../../components/app/app';
import DiscountRepository from '../../repositories/discount-repository';

const ButtonsForAuthorizedUser = [
  {
    id: PageIds.LoginPage,
    text: 'Login',
  },
  {
    id: PageIds.RegisterPage,
    text: 'Register',
  }
];


class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  promocodes: DiscountCodePagedQueryResponse;

  constructor(id: string) {
    super(id);
    this.promocodes = {} as DiscountCodePagedQueryResponse;
  }

  renderPage() {
    const welcomeSection = new СreateElement('section', ['welcome-section']).appendTo(this.container);
    const welcomeTextBlock = new СreateElement('header', ['welcome-text_block']).appendTo(welcomeSection);
    const welcomeTitle1 = new СreateElement('h2', ['welcome-title1'], [], 'Welcome to GreenShop').appendTo(welcomeTextBlock);
    const welcomeTitle2 = new СreateElement('div', ['welcome-title2'], [], '', 'Let’s Make a Better <span class="planet-text">Planet</span>').appendTo(welcomeTextBlock);
    const welcomeText = new СreateElement('p', [], [], 'We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!').appendTo(welcomeTextBlock);
    const welcomeTextButton = new СreateElement('a', ['welcome-text_btn'], [{prop: 'href', value: '#catalog-page'}], 'SHOP NOW').appendTo(welcomeTextBlock);
    const welcomeImg = new СreateElement('div', ['welcome_img']).appendTo(welcomeSection);
    const welcomeImgSmall = new СreateElement('img', ['welcome-img_small'], [{prop: 'src', value: welcomeImgSmallPath}]).appendTo(welcomeImg);
    const welcomeImgBig = new СreateElement('img', ['welcome-img_big'], [{prop: 'src', value: welcomeImgBigPath}]).appendTo(welcomeImg);
    const promocodesBlock = new СreateElement('div', ['promocodes-block'], [], 'Promocodes').appendTo(welcomeTextBlock);
    if(this.promocodes) {
      this.promocodes.results.forEach((elem) => {
        if (elem.name){
          new СreateElement('div', ['promocodes-text'], [], elem.name.en).appendTo(promocodesBlock)
        }
      })
    }
  }

  async init(): Promise<void> {
    const discRepo = new DiscountRepository();
    this.promocodes = await discRepo.getDiscountCodes();
  }

  render() {
    this.renderPage();
    return this.container;
  }

}

export default MainPage;
