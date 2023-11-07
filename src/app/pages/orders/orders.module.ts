import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { CheckerComponent } from 'src/app/component/ui/checker/checker.component';
import {MatRadioModule} from '@angular/material/radio'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs'
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import {MatCardModule} from '@angular/material/card'
import { NewOrderComponent } from 'src/app/component/ui/new-order/new-order.component';
import { FindOrderComponent } from 'src/app/component/ui/find-order/find-order.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { SpinnerModule } from 'src/app/component/ui/spinner/spinner.module';
import { TestPageModule } from '../test-page/test-page.module';
import { CheckerModule } from 'src/app/component/ui/checker/checker.modulo';
import { MosaicoModule } from 'src/app/component/ui/mosaico/mosaico.module';
@NgModule({
  declarations: [
    OrdersComponent, NewOrderComponent, FindOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatRadioModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatCheckboxModule,MatIconModule,MatTabsModule,MatAutocompleteModule,
    MatCardModule, SpinnerModule, CheckerModule, MosaicoModule
  ]
})
export class OrdersModule { }
