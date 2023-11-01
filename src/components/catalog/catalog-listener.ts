export default class CatalogListener {
  static modifyHashWithProductId(id: string) {
    window.location.hash = `product-page/${id}`;
  }
}
