import mut from './Portfolio.js'; // MUT = Module Under Test

let portfolio;
beforeEach(() => {
    portfolio = new mut();
})

test('Creating portfolio -- success', () => {
    expect(mut).toBeDefined();
});

test('Checking shares empty -- success', () => {
    const shares = portfolio.getShares();
    expect(shares).toEqual({});
});

test('Checking number of unique tickers -- success', () => {
    portfolio.buyShare('RBX', 2);
    portfolio.buyShare('GME', 4);
    portfolio.buyShare('GOG', 8);

    const num_shares = portfolio.getNumShares();
    expect(num_shares).toEqual(3);
});

test('Get the complete portfolio -- Success', () => {
    portfolio.buyShare('AAPL', 10);
    portfolio.buyShare('GOOG', 5);
    portfolio.buyShare('MSFT', 15);

    const completePortfolio = portfolio.getShares();
    expect(completePortfolio).toEqual({
      'AAPL': 10,
      'GOOG': 5,
      'MSFT': 15,
    });
  });

  test('Test selling -- Success', () => {
    portfolio.buyShare('AAPL', 10);
    portfolio.buyShare('GOOG', 5);
    portfolio.buyShare('MSFT', 15);
    portfolio.sellShare('MSFT', 10);

    const completePortfolio = portfolio.getShares();
    expect(completePortfolio).toEqual({
      'AAPL': 10,
      'GOOG': 5,
      'MSFT': 5,
    });
  });

  test('Test getShare method', () => {
    portfolio.buyShare('AAPL', 10);
    portfolio.buyShare('GOOG', 5);
    portfolio.buyShare('MSFT', 15);
    portfolio.sellShare('MSFT', 10);

    const got = portfolio.getShare('MSFT');
    expect(got).toEqual(5);
  })

  test('Test not keeping not owned shares', () => {
    portfolio.buyShare('AAPL', 10);
    portfolio.buyShare('GOOG', 5);
    portfolio.buyShare('MSFT', 15);
    portfolio.sellShare('MSFT', 15);

    const completePortfolio = portfolio.getShares();
    expect(completePortfolio).toEqual({
      'AAPL': 10,
      'GOOG': 5,
    });
  })

  test('Test throw an exception', () => {
    portfolio.buyShare('AAPL', 10);
    portfolio.buyShare('GOOG', 5);
    portfolio.buyShare('MSFT', 15);
    expect(() => {
        portfolio.sellShare('MSFT', 20);
    }).toThrow('ShareSaleException');
  })
