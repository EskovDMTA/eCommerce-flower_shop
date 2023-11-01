import DiscountRepository from '../discount-repository';

describe('DiscountRepository', () => {
  let discountRepository: DiscountRepository;

  beforeEach(() => {
    discountRepository = new DiscountRepository();
  });

  describe('getDiscountCodes', () => {
    it('should return a DiscountCodePagedQueryResponse', async () => {
      const codes = await discountRepository.getDiscountCodes();
      expect(codes).toHaveProperty('count');
      expect(codes).toHaveProperty('total');
    });
  });
});
