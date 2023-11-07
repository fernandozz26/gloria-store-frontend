import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EndPointConstant } from 'src/app/shared/constants/constants';
import { OrderDetailWName } from 'src/app/shared/classes/pedido.class';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.sass']
})
export class TestPageComponent {
  showSpinner:boolean = false;
  mosaicoData: OrderDetailWName[] = [];
  constructor(private http: HttpClient,private readonly spinnerSvc:SpinnerService){
    
  }

}
