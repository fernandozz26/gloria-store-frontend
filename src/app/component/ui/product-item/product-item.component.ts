import { Component, Input } from '@angular/core';
import { CheckerService } from 'src/app/services/checker.service';
import { OrderDetailWName } from 'src/app/shared/classes/pedido.class';

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

  @Input() detail!: OrderDetailWName;

  check = false;
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
    }
  }

  addOrRemoveItem():void{

    if(this.check){
      this.checkerSvc.deleteProductFromChecker(this.orderId, this.clientNameId);
    }else{
      this.checkerSvc.addNewClientWName(this.detail);
    }
    this.check = !this.check;
    
  }
}
