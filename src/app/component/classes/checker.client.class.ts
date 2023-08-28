export class CheckerClient{
   
    clientNameId!: number;
    orderId!: number;
    clientName!:string;
    subtotal!: number;
    productId!: number;

    constructor(clientNameId: number,
        orderId: number,
        clientName:string,
        subtotal: number = 0, productId:number){

            this.clientName = clientName;
            this.clientNameId = clientNameId;
            this.subtotal = subtotal;
            this.orderId = orderId;
            this.productId = productId;
    }
}