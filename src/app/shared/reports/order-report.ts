import { DomSanitizer } from "@angular/platform-browser";
import { ClientName } from "src/app/component/classes/client.class";
import { Order, OrderDetail } from "src/app/component/classes/pedido.class";

export class OrderReports{
    static _sanitizer: any;
    

    constructor(private _sanitizer: DomSanitizer){this._sanitizer = _sanitizer}

    public header (): string{
        return '<head>'
        +'<meta charset="UTF-8">'
        +'<meta http-equiv="X-UA-Compatible" content="IE=edge">'
        +'<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        +'<title>Order PDF</title>'
        +'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">'
    +'</head>';
    }

    public orderReport(order:Order, orderDetail:OrderDetail[],clients: ClientName[]):string{

        let report: string = 
        '<body style="width: 90%; margin: 0 auto; margin-top: 20px;">'+
        '<table class="table  w-100 table-borderless" style="width:100%" >'+
                '<thead>'+
                    '<tr>'+
                        '<th>No. Pedido</th>'+
                        '<th>Fecha Inicio</th>'+
                        '<th>Fecha Fin</th>'+
                        '<th>Estado Actual</th>'+
                        '<th>Tipo Pedido</th>'+
                    '</tr>'+
                '</thead>'+
            '</thead>'+
            '<tbody>'+
                '<tr>'+
                    '<td>'+order.orderId+'</td>'+
                    '<td>'+order.startDate+'</td>'+
                    '<td>'+order.endDate+'</td>'+
                    '<td>'+(order.isClosed ? 'Cerrado' : 'Abierto')+'</td>'+
                    '<td>'+order.orderType+'</td>'+
                '</tr>'+
                
            '</tbody>'+
        '</table>'+


        '<table class="table w-100 table-borderless" style="width:100%">'+
        '<thead>'+
            '<th>Cliente</th>'+
            '<th>Pedido</th>'+
            '<th>-</th>'+
            '<th>-</th>'+
            '<th>-</th>'+
            '<th>-</th>'+
        '</thead>'+
        '<tbody>';

            clients.forEach(client => {
                let tr:string = '<tr>'+
                '<td style="vertical-align: middle; text-align: center; " class="fs-3">'+client.clientName+'</td>'+
                '<td colspan="5">'+
                '<div>'+
                    '<table class="table table-sm table-striped" style="width:100%">'+
                        '<thead>'+
                            '<tr>'+
                                '<th>img</th>'+
                                '<th>Precio</th>'+
                                '<th>Cantidad</th>'+
                                '<th>Subtotal</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>';

                        
                        
                        let total:number = 0;
                        let agregados: OrderDetail[] = [];

                        orderDetail.forEach( detail=>{
                            if(detail.clientNameId == client.clientNameId){
                               
                                agregados.push(detail);
                            }
                        })


                        agregados.forEach(detail=> {
                         
                                let tr2: string = '<tr>'+
                                '<td><img width="140" height="140" src="'+detail.img+'" alt="" ></td>'+
                                 '<td>'+detail.productPrice+'</td>'+
                                 '<td>'+detail.productQuantity+'</td>'+
                                 '<td>'+(detail.productPrice * detail.productQuantity)+'</td>'+
                             '</tr>';
     
                             tr+= tr2;
                             total+= (detail.productPrice * detail.productQuantity)
                             
                        
                        });
                        if(total > 0){
                            let tr3 = '<tr class="table-primary" style ="background: #67C4FA">'+
                                '<td style ="background: #67C4FA" colspan="3">Total:</td>'+
                                '<td style ="background: #67C4FA">'+total+'</td>'+
                            '</tr>';
                            tr+= tr3;
                        }

                        tr+='</tbody>'+
                        '</table>'+
                    '</div>'+
                '</td>'+
            '</tr>';

            report += tr;
            });
            
            report += '</tbody>'+
            '</table>'+
        '<body>';    
     
        return report;
    }

    public  base64ToImg(base64:any):any{
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
    
}


