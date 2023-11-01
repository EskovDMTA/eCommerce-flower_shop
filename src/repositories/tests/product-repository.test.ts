import ProductRepository from '../product-repository';

describe('ProductRepository', () => {
  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const productRepository = new ProductRepository();
      const products = await productRepository.getProducts();
      expect(products).toBeDefined();
      expect(products.count).toBeGreaterThan(0);
    });
  });

  describe('getProduct', () => {
    it('should return a product with the specified ID', async () => {
      const productRepository = new ProductRepository();
      const productId = '836b8a3d-b347-46ed-aac0-9f091a1d7385';
      const product = await productRepository.getProduct(productId);
      expect(product).toBeDefined();
      expect(product.id).toEqual(productId);
    });

    it('should throw an error if the product ID is invalid', async () => {
      const productRepository = new ProductRepository();
      const productId = 'invalid-product-id';
      await expect(productRepository.getProduct(productId)).rejects.toThrow();
    });
  });
});
