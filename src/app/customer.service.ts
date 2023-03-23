import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';
//import { PokemonFormData } from './models/pokemon-form-data.model';
import { Customer } from './models/customer.model';

const API_URL = 'http://localhost:3000/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(API_URL);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(`${API_URL}/${customer.id}`);
  }



  search(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }
/*
  searchByNameCin(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?q=${name}`);
  }*/

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_URL}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(API_URL, customer);
  }


  getCustomerByCIN(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_URL}?cin=${name}`);
  }


  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_URL}/${customer.id}`, customer);
  }


  getTotalCustomers(): Observable<number> { 
    return this.http.get<Customer[]>(API_URL).pipe( 
      map((customers: Customer[]) => { 
        return customers.length; 
      }) 
    ); 
  } 
 
  getTotalBalance(): Observable<number> { 
    return this.http.get<Customer[]>(API_URL).pipe( 
      map((customers: Customer[]) => { 
        let totalBalance = 0; 
        for (const customer of customers) { 
         
            totalBalance += customer.balance; 

        } 
        return totalBalance; 
      }) 
    ); 
  }

}
