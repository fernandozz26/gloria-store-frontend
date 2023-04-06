export class OrderDetail{
    orderDetailId!:number;
    clientNameId!: number;
    orderId!: number;
    img!: string | ArrayBuffer | null;
    orderClientName!: string;
    productQuantity!: number;
    productPrice!: number;
    subtotal!: number;

    constructor(orderDetailId:number, clientId: number,id: number,oImage:string | ArrayBuffer | null,ocName:string, oQuantity: number, opPrice: number, opTotal: number){
        this.orderDetailId = orderDetailId;
        this.clientNameId = clientId;
        this.orderId = id;
        this. img = oImage;
        this.orderClientName = ocName;
        this.productQuantity = oQuantity;
        this.productPrice = opPrice;
        this.subtotal = opTotal;
    }
}

export class Order{
    orderId!: number;
    startDate!:string;
    endDate!:string;
    total!: number;
    isClosed!: string;
    orderType!: string;

    constructor(orderId: number,startDate:string,endDate:string,total: number,isClosed: string,orderType: string){
        this.orderId = orderId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.total = total;
        this.isClosed = isClosed;
        this.orderType = orderType;
    }
}