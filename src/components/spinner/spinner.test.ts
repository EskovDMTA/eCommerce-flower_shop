import Spinner from "./spinner";

describe('Spinner', () => {
  let spinner: Spinner;
  let targetElement: HTMLElement;

  beforeEach(() => {
    targetElement = document.createElement('div');
    spinner = new Spinner();
  });

  afterEach(() => {
    if (spinner) {
      spinner.hide();
    }
  });

  it('should create a spinner element with default size and color', () => {
    expect(spinner).toBeDefined();
    expect(spinner.spinnerElement).toBeDefined();
    const spinnerElement = (spinner.spinnerElement as HTMLElement).querySelector('div') as HTMLElement;
    expect(spinnerElement.style.width).toBe('50px');
    expect(spinnerElement.style.height).toBe('50px'); 
  });

  it('should create a spinner element with custom size and color', () => {
    const customSize = 100;
    const customColor = 'red';
    spinner = new Spinner(customSize, customColor);
    expect(spinner).toBeDefined();
    expect(spinner.spinnerElement).toBeDefined();
    const spinnerElement = (spinner.spinnerElement as HTMLElement).querySelector('div') as HTMLElement;
    expect(spinnerElement.style.width).toBe(`${customSize}px`);
    expect(spinnerElement.style.height).toBe(`${customSize}px`);
    expect(spinnerElement.style.border).toBe(`4px solid ${customColor}`);
  });

  it('should show the spinner in the target element', () => {
    spinner.show(targetElement);
    expect(targetElement.contains(spinner.spinnerElement)).toBeTruthy();
  });

  it('should hide the spinner', () => {
    spinner.show(targetElement);
    spinner.hide();
    expect(targetElement.contains(spinner.spinnerElement)).toBeFalsy();
  });
});
