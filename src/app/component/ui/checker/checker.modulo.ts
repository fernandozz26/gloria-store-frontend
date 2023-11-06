import { NgModule } from '@angular/core';
import { CheckerComponent } from './checker.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    
    exports: [CheckerComponent],
    declarations: [CheckerComponent],
    imports: [CommonModule,
      FormsModule, ReactiveFormsModule,MatIconModule,MatCardModule,MatCheckboxModule,MatButtonModule,MatCardModule,MatButtonModule,MatFormFieldModule]
    
  })

  export class CheckerModule { }

