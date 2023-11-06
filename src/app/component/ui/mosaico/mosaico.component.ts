import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { OrderDetailWName } from 'src/app/shared/classes/pedido.class';
import { EndPointConstant } from 'src/app/shared/constants/constants';
import { DateFormat } from 'src/app/shared/utils/date-format';
@Component({
  selector: 'app-mosaico',
  templateUrl: './mosaico.component.html',
  styleUrls: ['./mosaico.component.sass']
})
export class MosaicoComponent {
  mosaicoData: OrderDetailWName[] = [];
  stDate!: Date;
  edDate!: Date;

  constructor(private http: HttpClient,private readonly spinnerSvc:SpinnerService){
    
  }



  ngOnInit():void{
    
  }

  lookProduct():void{
    
    if((this.stDate != null  || this.stDate != "") && (this.edDate != null  || this.edDate != "")){
      let range = {stDate:DateFormat.mmddyyyyFormat(this.stDate), 
        edDate:DateFormat.mmddyyyyFormat( this.edDate)};
      this.spinnerSvc.setSpinnerValue(true);
      this.http.post<any>(EndPointConstant.ORDER_DETAIL_ENDPOINT + "/undelivery", range).subscribe(
        res => {
          this.mosaicoData = res;
          
          this.spinnerSvc.setSpinnerValue(false);
        },
        err => {
          console.log("error")
          this.spinnerSvc.setSpinnerValue(false);
        }
      )
    }
  }
}
