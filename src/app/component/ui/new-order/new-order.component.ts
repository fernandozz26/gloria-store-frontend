import { Component } from '@angular/core';
import {Order, OrderDetail} from '../../classes/pedido.class';
import { DomSanitizer } from '@angular/platform-browser';
import {HostListener} from '@angular/core'
import {EndPointConstant} from '../../../constants/constants'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.sass']
})

export class NewOrderComponent {

  statusOrder:string = "abierto"
  startDateOrder:string =  "";
  endDate:string =  "";
  denomination:string = "$"
  totalOrder:number = 0;
  orderType:string = "SHEIN";

  
  currentIdOrder: number = 0;

  // Datos del cliente
  clientsData: any = [];
  selectedClientValue: number = 0;

  // detalle del pedido
  currentIdOrderDetail:number = 0;
  currentOrderBlobImage!: string | ArrayBuffer | null;
  currentClientName: string = "";
  currentClientId: number = 0;
  currentProductPrice: number = 0;
  currentProductQuantity : number = 1;

  // json de datos

  orderData:any= [];
  clienIdData = [];
  orderDetailData: OrderDetail[] = [];

  constructor(private _sanitizer: DomSanitizer, private http: HttpClient){}

  ngOnInit():void{
    let date = new Date();
    this.startDateOrder = date.getDate().toString().padStart(2,'0') + "/" + (parseInt(date.getMonth().toString())+1).toString().padStart(2,'0') + "/" + date.getFullYear().toString().padStart(2,'0');
    this.endDate = this.startDateOrder + " " + date.getHours().toString().padStart(2,'0') + ":" + date.getMinutes().toString().padStart(2,'0') + ":" + date.getSeconds().toString().padStart(2,'0');
  
    this.getLastUnclosedOrder();
    
  }

  @HostListener('window:paste', ['$event']) 
  
  onPaste(event: any){
    let detailImg = document.getElementById("imgOrderDetail");

    for(var i = 0 ; i < event.clipboardData.items.length ; i++){
      // get the clipboard item
      var clipboardItem = event.clipboardData.items[i];
      var type = clipboardItem.type;

      // if it's an image add it to the image field
    if (type.indexOf("image") != -1) {

      // get the image content and create an img dom element
      var blob = clipboardItem.getAsFile();
       
      
      var blobUrl:string = window.webkitURL.createObjectURL(blob);
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () =>{this.currentOrderBlobImage = reader.result;}
      
      detailImg?.setAttribute("src", blobUrl);
      detailImg?.classList.remove("mini-picture-active");
    }
  }

  
  }

  imgClick():void{
    let detailImg = document.getElementById("imgOrderDetail");
    detailImg?.classList.add("mini-picture-active");
    var imageBlob!: string | ArrayBuffer | null;
    
    
    
  }

  base64ToImg(base64:any):any{
    try{
      if(base64){
        return this._sanitizer.bypassSecurityTrustResourceUrl(base64);
      }else{
        return "";
      }
    }catch(e){
      return "";
    }
    
  }

