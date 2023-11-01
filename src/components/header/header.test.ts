import Header from './index';

describe('Header component', () => {
  let header: Header;

  beforeEach(() => {
    header = new Header('header', 'header-class');
    document.body.appendChild(header.render());
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render the header menu', () => {
    const headerMenu = document.querySelector('.header-menu');
    expect(headerMenu).toBeDefined();
    if(headerMenu){
      expect(headerMenu.children.length).toBe(3);
    }

  });

  it('should render the header buttons', () => {
    const headerButtons = document.querySelector('.header-buttons');
    expect(headerButtons).toBeDefined();
    expect(headerButtons?.children.length).toBe(3);
  });

  it('should render the mobile menu', () => {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon') as HTMLLinkElement;
    expect(mobileMenuIcon).toBeDefined();
    mobileMenuIcon.click();
    const menuMobileBlock = document.querySelector('.menu-mobile-block') as HTMLDivElement;
    expect(menuMobileBlock).toBeDefined();
    expect(menuMobileBlock.children.length).toBe(1);
  });
});
