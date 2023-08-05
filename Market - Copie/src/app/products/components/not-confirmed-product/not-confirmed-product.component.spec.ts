import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfirmedProductComponent } from './not-confirmed-product.component';

describe('NotConfirmedProductComponent', () => {
  let component: NotConfirmedProductComponent;
  let fixture: ComponentFixture<NotConfirmedProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotConfirmedProductComponent]
    });
    fixture = TestBed.createComponent(NotConfirmedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
