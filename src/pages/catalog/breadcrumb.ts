import CreateElement from '../../templates/constructor';

export default class Breadcrumb {
  static createBreadcrumb(categoryId = "Plants") {
    this.deleteBreadcrumb();
    if(categoryId === "63e9ea6f-7f77-4e67-be95-0a5f1e04e50b") {
      return new CreateElement('a', ['breadcrumb-item'], [], 'Home plants');
    }
    if(categoryId === "3efdf903-f649-4a1b-97e1-e342341b6620") {
      return new CreateElement('a', ['breadcrumb-item'], [], 'Office plants');
    }
    if(categoryId === "3e382465-dd19-4eec-98b1-4a0bfa5a2cb2") {
      return new CreateElement('a', ['breadcrumb-item'], [], 'Garden plants');
    }
    return new CreateElement('a', ['breadcrumb-item'], [{prop: 'href', value: '#catalog-page'}], 'Plants');
  }

  static deleteBreadcrumb() {
    const breadcrumbContainer = document.querySelector('.breadcrumb')
    if (breadcrumbContainer) {
      while (breadcrumbContainer.childNodes.length > 1) {
        breadcrumbContainer.removeChild(breadcrumbContainer.lastChild as Node);
      }
    }
  }
}
