import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OrderDetail } from "../component/classes/pedido.class";

@Injectable({
    providedIn: 'root'
})


export class CheckerService{
    orders: OrderDetail[] = [];
    total: number = 0;
    refreshPage: boolean = false;
    
    public refreshPage$ = new BehaviorSubject<boolean>(this.refreshPage);
    public orders$ = new BehaviorSubject<OrderDetail[]>(this.orders);
    public total$ = new BehaviorSubject<number>(this.total);

    setTotal(total:number):void{
        this.total$.next(total);
    }

    setClientList(clients:OrderDetail[] ):void{
        this.orders = clients;
        this.orders$.next(clients);
    }

    addNewClient(addClient:OrderDetail):void{
        let newChecker: OrderDetail[] = [];
        let insert:boolean = false;

        if(this.orders.length > 0){
           
            this.orders.forEach((client => {
                // if don't try to add the same product
               if(addClient.orderId == client.orderId 
                && addClient.clientNameId == client.clientNameId 
                && addClient.orderDetailId != client.orderDetailId){
                    
                    let exist = false;
                    // comprueba si en todo el fujo ya se agrego
                    newChecker.forEach(detail => {
                        if(addClient.orderDetailId == detail.orderDetailId){
                            exist = true;
                            console.log("exist")
                        }
                    });

                    if(exist == false){
                        console.log("entro en else")
                        //let subtotal = addClient.subtotal + client.subtotal;
                        //client.subtotal = subtotal;
                        //addClient.visible = false;
                        newChecker.push(addClient);
                        newChecker.push(client);
                        insert = true;
                    }else{
                        newChecker.push(client);
                    }
                    
                }else{
                    if(addClient.orderDetailId != client.orderDetailId && addClient.orderId == client.orderId && addClient.clientNameId != client.clientNameId){
                        newChecker.push(client);
                        
                    }
                    else if(addClient.orderDetailId != client.orderDetailId && addClient.orderId != client.orderId){
                        newChecker.push(client);
                        
                    }
                }
            }))
        }
        
        if( this.orders.length == 0 || !insert){
            newChecker.push(addClient);
        }
        this.orders = newChecker;
        this.orders$.next(this.orders);
        this.calcTotal();
    }

    calcTotal():void{
        this.total = 0;

        this.orders.forEach((client:OrderDetail) => {
          if(client.subtotal > 0){
            this.total  += client.subtotal;
          }
        });

        this.total$.next(this.total);
      }


    cleanChecker():void{
        this.total = 0;
        this.total$.next(this.total);
        this.orders = [];
        this.orders$.next(this.orders);
    }

    refreshNewOrder():void{
        this.refreshPage$.next(true);
    }
    
}