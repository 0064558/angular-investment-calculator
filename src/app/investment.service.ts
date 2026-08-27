import { Injectable, signal } from "@angular/core";

import { type InvestmentInput } from "./investment-input.model";
import { type InvestmentResult } from "./investment-result.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {

    private readonly _resultData = signal<InvestmentResult[] | undefined>(undefined);
    readonly resultData = this._resultData.asReadonly();

    onCalculateInvestmentResults(data: InvestmentInput) {
        const { initialInvestment, annualInvestment, expectedReturn, duration } = data;
        if (
            !Number.isFinite(initialInvestment) ||
            !Number.isFinite(annualInvestment) ||
            !Number.isFinite(expectedReturn) ||
            !Number.isInteger(duration) ||
            initialInvestment < 0 ||
            annualInvestment < 0 ||
            expectedReturn < 0 ||
            duration < 1
        ) {
            return;
        }

        const annualData: InvestmentResult[] = [];
        let investmentValue = initialInvestment;
    
        for (let i = 0; i < duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (expectedReturn / 100);
          investmentValue += interestEarnedInYear + annualInvestment;
          const totalInterest =
            investmentValue - annualInvestment * year - initialInvestment;
          annualData.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: initialInvestment + annualInvestment * year,
          });
        }
    
        this._resultData.set(annualData);
      }
}
