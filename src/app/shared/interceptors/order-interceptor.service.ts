import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class OrderInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let interceptedRed = req;
        try{
            interceptedRed = req.clone({
                headers:req.headers
                .set('Access-Control-Allow-Origin','*')
                .set("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method")
                .set("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE")
                .set("Allow","GET, POST, OPTIONS, PUT, DELETE")
              });
    
              return next.handle(interceptedRed);
        }catch(ex){
            throw new Error('Method not implemented.');
        }
        
    }
    
}


export const intercetorProvider = [{provide: HTTP_INTERCEPTORS, useClass: OrderInterceptorService, multi: true}]