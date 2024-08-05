import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements AsyncValidator {
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });
        if (email == 'fernando@google.com') {
          subscriber.next({ emailTaken: true }); // NEXT: para emitir el siguiente valor.
          subscriber.complete(); // hace la limpieza y va a desusbcribir
          //return;
        }
        subscriber.next(null); // Emitimos que el mail de la persona no esta tomado
        subscriber.complete();
      }
    );
    return httpCallObservable;
  }


  // ESTO SIRVE PARA HACER UNA BREVE PRUEBA
  // validate(
  //   control: AbstractControl<any, any>
  // ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({ email });

  //   return of({
  //     emailTaken: true,
  //   }).pipe(
  //     delay(2000)
  //   );
  // }
}

// REFERENCIA PERSONAL: NORMALMENTE HARIAMOS ESTO
// return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
// .pipe(
//   map(
//     resp => {
//       return ( resp.lengt === 0
//         ? null
//         : { emailTaken:true }
//       )
//     }
//   )
// )
