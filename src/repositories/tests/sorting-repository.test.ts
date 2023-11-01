import SortingRepository from '../sorting-repository';

describe('SortingRepository', () => {
  let sortingRepository: SortingRepository;

  beforeEach(() => {
    sortingRepository = new SortingRepository();
  });

  describe('getSorting', () => {
    it('should return a ProductProjectionPagedQueryResponse', async () => {
      const sortParametr = 'name.en asc';
      const result = await sortingRepository.getSorting(sortParametr);
      expect(result).toBeDefined();
      expect(result.count).toBeGreaterThan(0);
    });
  });
});
