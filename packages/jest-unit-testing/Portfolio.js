
class Portfolio {
    constructor() {
      this.shares = {};
      this.num_shares = 0;
    }

    getShares() {
        return this.shares;
    }

    buyShare(tickerSymbol, quantity) {
        if (this.shares[tickerSymbol]) {
          this.shares[tickerSymbol] += quantity;
        } else {
          this.shares[tickerSymbol] = quantity;
          this.num_shares += 1;
        }
    }

    sellShare(tickerSymbol, quantity) {
      if (this.shares[tickerSymbol]) {
        if (this.shares[tickerSymbol] < quantity) {
          throw new Error('ShareSaleException');
        }
        else {
          this.shares[tickerSymbol] -= quantity;
        }
        if (this.shares[tickerSymbol] <= 0) {
          delete this.shares[tickerSymbol];
          this.num_shares -= 1;
        }
      }
    
    }
    getNumShares() {
      return this.num_shares;
    }

    getShare(tickerSymbol) { 
      if (this.shares[tickerSymbol]) {
        return this.shares[tickerSymbol];
      }
    }
}

export default Portfolio;