
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})



export class MainViewService{
    //Buscar Pedido //-----Option
    public refreshFindOrder:Boolean = false;
    public checkFindOrder$ = new BehaviorSubject<Boolean>(this.refreshFindOrder);
   

    public setFindOrderChecker(status:Boolean):void{
        this.checkFindOrder$.next(status)
    }

    public getFindOrderChecker():Boolean{
        return this.refreshFindOrder;
    }
    
    constructor(){}
}