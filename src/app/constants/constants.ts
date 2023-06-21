

export class EndPointConstant{
    //public static APP_HOST: string = "http://localhost:9090/backend_gloria_store-0.0.1-SNAPSHOT"

    // local
    public static APP_HOST: string = "http://localhost:8080"
    public static ORDER_ENDPOINT: string = EndPointConstant.APP_HOST +"/order/";
    public static ORDER_DETAIL_ENDPOINT: string = EndPointConstant.APP_HOST + "/order/detail";
    public static CLIENT_ENDPOINT: string = EndPointConstant.APP_HOST + "/client/"
}