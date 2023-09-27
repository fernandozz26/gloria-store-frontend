import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MainViewService } from 'src/app/services/main.view.serive';
import { OrderService } from 'src/app/services/order.service';
import { OrderReports } from 'src/app/shared/reports/order-report';
import { EndPointConstant } from '../../../constants/constants';
import { ClientName } from '../../classes/client.class';
import { Order, OrderDetail } from '../../classes/pedido.class';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.sass']
})


export class FindOrderComponent {
 
  orderData: Order[] = [];
  selectedOrderId: number = 0;

  constructor(private http: HttpClient,private _sanitizer: DomSanitizer, private readonly orderSvc: OrderService, 
    private readonly mainViewSvc: MainViewService, private readonly spinnerSvc:SpinnerService){}
  
  ngOnInit():void{
    this.spinnerSvc.setSpinnerValue(true);
    this.orderSvc.orderId$.subscribe(orderId => {this.selectedOrderId = orderId});
    
    this.mainViewSvc.checkFindOrder$.subscribe((status:Boolean) => {
      if(status){
        this.spinnerSvc.setSpinnerValue(true);
        this.http.get<Order[]>(EndPointConstant.ORDER_ENDPOINT+"all").subscribe(
          res => {
            this.orderData = res;
            this.spinnerSvc.setSpinnerValue(false);
          }, err => {
            this.spinnerSvc.setSpinnerValue(false);
          }
          );

          
      }
    }, err => {
      this.spinnerSvc.setSpinnerValue(false);
    })
    

      
  }


  generetePDF(orderId: number):void {
    
    let order!:Order;
    let orderDetail!: OrderDetail[];
    let clientName!: ClientName[];
    this.spinnerSvc.setSpinnerValue(true);
    this.http.get<Order>(EndPointConstant.ORDER_ENDPOINT+orderId).subscribe(
      res => {
        order = res;

        this.http.get<ClientName[]>(EndPointConstant.CLIENT_ENDPOINT+orderId).subscribe(clients =>{
          clientName = clients;

          this.http.get<OrderDetail[]>(EndPointConstant.ORDER_DETAIL_ENDPOINT+"/"+orderId).subscribe(
            res => {
              orderDetail = res;

              
              
              let orderReports:OrderReports = new OrderReports(this._sanitizer);
              let html = document.createElement("html");
              let head = document.createElement("head");
              head.innerHTML = orderReports.header();
              let body = document.createElement("body");
              body.innerHTML = orderReports.orderReport(order,orderDetail,clients);
  
              html.innerHTML = head.innerHTML + body.innerHTML;
              this.spinnerSvc.setSpinnerValue(false);
              var ventana = window.open('', 'PRINT', 'height=900,width=700');
              ventana?.document.write(html.innerHTML);
              ventana?.document.close();
  ventana?.focus();
  ventana?.print();
  ventana?.close();
              /*
              doc.html(html.innerHTML, {
                callback: function(doc){doc.save()},
                margin: [10,10,10,10],
                autoPaging: 'slice',
                x:0,
                y:0,
                width:140,
                windowWidth: 500
              })*/
            }, err => {
              this.spinnerSvc.setSpinnerValue(false);
            }
            );

        },errr => {
          this.spinnerSvc.setSpinnerValue(false);
        })
        
        
      }, err => {
        this.spinnerSvc.setSpinnerValue(false);
      }
      );

     



      /*
    let div = document.createElement("div")
    div.innerHTML = "Culos"
    const content = div;
    doc.html(content.innerHTML, {
      callback: function(doc){doc.save()},
      margin: [10,10,10,10],
      autoPaging: 'text',
      x:0,
      y:0,
      width:675,
      windowWidth: 675
    })
    */
  }

  setSelectedOrderId(orderId: number): void{
    this.orderSvc.setOrder(orderId);
  }
  
}
