import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';

import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';



import { OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent  implements OnInit {
  customer?: Customer;

  

  









  customerForm: FormGroup;
  isLoading = false;

 // @Input() customer?: Customer;

  myName?: string = this.customer?.firstName;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      id: [ ''


      ],
      cin: [
        this.customer?.cin ,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
        [this.validateCin.bind(this)],
      ],
      firstName: [
        this.customer?.firstName,
        [Validators.required, Validators.min(2), Validators.max(120)],
      ],
      lastName: [
        this.customer?.lastName,
        [Validators.required, Validators.min(2), Validators.max(120)],
      ],
      image: [
        this.customer?.image,
        [Validators.required],
      ],
      email: [
        this.customer?.email,
        [Validators.required, Validators.min(2), Validators.max(120)],
      ],
      gender: [
        this.customer?.gender,
        [Validators.required, Validators.min(2), Validators.max(120)],
      ],
      address: [
        this.customer?.address,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      balance: [
        this.customer?.balance,
        [Validators.required, Validators.min(0), Validators.max(120)],
      ],
      accountType: [
        this.customer?.accountType,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

 ngOnInit() : void {

  let idInLink: any;

  this.activeRoute.params.subscribe(params => {
    idInLink = params['id']; // replace 'id' with the name of your parameter
    console.log(idInLink); // do whatever you need to do with the parameter value
    
  });
  
  if(idInLink === undefined || idInLink === "undefined")
  {
    console.log("undefff")
    return;
  }




/*
    console.log()

    const xx : any = this.activeRoute.params;
    const xxx : any = this.customerService.getById(xx['id'])
    console.log(this.customer?.cin);
    console.log(xxx);*/

   /* if(this.activeRoute.params
      .pipe(switchMap((params) => this.customerService.getById(params['id']) == ""){

      };*/

    this.activeRoute.params
      .pipe(switchMap((params) => this.customerService.getById(params['id'])))
      .subscribe({
        next: (customer) => (
          this.customerForm.patchValue(customer),
          this.customer = customer),
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }

  test(){
    console.log("test called up");
    console.log(this.customer);
  }
  


  submit() {
    this.isLoading = true;

    if( Number.isFinite(this.customer?.id))
    { // updatin

      console.log(this.customer);
      console.log(this.customerForm.value);

      //this.customerForm.patchValue(this.customer?);

      this.customerService
      .updateCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
       // this.router.navigate(['/details', customer.id]);  
      });

    }else{ // creating new one

      this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
       // this.router.navigate(['/details', customer.id]);
      });

    }

    
  }
  
/*
  submit() {
    this.isLoading = true;
    this.customerService
      .createCustomer(this.customerForm.value)
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
       // this.router.navigate(['/details', customer.id]);
      });
  }*/

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }

  validateCin(
    control: AbstractControl
  ): Observable<{ cinExists: boolean } | null> {
    return this.customerService.getCustomerByCIN(control.value).pipe(
      map((customers: Customer[]) => {
        if (customers.length > 0) {
          return { cinExists: true };
        }
        return null;
      })
    );
  }

}
