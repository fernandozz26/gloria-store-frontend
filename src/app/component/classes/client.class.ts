export class ClientName{
    clientNameId!: number;
    orderId!:number;
    clientName!:string;

    constructor(clientNameId: number, orderId: number, clientName:string) {
        this.clientNameId = clientNameId;
        this.orderId = orderId;
        this.clientName = clientName;
        
    }
}