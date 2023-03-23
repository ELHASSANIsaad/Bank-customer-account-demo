

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../models/customer.model';
//import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-listing-customers',
  templateUrl: './listing-customers.component.html',
  styleUrls: ['./listing-customers.component.css']
})
export class ListingCustomersComponent  implements OnInit {
  customers: Customer[] = [];
  isDeleteLoading: any[] = [];
  
  searchQuery = '';
  searchQuerySubject = new Subject<string>();

  constructor(private customerService: CustomerService) {
    this.searchQuerySubject
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((query: string) => {
        this.search(query);
      });
  }
 

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.isDeleteLoading = customers.map((p) => ({
        id: p.id,
        isLoading: false,
      }));
    });
  }

  

  changeValueDeposit(event: any) {
    const { value, customer } = event;
    let NewCustomer: Customer = customer;

    const amount: number = value

    NewCustomer.balance += amount;
    this.customerService.updateCustomer(NewCustomer).subscribe((updatedCustomer) => {
      this.customers = this.customers.map((p) => {
        if (p.id === updatedCustomer.id) {
          return updatedCustomer;
        }
        return p;
      });
    });

  }

  changeValueWithdraw(event: any) {
    const { value, customer } = event;
    let NewCustomer: Customer = customer;

    const amount: number = value

    NewCustomer.balance -= amount;
    this.customerService.updateCustomer(NewCustomer).subscribe((updatedCustomer) => {
      this.customers = this.customers.map((p) => {
        if (p.id === updatedCustomer.id) {
          return updatedCustomer;
        }
        return p;
      });
    });

  }



  delete(customer: Customer) {
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers.filter((p) => p.id !== customer.id);
      this.setIsLoading(customer, false);
    });
  }

  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((p) => p.id === customer.id)?.isLoading;
  }

  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
  }

  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }

  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((p) => {
      if (p.id === customer.id) {
        return { ...p, isLoading };
      }
      return p;
    });
  }

}
