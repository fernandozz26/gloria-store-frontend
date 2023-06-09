import { Component } from '@angular/core';
import { Order, OrderDetail } from '../../classes/pedido.class';
import { HttpClient } from '@angular/common/http';
import {EndPointConstant} from '../../../constants/constants'
import { ClientName } from '../../classes/client.class';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderReports } from 'src/app/shared/reports/order-report';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-find-order',
  templateUrl: './find-order.component.html',
  styleUrls: ['./find-order.component.sass']
})


export class FindOrderComponent {
 
  orderData: Order[] = [];
  selectedOrderId: number = 0;

  constructor(private http: HttpClient,private _sanitizer: DomSanitizer, private readonly orderSvc: OrderService){}
  
  ngOnInit():void{

    this.orderSvc.orderId$.subscribe(orderId => {this.selectedOrderId = orderId})
    this.http.get<Order[]>(EndPointConstant.ORDER_ENDPOINT+"all").subscribe(
      res => {
        this.orderData = res;
      }, err => {}
      );
  }


  generetePDF(orderId: number):void {
    
    let order!:Order;
    let orderDetail!: OrderDetail[];
    let clientName!: ClientName[];

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
            }, err => {}
            );

        },errr => {
          
        })
        
        
      }, err => {}
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
