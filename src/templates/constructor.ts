/* eslint-disable @typescript-eslint/naming-convention */

class CreateElement{
  element: HTMLElement;

  constructor(
    tag: string, 
    classList: string[] = [],
    attributes: Array<{ prop: string, value: string }> = [], 
    textContent = '',
    innerHTML = ''
  ) {
    this.element = document.createElement(tag);

    if (classList) {
      this.element.classList.add(...classList);
    }

    if (attributes?.length) {
      attributes.forEach(({ prop, value }) => {
        this.element.setAttribute(prop, value);
      });
    }

    if (textContent) {
      this.element.textContent = textContent;
    }

    if (innerHTML) {
      this.element.innerHTML = innerHTML;
    }
  }

  appendTo(parent: HTMLElement) {
    parent.appendChild(this.element);
    return this.element;
  }
}

export default CreateElement;