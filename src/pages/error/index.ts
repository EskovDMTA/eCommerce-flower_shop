/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./index.css";
import Page from '../../templates/page';
import СreateElement from '../../templates/constructor';
import errorImgPath from '../../assets/images/error_404.svg';



export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found.'
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  renderPage() {
    const errorSection = new СreateElement('section', ['error-section']).appendTo(this.container);
    const errorTextBlock = new СreateElement('div', ['error-text_block']).appendTo(errorSection);
    const errorTitle = new СreateElement('h1', ['error-title'], [], `${ErrorPage.TextObject[this.errorType]}`).appendTo(errorTextBlock);
    const backToMain = new СreateElement('a', ['back-to-main'], [{prop: 'href', value: '#main-page'}], '>>> Back to main page <<<').appendTo(errorTextBlock);
    const errorImg = new СreateElement('img', ['error-img'], [{prop: 'src', value: errorImgPath}]).appendTo(errorSection);

  }

  render() {
    this.renderPage();
    return this.container;
  }
}

export default ErrorPage;