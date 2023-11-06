

export class DateFormat{


    public static mmddyyyyFormat(date:Date): string{

        let strDate: string;

        strDate = (date.getMonth() + 1).toString().padStart(2,'0') + "/" +
        date.getDate().toString().padStart(2,'0') + "/" +
        date.getFullYear().toString().padStart(4,'0');

        return strDate;
    }

    public static ddmmyyyyFormat(date:Date): string{
        let strDate: string;

        strDate =
        date.getDate().toString().padStart(2,'0') + "/" +
        (date.getMonth() + 1).toString().padStart(2,'0') + "/" +
        date.getFullYear().toString().padStart(4,'0');

        return strDate;
    }

}