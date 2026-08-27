import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

type NumberFormat = 'currency' | 'percentage';

@Directive({
  selector: 'input[appNumberFormat]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BrNumberInputDirective),
      multi: true,
    },
  ],
})
export class BrNumberInputDirective implements ControlValueAccessor {
  @Input() appNumberFormat: NumberFormat = 'currency';

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart ?? input.value.length;
    const digitsBeforeCursor = input.value
      .slice(0, cursorPosition)
      .replace(/\D/g, '').length;

    const numericValue = this.parseValue(input.value);
    const formattedValue = this.formatWhileTyping(input.value);

    input.value = formattedValue;
    const nextCursorPosition = this.findCursorPosition(
      formattedValue,
      digitsBeforeCursor,
    );
    input.setSelectionRange(nextCursorPosition, nextCursorPosition);

    this.onChange(numericValue);
  }

  @HostListener('blur')
  onBlur(): void {
    const input = this.elementRef.nativeElement;
    const numericValue = this.parseValue(input.value);

    input.value = numericValue === null ? '' : this.formatValue(numericValue);
    this.onTouched();
  }

  writeValue(value: number | null): void {
    this.elementRef.nativeElement.value =
      value === null || value === undefined ? '' : this.formatValue(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private parseValue(value: string): number | null {
    const rawValue = value.replace(/[^\d,.]/g, '');

    if (!rawValue) {
      return null;
    }

    let normalizedValue = rawValue;

    if (rawValue.includes(',')) {
      normalizedValue = rawValue.replace(/\./g, '').replace(',', '.');
    } else if (rawValue.includes('.')) {
      const parts = rawValue.split('.');
      const lastPart = parts[parts.length - 1];

      normalizedValue =
        parts.length === 2 && lastPart.length <= 2
          ? `${parts[0]}.${lastPart}`
          : rawValue.replace(/\./g, '');
    }

    const numericValue = Number(normalizedValue);

    return Number.isFinite(numericValue) ? numericValue : null;
  }

  private formatWhileTyping(value: string): string {
    const rawValue = value.replace(/[^\d,.]/g, '');

    if (!rawValue) {
      return '';
    }

    const hasComma = rawValue.includes(',');
    const dotParts = rawValue.split('.');
    const dotIsDecimal =
      !hasComma && dotParts.length === 2 && dotParts[1].length <= 2;
    const hasDecimalSeparator = hasComma || dotIsDecimal;
    const parts = hasComma ? rawValue.split(',') : dotParts;
    const integerPart = parts[0].replace(/\./g, '') || '0';
    const decimalPart = hasDecimalSeparator
      ? parts.slice(1).join('').replace(/\./g, '').slice(0, 2)
      : '';
    const formattedInteger = Number(integerPart).toLocaleString('pt-BR');

    return hasDecimalSeparator
      ? `${formattedInteger},${decimalPart}`
      : formattedInteger;
  }

  private formatValue(value: number): string {
    const maximumFractionDigits = this.appNumberFormat === 'percentage' ? 2 : 2;

    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits,
    });
  }

  private findCursorPosition(value: string, digitsBeforeCursor: number): number {
    if (digitsBeforeCursor === 0) {
      return 0;
    }

    let digitsSeen = 0;

    for (let index = 0; index < value.length; index++) {
      if (/\d/.test(value[index])) {
        digitsSeen++;
      }

      if (digitsSeen >= digitsBeforeCursor) {
        return index + 1;
      }
    }

    return value.length;
  }
}
