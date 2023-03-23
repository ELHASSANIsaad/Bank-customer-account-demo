import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component'; 
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent {
  @Input() customer?: Customer;
  @Input() isDeleteLoading = false;

  //@Output() capture = new EventEmitter<Pokemon>();
  @Output() changeValueDeposit = new EventEmitter<any>();
  @Output() changeValueWithdraw = new EventEmitter<any>();
  @Output() delete = new EventEmitter<Customer>();

  //@ViewChild(UpdateCustomerComponent) updateCustomerComponent?: UpdateCustomerComponent;




  constructor(private customerService: CustomerService,     private router: Router,
     private sharedService: SharedService){}

  

  setValue() {
    this.sharedService.setInputAttributeValue(this.customer);
  }
 
/*
  Deposit(value: any) {
    //this.changeValue.emit({ value , key: 'balance', customer: this.customer });
    let newBalance = this.customer?.balance + value;
    const event: any = { value: newBalance , key: 'balance', customer: this.customer };

    changeValue(event: any) {
      const { value, key, customer } = event;
      this.customerService
        .updateCustomer({ ...customer, [key]: value })
        .subscribe((updatedCustomer) => {
          this.pokemons = this.pokemons.map((p) => {
            if (p.id === updatedCustomer.id) {
              return updatedCustomer;
            }
            return p;
          });
        });
    }
  }*/

 

  RedirectToDetail(){
    //console.log(['/details', this.customer?.id])
    this.router.navigate(['/details', this.customer?.id]);

  }

  UpdateCustomer()
  {

    //const customerToUpdate = this.customer;

    
    this.router.navigate(['/customer-form', this.customer?.id]);

  }


  Deposit(value: number){
      this.changeValueDeposit.emit({"value": value, "customer": this.customer});
  }

  withdraw(value: number){
    this.changeValueWithdraw.emit({"value": value, "customer": this.customer});
}


  /*
  onCapture() {
    this.capture.emit(this.pokemon);
  }

  onNameChange(name: any) {
    this.changeValue.emit({ value: name, key: 'name', pokemon: this.pokemon });
  }

  onAttackChange(value: any) {
    this.changeValue.emit({ value, key: 'attack', pokemon: this.pokemon });
  }

  onDefenseChange(value: any) {
    this.changeValue.emit({ value, key: 'defense', pokemon: this.pokemon });
  }
*/
  onDelete() {
    this.delete.emit(this.customer);
  }



}


/**
 *   @Output() capture = new EventEmitter<Pokemon>();
 * 
 * 
 * 
 */
