import { NgModule } from '@angular/core';
import { MosaicoComponent } from './mosaico.component';
import { ProductItemModule } from 'src/app/component/ui/product-item/product-item-module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  exports:[MosaicoComponent],
  declarations: [MosaicoComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule,MatIconModule, MatButtonModule
    ,FormsModule, ProductItemModule
  ]
})
export class MosaicoModule { }
