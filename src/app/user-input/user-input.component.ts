import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(private investmentService: InvestmentService) {}

  enteredInitialInvestment = signal(0);
  enteredAnnualInvestment = signal(0);
  enteredExpectedInvestment = signal(5);
  enteredDuration = signal(10);

  onSubmit() {
    this.investmentService.onCalculateInvestmentResults({
      initialInvestment: this.enteredInitialInvestment(),
      annualInvestment: this.enteredAnnualInvestment(),
      expectedReturn: this.enteredExpectedInvestment(),
      duration: this.enteredDuration()
    });
  }
}
