import { NgModule } from '@angular/core';
import { ProductItemComponent } from './product-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CheckerModule } from '../checker/checker.modulo';
import { FormsModule } from '@angular/forms';


@NgModule({
    
    exports: [ProductItemComponent],
    declarations: [ProductItemComponent],
    imports: [MatIconModule,MatCardModule,MatCheckboxModule, CheckerModule, FormsModule]
    
  })

  export class ProductItemModule { }