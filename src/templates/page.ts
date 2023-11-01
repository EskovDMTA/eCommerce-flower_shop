/* eslint-disable class-methods-use-this */
abstract class Page {
  protected container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  render() {
    return this.container;
  }


  addListeners(): void {}

  async init(): Promise<void> {
    return Promise.resolve();
  }
}

export default Page;
