import { Pipe, PipeTransform  } from "@angular/core";

@Pipe({
    name: "time"
})
export class SttTimePipe implements PipeTransform{
    transform(value: string, ...args): string {
        switch (value){
            case "1 пара":
                return "8:00 - 9:35";
            case "2 пара":
                return "9:45 - 11:20";
            case "3 пара":
                return "11:35 - 13:10";
            case "4 пара":
                return "13:40 - 15:15";
            case "5 пара":
                return "15:25 - 17:00";
            case "6 пара":
                return "17:10 - 18:45";
            default:
                return value;
        }
    }
}
