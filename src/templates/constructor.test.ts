import CreateElement from './constructor';

describe('CreateElement', () => {
  let parent: HTMLElement;

  beforeEach(() => {
    parent = document.createElement('div');
  });

  afterEach(() => {
    parent.innerHTML = '';
  });

  it('should create an element with the given tag', () => {
    const element = new CreateElement('div').appendTo(parent);
    expect(element.tagName).toBe('DIV');
  });

  it('should add the given class list to the element', () => {
    const element = new CreateElement('div', ['class1', 'class2']).appendTo(parent);
    expect(element.classList.contains('class1')).toBe(true);
    expect(element.classList.contains('class2')).toBe(true);
  });

  it('should set the given attributes on the element', () => {
    const element = new CreateElement('div', [], [{ prop: 'id', value: 'test-id' }, { prop: 'data-test', value: 'test-data' }]).appendTo(parent);
    expect(element.getAttribute('id')).toBe('test-id');
    expect(element.getAttribute('data-test')).toBe('test-data');
  });

  it('should set the text content of the element', () => {
    const element = new CreateElement('div', [], [], 'test text').appendTo(parent);
    expect(element.textContent).toBe('test text');
  });

  it('should set the inner HTML of the element', () => {
    const element = new CreateElement('div', [], [], '', '<span>test html</span>').appendTo(parent);
    expect(element.innerHTML).toBe('<span>test html</span>');
  });

  it('should append the element to the given parent element', () => {
    const element = new CreateElement('div').appendTo(parent);
    expect(parent.contains(element)).toBe(true);
  });
});
