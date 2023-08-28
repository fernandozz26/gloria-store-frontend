import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EndPointConstant } from 'src/app/constants/constants';
import { CheckerService } from 'src/app/services/checker.service';
import { CheckerClient } from '../../classes/checker.client.class';
import { ClientName } from '../../classes/client.class';
import { OrderDetail } from '../../classes/pedido.class';
@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.sass']
})
export class CheckerComponent {

  orderDetails: OrderDetail[] = [];
  clients: CheckerClient[] = [];
  total: number = 0;

  constructor(private readonly checkerSvc:CheckerService, private http: HttpClient){}

  ngOnInit():void{
    this.checkerSvc.total$.subscribe(tota => {
      this.total = tota;
    });

    this.checkerSvc.orders$.subscribe(details =>{
      this.orderDetails =  details;
      this.clients = [];
      this.orderDetails.forEach(order => {
        this.http.get<ClientName[]>(EndPointConstant.CLIENT_ENDPOINT + order.orderId).subscribe(res => {
          res.forEach(client => {
            if(client.orderId == order.orderId && client.clientNameId == order.clientNameId){
              this.clients.push( new CheckerClient(order.clientNameId, order.orderId, client.clientName, order.subtotal,order.orderDetailId))
            }
          })
      }, err=>{
  
      })
      })
    })
  }
  
  calcTotal():void{
    this.checkerSvc.calcTotal();
  }

  deleteUserFromChecker (orderId: number, clientId:number): void{
    
    let details: OrderDetail[] = [];
    let isIndex = -1;
    this.orderDetails.forEach((order:OrderDetail, index:number) => {
      if(order.clientNameId === clientId && order.orderId === orderId){
        isIndex = index;
      }
    });

    this.orderDetails.forEach((order:OrderDetail, index:number) => {
      if(index != isIndex){
        details.push(order)
      }
    });
    this.orderDetails = [];
    this.clients = [];
    this.checkerSvc.setClientList(details);
    //this.clients = newChecker;
   
    this.calcTotal();
    
  }

  deleteAllChecker():void{
    if(confirm("Se eliminaran todos los registros del Checker \n ¿Esta seguro de continuar?")){
      this.checkerSvc.cleanChecker();
    }
  }
  deleteUserFromCheckerOver = function(id:string) {
    let showBtn = document.getElementById("checkerNameCleanerBtn"+id);
    if(showBtn != null){
      showBtn.style.display = "flex"
    }
  }

  deleteUserFromCheckerLeave = function(id:string) {
    let showBtn = document.getElementById("checkerNameCleanerBtn"+id);
    if(showBtn != null){
      showBtn.style.display = "none"
    }
  }

  packageAllProductsInChecker(): void{
    this.http.patch<any>(EndPointConstant.ORDER_ENDPOINT+"pacakage",this.orderDetails).subscribe(
      res => {
        this.checkerSvc.refreshNewOrder();
        alert("Productos fueron empaquetados")
        this.checkerSvc.cleanChecker();
      }, err =>{
        alert("Ocurrio un error " + err)
    })
    this.checkerSvc.setClientList([]);
  }

  
}