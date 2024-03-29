import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

//Interceptores
import {intercetorProvider} from './shared/interceptors/order-interceptor.service';

// PAGE MODULES
import { TestPageModule } from './pages/test-page/test-page.module';
import { OrdersModule } from './pages/orders/orders.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CheckerModule } from './component/ui/checker/checker.modulo';
import { FormsModule } from '@angular/forms';
import { MosaicoModule } from './component/ui/mosaico/mosaico.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,FormsModule,
    HttpClientModule, OrdersModule, TestPageModule, CheckerModule, MosaicoModule
    
  ],

  providers: 
  [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  intercetorProvider,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
