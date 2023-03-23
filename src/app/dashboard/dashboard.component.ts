import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  totalCustomers: number = 0;
  totalBalance: number = 0;

  constructor(private customerService: CustomerService) {


  }


  ngOnInit(): void {
    this.customerService.getTotalCustomers().subscribe((customers) => {
      this.totalCustomers = customers;
    
    });

    this.customerService.getTotalBalance().subscribe((customers) => {
      this.totalBalance = customers;
    
    });
  }


}
