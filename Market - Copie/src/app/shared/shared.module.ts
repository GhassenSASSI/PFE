import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SelectComponent } from './components/select/select.component';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { SharedService } from './services/shared.service';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { SideBarComponent } from './components/side-bar/side-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    UserButtonComponent,
    CarouselComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbDropdownModule,
    CarouselModule,
    IconModule,
    NgbCarouselModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    SelectComponent,
    UserButtonComponent,
    FormsModule,
    CarouselComponent,
    SideBarComponent
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
