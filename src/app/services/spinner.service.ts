import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})


export class SpinnerService{
    showSpinner: boolean = false;
    public showSpinner$ = new BehaviorSubject<boolean>(this.showSpinner);

    constructor(){}

    get selectSpinnerValue$():Observable<boolean>{
        return this.showSpinner$.asObservable();
    }

    setSpinnerValue(showSpinner:boolean):void{
        this.showSpinner$.next(showSpinner);
    }
}