import { Component, signal } from '@angular/core';
import { FormsModule, type NgForm } from '@angular/forms';
import { InvestmentService } from '../investment.service';
import { BrNumberInputDirective } from '../br-number-input.directive';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, BrNumberInputDirective],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(private investmentService: InvestmentService) {}

  enteredInitialInvestment = signal(0);
  enteredAnnualInvestment = signal(0);
  enteredExpectedReturn = signal(5);
  enteredDuration = signal(10);

  onSubmit() {
    this.investmentService.onCalculateInvestmentResults({
      initialInvestment: this.enteredInitialInvestment(),
      annualInvestment: this.enteredAnnualInvestment(),
      expectedReturn: this.enteredExpectedReturn(),
      duration: this.enteredDuration()
    });
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.enteredInitialInvestment.set(0);
    this.enteredAnnualInvestment.set(0);
    this.enteredExpectedReturn.set(5);
    this.enteredDuration.set(10);
    this.investmentService.clearResults();
  }
}
