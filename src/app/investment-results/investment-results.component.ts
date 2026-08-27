import { CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { InvestmentService } from '../investment.service';
import { InvestmentChartComponent } from '../investment-chart/investment-chart.component';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe, InvestmentChartComponent],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  constructor(private investmentService: InvestmentService) {}

  results = this.investmentService.resultData;

  summary = computed(() => {
    const data = this.results();

    if (!data?.length) {
      return undefined;
    }

    const finalResult = data[data.length - 1];

    return {
      finalValue: finalResult.valueEndOfYear,
      totalInvested: finalResult.totalAmountInvested,
      totalInterest: finalResult.totalInterest,
    };
  });
}