  onlyNumbers(event:any):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalNumbers(event:any):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 46){
      let priceLenght = this.currentProductPrice.toString().length;
      let pricepoints = this.currentProductPrice.toString().replace(".", "").length;
      let nopoints = priceLenght - pricepoints;
      console.log(nopoints);
      if(nopoints < 1){
        return true;
      }
      return false 
    }
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  

  agregarDetallePedido():void{
    if(this.currentIdOrder === 0){
      alert("Debe agregar un cliente primero");
    }else if(this.currentClientName === ""){
      alert("El campo nombre de cliente no debe ir vacio")
    }else{

      this.currentIdOrderDetail++;
      let orderDetail:OrderDetail = new OrderDetail(0, this.currentClientId, this.currentIdOrder,
        this.currentOrderBlobImage, this.currentClientName,this.currentProductQuantity,this.currentProductPrice,
        this.currentProductQuantity * this.currentProductPrice,);
      
      this.http.post<any>(EndPointConstant.ORDER_DETAIL_ENDPOINT, orderDetail).subscribe(
        res => {
          if(res){
            this.currentOrderBlobImage = "";
            document.getElementById("imgOrderDetail")?.setAttribute("src", "");
            this.currentProductQuantity = 1;
            this.currentProductPrice = 0;
            //this.orderDetailData.push(orderDetail);
            this.getLastUnclosedOrder();
          }
        },
        err => {}
      );
      

    }
  }

  addClientToOrder():void{
    if(this.currentIdOrder >= 0 && this.currentClientName !== ""){
      
      let orderId;
      if(this.orderData && this.orderData.length >= 1){
        orderId = (this.orderData[this.orderData.length -1].idOrder) +1;
      }else{
        orderId =1;
      }
        
       this.orderData.push({
          idOrder:orderId, 
          startData: this.startDateOrder, 
          endDate:{isEnd: false, endDate: this.endDate} 
        });
        document.getElementById("currentClientName")?.setAttribute("value", this.currentClientName);
        
        let data = {clientNameId:0, orderId: this.currentIdOrder, clientName:this.currentClientName}
        let clientExist = false;
        if(this.clientsData.length > 0){
          this.clientsData.forEach((client:any) => {
            if(client.clientName == this.currentClientName){
              clientExist = true;
            }
          });
        }
        if(clientExist === false){

          this.http.post<any>(EndPointConstant.CLIENT_ENDPOINT, data).subscribe(res => {
            this.selectLastClientAdded();
          }, err => {
            alert("Ocurrio un error al guardar cliente");
          });
        }else{
          alert("Este cliente ya ha sido agregado, intente con otro nombre")
        }
        
    }else{
      alert("El campo nombre de cliente no debe ir vacio")
    }
  }

  selectLastClientAdded():void{
    this.http.get<any>(EndPointConstant.CLIENT_ENDPOINT+this.currentIdOrder).subscribe(
      res => {
        if(res){
          this.clientsData = res;
          let noClients = this.clientsData.length;
          if(noClients > 0){
            // search if client is in data
            this.selectedClientValue = this.clientsData[noClients-1].clientNameId;
            this.currentClientId = this.clientsData[noClients-1].clientNameId;
            this.currentClientName = this.clientsData[noClients-1].clientName;
          }
        }
      },
      err => {alert("Ocurrio un error al cargar los clientes");}
    );
  }

  updateOrderDetail(orderDetail: OrderDetail):void{
    if(this.orderDetailData.length > 0 && orderDetail){
      orderDetail.subtotal = orderDetail.productPrice * orderDetail.productQuantity;
      this.http.patch<any>(EndPointConstant.ORDER_DETAIL_ENDPOINT, orderDetail).subscribe(res => {
        
        this.getLastUnclosedOrder();
        alert("Detalle actualizado");
      }, err => {
        alert("Ocurrio un error.");
      });
      /*
      this.orderDetailData.forEach((detail:OrderDetail) =>{
        if(detail.orderDetailId === orderDetail.orderDetailId && detail.orderClientName === orderDetail.orderClientName){
          detail.productPrice = orderDetail.productPrice;
          detail.productQuantity = orderDetail.productQuantity;
          detail.subtotal = orderDetail.productQuantity * orderDetail.productPrice;
        }
      } );*/
    }
  }

  saveNewOrder(force: boolean = false):void{
    if(force){
      let date = new Date();
      let data = {
        orderId: 0,
        startDate: this.startDateOrder,
        endDate: date.getDate().toString().padStart(2,'0') + "/" + (parseInt(date.getMonth().toString())+1).toString().padStart(2,'0') 
        + "/" + date.getFullYear().toString().padStart(2,'0') + " " + date.getHours().toString().padStart(2,'0') + ":" 
        + date.getMinutes().toString().padStart(2,'0') + ":" + date.getSeconds().toString().padStart(2,'0'),
        total: this.totalOrder,
        isClosed: 'false',
        orderType: this.orderType
      }
      this.http.post<any>(EndPointConstant.ORDER_ENDPOINT, data).subscribe(res => {
        alert("Se guardo correctamente");
        this.getLastUnclosedOrder();
      }, err => {
        alert("Ocurrio un error.");
      })
    }
    else if(confirm("¿Deseas generar una nueva orden? \n \n Se eliminaran todos los datos no guardados")){
      let date = new Date();
      let data = {
        orderId: 0,
        startDate: this.startDateOrder,
        endDate: date.getDate().toString().padStart(2,'0') + "/" + (parseInt(date.getMonth().toString())+1).toString().padStart(2,'0') 
        + "/" + date.getFullYear().toString().padStart(2,'0') + " " + date.getHours().toString().padStart(2,'0') + ":" 
        + date.getMinutes().toString().padStart(2,'0') + ":" + date.getSeconds().toString().padStart(2,'0'),
        total: this.totalOrder,
        isClosed: 'false',
        orderType: this.orderType
      }
      this.http.post<any>(EndPointConstant.ORDER_ENDPOINT, data).subscribe(res => {
        alert("Se guardo correctamente");
        this.getLastUnclosedOrder();
      }, err => {
        alert("Ocurrio un error.");
      })
    }
  }


  getLastUnclosedOrder():void{
    this.http.get<any>(EndPointConstant.ORDER_ENDPOINT+"last").subscribe(
      res => {
        if(res){
          this.currentIdOrder = res.orderId;
          this.startDateOrder = res.startDate;
          this.endDate = "Pedido sin cerrar";
          this.totalOrder = res.total;
          this.orderType = res.orderType;
          this.selectLastClientAdded();
          this.getOrderDetailById();
        }

        
      }, 
      err =>{alert("Ocurrio un error.");})
  }

  selectClientChange(event:any):void{
    let selectVal = parseInt(String(event.target.value).substring(3,5));
    this.clientsData.forEach((client:any) => {
      if(client.clientNameId == parseInt(String(event.target.value).substring(3,5)) ){
        
        this.currentClientId = client.clientNameId;
        this.currentClientName = client.clientName;
        this.selectedClientValue = selectVal;
        document.getElementById("currentClientName")?.setAttribute("value", this.currentClientName);
      }
    })
  }

  
  getOrderDetailById(): void{
    this.http.get<any>(EndPointConstant.ORDER_DETAIL_ENDPOINT+"/"+this.currentIdOrder).subscribe(
      res => {
        if(res){
          this.orderDetailData = res;
          this.totalOrder = 0;
          this.orderDetailData.forEach(detail => {
            this.totalOrder += (detail.productPrice * detail.productQuantity) ? (detail.productPrice * detail.productQuantity) : 0;
          })
        }
      },
      err => {}
    );
  }


  getClienNameById(clienNameId: number):string{
    let clientName = "";
    this.clientsData.forEach((client:any) => {
      if(client.clientNameId == clienNameId){
        
        clientName = client.clientName;
      }
    })
    return clientName;
  }


  saveOrderState(close: boolean = false):void{
    let total:number = 0;
    this.orderDetailData.forEach((detail:OrderDetail) =>{
      total += (detail.productPrice * detail.productQuantity)
    })
    let date = new Date();
    this.endDate = date.getDate().toString().padStart(2,'0') + "/" + (parseInt(date.getMonth().toString())+1).toString().padStart(2,'0') 
    + "/" + date.getFullYear().toString().padStart(2,'0') + " " + date.getHours().toString().padStart(2,'0') + ":" 
    + date.getMinutes().toString().padStart(2,'0') + ":" + date.getSeconds().toString().padStart(2,'0');
    
    let order:Order = {orderId: this.currentIdOrder, total: total, startDate: this.startDateOrder, orderType: this.orderType, endDate: this.endDate, isClosed: String(close)}

    this.http.patch<any>(EndPointConstant.ORDER_ENDPOINT, order).subscribe(res => {
      
      if(close){
        this.saveNewOrder(true);
      }else{
        
        alert("Se guardo correctamente");
      }
      this.getLastUnclosedOrder();
    }, err => {
      alert("Ocurrio un error.");
    })
  }


  deleteOrderDetail(detailId: number): void{
    this.http.delete<any>(EndPointConstant.ORDER_DETAIL_ENDPOINT + "/"+detailId).subscribe(
      res => {
        this.getLastUnclosedOrder();
        console.log("Detalle eliminado")
      },
      err => {}
      );
  }
  
}


