function validateBidPlacement(currentBid, stepPrice, bidAmount, status, sellerId, bidderId) {
  if (status !== 'ACTIVE') {
    return { valid: false, error: 'AUCTION_NOT_ACTIVE' };
  }
  if (sellerId && bidderId && sellerId === bidderId) {
    return { valid: false, error: 'SELF_BIDDING_NOT_ALLOWED' };
  }
  if (typeof bidAmount !== 'number' || Number.isNaN(bidAmount) || bidAmount <= 0) {
    return { valid: false, error: 'INVALID_BID_AMOUNT' };
  }
  if (typeof currentBid !== 'number' || typeof stepPrice !== 'number' || currentBid < 0 || stepPrice <= 0) {
    return { valid: false, error: 'INVALID_AUCTION_CONFIG' };
  }
  const minAcceptable = currentBid + stepPrice;
  if (bidAmount < minAcceptable) {
    return { valid: false, error: 'BID_AMOUNT_TOO_LOW', minAcceptable };
  }
  return { valid: true, error: null };
}

function calculateParticipationDeposit(startingPrice) {
  if (typeof startingPrice !== 'number' || Number.isNaN(startingPrice) || startingPrice <= 0) {
    throw new Error('INVALID_STARTING_PRICE');
  }
  const deposit = startingPrice * 0.1;
  return deposit < 50000 ? 50000 : deposit;
}

function processAuctionSettlement(winnerId, participantList = []) {
  if (!Array.isArray(participantList)) {
    throw new Error('INVALID_PARTICIPANT_LIST');
  }
  if (!winnerId) {
    return {
      status: 'CANCELLED_NO_WINNER',
      winner: null,
      refundList: [...participantList]
    };
  }
  const refundList = participantList.filter((participantId) => participantId !== winnerId);
  return {
    status: 'SETTLED',
    winner: winnerId,
    refundList
  };
}

module.exports = {
  validateBidPlacement,
  calculateParticipationDeposit,
  processAuctionSettlement
};
