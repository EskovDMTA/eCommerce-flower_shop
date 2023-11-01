import ErrorPage, { ErrorTypes } from './index';


describe('ErrorPage component', () => {
  let errorPage: ErrorPage;

  beforeEach(() => {
    errorPage = new ErrorPage('error-page', ErrorTypes.Error_404);
    document.body.appendChild(errorPage.render());
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render the error section', () => {
    const errorSection = document.querySelector('.error-section');
    expect(errorSection).toBeDefined();
    if(errorSection){
      expect(errorSection.children.length).toBe(2);
    }
  });

  it('should render the error title', () => {
    const errorTitle = document.querySelector('.error-title');
    expect(errorTitle).toBeDefined();
    if(errorTitle){
      expect(errorTitle.textContent).toBe('Error! The page was not found.');
    }
  });

  it('should render the back to main link', () => {
    const backToMain = document.querySelector('.back-to-main');
    expect(backToMain).toBeDefined();
    if(backToMain){
      expect(backToMain.getAttribute('href')).toBe('#main-page');
      expect(backToMain.textContent).toBe('>>> Back to main page <<<');
    }
  });
});
