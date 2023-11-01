import FilterRepository from '../filter-repository';

describe('FilterRepository', () => {
  let filterRepository: FilterRepository;

  beforeEach(() => {
    filterRepository = new FilterRepository();
  });

  describe('getFilter', () => {
    it('should return a ProductProjectionPagedQueryResponse', async () => {
      const filterParametr = 'categories.id:"63e9ea6f-7f77-4e67-be95-0a5f1e04e50b"';
      const result = await filterRepository.getFilter(filterParametr);
      expect(result).toBeDefined();
      expect(result.count).toBeGreaterThan(0);
    });
  });
});
