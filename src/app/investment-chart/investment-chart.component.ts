import { CurrencyPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { InvestmentService } from '../investment.service';

type ChartPoint = {
  year: number;
  x: number;
  valueY: number;
  investedY: number;
  valueEndOfYear: number;
  totalAmountInvested: number;
};

@Component({
  selector: 'app-investment-chart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-chart.component.html',
  styleUrl: './investment-chart.component.css',
})
export class InvestmentChartComponent {
  readonly chartLeft = 58;
  readonly chartRight = 760;
  readonly chartTop = 24;
  readonly chartBottom = 238;

  readonly results = this.investmentService.resultData;

  readonly maximumValue = computed(() => {
    const data = this.results();

    if (!data?.length) {
      return 1;
    }

    return Math.max(
      1,
      ...data.flatMap((result) => [
        result.valueEndOfYear,
        result.totalAmountInvested,
      ]),
    );
  });

  readonly points = computed<ChartPoint[]>(() => {
    const data = this.results();

    if (!data?.length) {
      return [];
    }

    const chartWidth = this.chartRight - this.chartLeft;
    const chartHeight = this.chartBottom - this.chartTop;
    const xStep = data.length === 1 ? 0 : chartWidth / (data.length - 1);
    const maxValue = this.maximumValue();

    return data.map((result, index) => ({
      year: result.year,
      x: this.chartLeft + index * xStep,
      valueY: this.chartBottom - (result.valueEndOfYear / maxValue) * chartHeight,
      investedY:
        this.chartBottom - (result.totalAmountInvested / maxValue) * chartHeight,
      valueEndOfYear: result.valueEndOfYear,
      totalAmountInvested: result.totalAmountInvested,
    }));
  });

  readonly valueLine = computed(() =>
    this.points()
      .map((point) => `${point.x},${point.valueY}`)
      .join(' '),
  );

  readonly investedLine = computed(() =>
    this.points()
      .map((point) => `${point.x},${point.investedY}`)
      .join(' '),
  );

  readonly gridLines = computed(() => {
    const chartHeight = this.chartBottom - this.chartTop;
    const maxValue = this.maximumValue();

    return [0, 25, 50, 75, 100].map((percentage) => ({
      percentage,
      y: this.chartBottom - (percentage / 100) * chartHeight,
      value: (percentage / 100) * maxValue,
    }));
  });

  constructor(private readonly investmentService: InvestmentService) {}
}
