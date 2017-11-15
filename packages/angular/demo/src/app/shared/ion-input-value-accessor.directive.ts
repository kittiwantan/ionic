import { Directive } from '@angular/core';
import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'ion-input',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: IonInputValueAccessorDirective, multi: true }]
})
export class IonInputValueAccessorDirective extends DefaultValueAccessor implements ControlValueAccessor  {
}
