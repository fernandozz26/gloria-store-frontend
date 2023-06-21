import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class OrderService{
    orderId: number = 0;
    public orderId$ = new BehaviorSubject<number>(this.orderId);

    constructor(){}

    get selectedOrder$():Observable<number>{
        return this.orderId$.asObservable();
    }

    setOrder(orderId:number):void{
        this.orderId$.next(orderId);
    }
}