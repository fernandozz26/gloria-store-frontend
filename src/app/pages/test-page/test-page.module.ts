import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerModule } from 'src/app/component/ui/spinner/spinner.module';
import { CheckerModule } from 'src/app/component/ui/checker/checker.modulo';
import { ProductItemModule } from 'src/app/component/ui/product-item/product-item-module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    CommonModule,MatProgressSpinnerModule,SpinnerModule, ProductItemModule, CheckerModule,
    
    MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule,MatIconModule, MatButtonModule
    ,FormsModule
  ]
  
})
export class TestPageModule { }
