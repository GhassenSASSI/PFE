import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProductModalComponent } from './confirm-product-modal.component';

describe('ConfirmProductModalComponent', () => {
  let component: ConfirmProductModalComponent;
  let fixture: ComponentFixture<ConfirmProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmProductModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
