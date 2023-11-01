import CategoriesRepository from '../categories-repository';

describe('CategoriesRepository', () => {
  let categoriesRepository: CategoriesRepository;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepository();
  });

  describe('getCategories', () => {
    it('should return a CategoryPagedQueryResponse', async () => {
      const categories = await categoriesRepository.getCategories();
      expect(categories).toHaveProperty('count');
      expect(categories).toHaveProperty('total');
      expect(categories).toHaveProperty('results');
    });
  });
});
