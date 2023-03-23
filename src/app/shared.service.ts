import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from './models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {



  private inputAttributeValue = new BehaviorSubject<any>("");

  setInputAttributeValue(value: any) {
    this.inputAttributeValue.next(value);
  }

  getInputAttributeValue() {
    return this.inputAttributeValue.asObservable();
  }
}
