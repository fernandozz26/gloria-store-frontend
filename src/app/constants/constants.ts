

export class EndPointConstant{
    //public static APP_HOST: string = "http://localhost:9090/backend_gloria_store-0.0.1-SNAPSHOT"

    // local
    public static APP_HOST: string = "http://localhost:8080"
    public static ORDER_ENDPOINT: string = EndPointConstant.APP_HOST +"/order/";
    public static ORDER_DETAIL_ENDPOINT: string = EndPointConstant.APP_HOST + "/order/detail";
    public static CLIENT_ENDPOINT: string = EndPointConstant.APP_HOST + "/client/"


    
}

export class GlobalConstants{
    public static ROW_STATE_UNDELIVERY = "RED"; 
    public static ROW_STATE_DELIVERY = "BLUE";
    public static ROW_STATE_PACKAGED = "GREEN";

    public static ROW_RED_COLOR = "rgb(254, 201, 219)";
    public static ROW_BLUE_COLOR = "rgb(181, 235, 255)";
    public static ROW_GREEN_COLOR = "rgb(189, 255, 198)";
}