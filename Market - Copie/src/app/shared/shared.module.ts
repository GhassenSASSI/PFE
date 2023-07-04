import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { SharedService } from './services/shared.service';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    UserButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbDropdownModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    UserButtonComponent,
    FormsModule
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
