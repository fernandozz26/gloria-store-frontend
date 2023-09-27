import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerModule } from 'src/app/component/ui/spinner/spinner.module';

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    CommonModule,MatProgressSpinnerModule,SpinnerModule
  ]
})
export class TestPageModule { }
