import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type InvestmentInput } from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  @Output() calculate = new EventEmitter<InvestmentInput>();

  enteredInitialInvestment: number = 0;
  enteredAnnualInvestment: number = 0;
  enteredExpectedInvestment: number = 5;
  enteredDuration: number = 10;

  onSubmit() {
    this.calculate.emit({
      initialInvestment: this.enteredInitialInvestment,
      annualInvestment: this.enteredAnnualInvestment,
      expectedReturn: this.enteredExpectedInvestment,
      duration: this.enteredDuration
    });
  }
}
