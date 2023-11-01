import { Product } from '@commercetools/platform-sdk';

export type ParsingProduct = {
  id: string;
  name: string;
  description?: string;
  shortDescription?: string;
  categories?: string[];
  tags: string[] | string;
  sku: string;
  size: string[] | string;
  price: number;
  salePrice?: number;
  images: string[];
  slug: string;
};
export class ProductParsing {
  product: Product;

  parsingObject: ParsingProduct;

  constructor(product: Product) {
    this.product = product;
    this.parsingObject = {
      id: "",
      description: '',
      images: [],
      name: '',
      price: 0,
      size: '',
      sku: '',
      tags: '',
      slug: '',
    };
  }

  getParsingProduct() {
    this.getProductId();
    this.getProductName();
    this.getDescriptionProduct();
    this.getShortDescriptionProduct();
    this.getSizeProduct();
    this.getProductPrice();
    this.getProductSalePrice();
    this.getSKUProduct();
    this.getProductSlug();
    this.getProductImages();
    return this.parsingObject;
  }

  getProductId() {
    const {id} = this.product;
    if (id !== undefined) {
      this.parsingObject.id = id;
    }
  }

  getProductName() {
    const name = this.product.masterData.current.name.en.toString();
    if (name !== undefined) {
      this.parsingObject.name = name;
    }
  }

  getProductPrice() {
    const price = this.product.masterData.current.masterVariant.prices;
    if (price !== undefined)
      this.parsingObject.price = price[0].value.centAmount / 100;
  }

  getProductSalePrice() {
    const salePrice = this.product.masterData.current.masterVariant.prices;
    if (salePrice !== undefined && salePrice[0].discounted?.value.centAmount) {
      this.parsingObject.salePrice =
        salePrice[0].discounted.value.centAmount / 100;
    }
  }

  getSKUProduct() {
    const { sku } = this.product.masterData.current.masterVariant;
    if (sku !== undefined) this.parsingObject.sku = sku;
  }

  getSizeProduct() {
    const size = this.product.masterData.current.masterVariant.attributes?.find(
      (attribute) => attribute.name === 'size'
    );
    if (size) {
      this.parsingObject.size = size.value;
    }
  }

  getDescriptionProduct() {
    const description = this.product.masterData.staged.description?.en;
    if (description !== undefined) {
      this.parsingObject.description = description.toString();
    }
  }

  getShortDescriptionProduct() {
    const shortDescription = this.product.masterData.staged.metaDescription?.en;
    if (shortDescription !== undefined) {
      this.parsingObject.shortDescription = shortDescription;
    }
  }

  getProductSlug() {
    const slug = this.product.masterData.current.slug.en.toString();
    if (slug !== undefined) {
      this.parsingObject.slug = slug.toString();
    }
  }

  getProductImages() {
    const images = this.product.masterData.staged.masterVariant.images?.map(
      (elem) => elem.url
    );
    if (images !== undefined) {
      this.parsingObject.images = images;
    }
  }
}
