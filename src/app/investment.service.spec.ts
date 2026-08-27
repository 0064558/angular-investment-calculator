import { InvestmentService } from './investment.service';

describe('InvestmentService', () => {
  let service: InvestmentService;

  beforeEach(() => {
    service = new InvestmentService();
  });

  it('calculates the annual investment projection', () => {
    service.onCalculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 2,
    });

    const results = service.resultData();

    expect(results?.length).toBe(2);
    expect(results?.[0]).toEqual({
      year: 1,
      interest: 100,
      valueEndOfYear: 1200,
      annualInvestment: 100,
      totalInterest: 100,
      totalAmountInvested: 1100,
    });
    expect(results?.[1].valueEndOfYear).toBe(1420);
    expect(results?.[1].totalInterest).toBe(220);
  });

  it('does not create results for invalid input', () => {
    service.onCalculateInvestmentResults({
      initialInvestment: -1,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 2,
    });

    expect(service.resultData()).toBeUndefined();
  });

  it('clears the current results', () => {
    service.onCalculateInvestmentResults({
      initialInvestment: 1000,
      annualInvestment: 100,
      expectedReturn: 10,
      duration: 1,
    });

    service.clearResults();

    expect(service.resultData()).toBeUndefined();
  });
});
