import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio'
import {MatButtonModule} from '@angular/material/button'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card'
// componentes
import { NewOrderComponent } from './component/ui/new-order/new-order.component';
import { FindOrderComponent } from './component/ui/find-order/find-order.component'
//Interceptores
import {intercetorProvider} from './shared/interceptors/order-interceptor.service';
import { CheckerComponent } from './component/ui/checker/checker.component'

@NgModule({
  declarations: [
    AppComponent,
    NewOrderComponent,
    FindOrderComponent,
    CheckerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,MatIconModule,MatTabsModule,MatAutocompleteModule,
    MatCardModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule
    
  ],

  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},intercetorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
