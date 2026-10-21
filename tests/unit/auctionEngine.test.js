const {
  validateBidPlacement,
  calculateParticipationDeposit,
  processAuctionSettlement
} = require('../../src/auctionEngine');

describe('auctionEngine Unit Tests', () => {
  describe('validateBidPlacement', () => {
    test('rejects bid when auction status is not ACTIVE', () => {
      const result = validateBidPlacement(100000, 10000, 120000, 'SCHEDULED', 'seller_1', 'bidder_1');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('AUCTION_NOT_ACTIVE');
    });

    test('rejects bid when bidder is the seller', () => {
      const result = validateBidPlacement(100000, 10000, 120000, 'ACTIVE', 'user_123', 'user_123');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SELF_BIDDING_NOT_ALLOWED');
    });

    test('accepts bid when sellerId or bidderId is undefined', () => {
      const withoutSeller = validateBidPlacement(100000, 10000, 120000, 'ACTIVE', null, 'bidder_1');
      const withoutBidder = validateBidPlacement(100000, 10000, 120000, 'ACTIVE', 'seller_1', null);
      expect(withoutSeller.valid).toBe(true);
      expect(withoutBidder.valid).toBe(true);
    });

    test('rejects non-numeric bid amount', () => {
      const result = validateBidPlacement(100000, 10000, 'invalid', 'ACTIVE', 'seller_1', 'bidder_1');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('INVALID_BID_AMOUNT');
    });

    test('rejects NaN bid amount', () => {
      const result = validateBidPlacement(100000, 10000, Number.NaN, 'ACTIVE', 'seller_1', 'bidder_1');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('INVALID_BID_AMOUNT');
    });

    test('rejects zero or negative bid amount', () => {
      const zeroResult = validateBidPlacement(100000, 10000, 0, 'ACTIVE', 'seller_1', 'bidder_1');
      const negativeResult = validateBidPlacement(100000, 10000, -5000, 'ACTIVE', 'seller_1', 'bidder_1');
      expect(zeroResult.valid).toBe(false);
      expect(zeroResult.error).toBe('INVALID_BID_AMOUNT');
      expect(negativeResult.valid).toBe(false);
      expect(negativeResult.error).toBe('INVALID_BID_AMOUNT');
    });

    test('rejects invalid auction configuration types', () => {
      const invalidCurrentBid = validateBidPlacement('100000', 10000, 120000, 'ACTIVE');
      const invalidStepPrice = validateBidPlacement(100000, '10000', 120000, 'ACTIVE');
      expect(invalidCurrentBid.valid).toBe(false);
      expect(invalidCurrentBid.error).toBe('INVALID_AUCTION_CONFIG');
      expect(invalidStepPrice.valid).toBe(false);
      expect(invalidStepPrice.error).toBe('INVALID_AUCTION_CONFIG');
    });

    test('rejects negative currentBid or non-positive stepPrice', () => {
      const negativeCurrentBid = validateBidPlacement(-10, 10000, 120000, 'ACTIVE');
      const zeroStepPrice = validateBidPlacement(100000, 0, 120000, 'ACTIVE');
      expect(negativeCurrentBid.valid).toBe(false);
      expect(negativeCurrentBid.error).toBe('INVALID_AUCTION_CONFIG');
      expect(zeroStepPrice.valid).toBe(false);
      expect(zeroStepPrice.error).toBe('INVALID_AUCTION_CONFIG');
    });

    test('rejects bid lower than minimum acceptable bid', () => {
      const result = validateBidPlacement(100000, 20000, 115000, 'ACTIVE', 'seller_1', 'bidder_2');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('BID_AMOUNT_TOO_LOW');
      expect(result.minAcceptable).toBe(120000);
    });

    test('accepts bid equal to minimum acceptable bid', () => {
      const result = validateBidPlacement(100000, 20000, 120000, 'ACTIVE', 'seller_1', 'bidder_2');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('accepts bid greater than minimum acceptable bid', () => {
      const result = validateBidPlacement(100000, 20000, 150000, 'ACTIVE', 'seller_1', 'bidder_2');
      expect(result.valid).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('calculateParticipationDeposit', () => {
    test('throws error when starting price is non-numeric', () => {
      expect(() => calculateParticipationDeposit('100000')).toThrow('INVALID_STARTING_PRICE');
    });

    test('throws error when starting price is NaN', () => {
      expect(() => calculateParticipationDeposit(Number.NaN)).toThrow('INVALID_STARTING_PRICE');
    });

    test('throws error when starting price is zero or negative', () => {
      expect(() => calculateParticipationDeposit(0)).toThrow('INVALID_STARTING_PRICE');
      expect(() => calculateParticipationDeposit(-50000)).toThrow('INVALID_STARTING_PRICE');
    });

    test('enforces floor deposit of 50000 when calculated 10% is below floor', () => {
      expect(calculateParticipationDeposit(200000)).toBe(50000);
      expect(calculateParticipationDeposit(499990)).toBe(50000);
    });

    test('calculates exact 10% deposit when above floor', () => {
      expect(calculateParticipationDeposit(500000)).toBe(50000);
      expect(calculateParticipationDeposit(5000000)).toBe(500000);
    });
  });

  describe('processAuctionSettlement', () => {
    test('throws error when participantList is not an array', () => {
      expect(() => processAuctionSettlement('winner_1', 'invalid_list')).toThrow('INVALID_PARTICIPANT_LIST');
    });

    test('returns CANCELLED_NO_WINNER and full refund list when winnerId is falsy', () => {
      const resultDefault = processAuctionSettlement(null);
      expect(resultDefault.status).toBe('CANCELLED_NO_WINNER');
      expect(resultDefault.winner).toBeNull();
      expect(resultDefault.refundList).toEqual([]);

      const resultWithList = processAuctionSettlement(null, ['user_1', 'user_2']);
      expect(resultWithList.status).toBe('CANCELLED_NO_WINNER');
      expect(resultWithList.winner).toBeNull();
      expect(resultWithList.refundList).toEqual(['user_1', 'user_2']);
    });

    test('returns SETTLED and refunds only non-winners', () => {
      const participants = ['winner_id', 'loser_1', 'loser_2'];
      const result = processAuctionSettlement('winner_id', participants);
      expect(result.status).toBe('SETTLED');
      expect(result.winner).toBe('winner_id');
      expect(result.refundList).toEqual(['loser_1', 'loser_2']);
    });
  });
});
