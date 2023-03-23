import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCustomersComponent } from './listing-customers.component';

describe('ListingCustomersComponent', () => {
  let component: ListingCustomersComponent;
  let fixture: ComponentFixture<ListingCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
