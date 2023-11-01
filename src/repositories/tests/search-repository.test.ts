import SearchRepository from '../search-repository'

describe('SearchRepository', () => {
  let searchRepository: SearchRepository;

  beforeEach(() => {
    searchRepository = new SearchRepository();
  });

  describe('getSearch', () => {
    it('should return a ProductProjectionPagedQueryResponse', async () => {
      const searchText = 'test';
      const search = await searchRepository.getSearch(searchText);
      expect(search).toHaveProperty('count');
      expect(search).toHaveProperty('total');
      expect(search).toHaveProperty('results');
    });
  });
});
