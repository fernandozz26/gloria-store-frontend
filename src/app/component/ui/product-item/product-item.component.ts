import { Component, Input } from '@angular/core';
import { CheckerService } from 'src/app/services/checker.service';
import { OrderDetail, OrderDetailWName } from 'src/app/shared/classes/pedido.class';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.sass']
})
export class ProductItemComponent {

  img!:ArrayBuffer|string|null;
  orderId!:number;
  clientName!:string|null;
  clientNameId!: number;
  size!:string|null;
  price!:number|null;
  quantity!:number|null;
  subtotal!:number|null;
  productId!:number;

  @Input() detail!: OrderDetailWName;

  check = false;

  orders: OrderDetail[] = [];

  constructor(private readonly checkerSvc: CheckerService){}

  ngOnInit():void{
    
    if(this.detail != null){
      this.img = this.detail.img;
      this.orderId = this.detail.orderId;
      this.clientName = this.detail.clientName;
      this.size = this.detail.size;
      this.price=this.detail.productPrice;
      this.quantity = this.detail.productQuantity;
      this.subtotal = this.detail.subtotal;
      this.clientNameId = this.detail.clientNameId;
      this.productId = this.detail.orderDetailId;
    }

    this.checkerSvc.orders$.subscribe(ordersDetail => {
        let isPresent: boolean = false;
        ordersDetail.forEach(details => {
          if(this.orderId == details.orderId 
            && this.productId == details.orderDetailId
            // maxima comprobacion para estar 100% seguro es el mismo producto
            && this.clientNameId == details.clientNameId
            ){
              isPresent = true;
            }
        })

        if(this.check == false && isPresent){
          this.check = true;
        }else if(this.check == true && isPresent == false){
          this.check = false;
        }
    })
  }

  addOrRemoveItem():void{

    if(this.check){
      this.checkerSvc.deleteProductFromChecker(this.orderId, this.clientNameId);
      this.check = false;
    }else{
      this.checkerSvc.addNewClientWName(this.detail);
      this.check = true;
    }
    
  }
}
