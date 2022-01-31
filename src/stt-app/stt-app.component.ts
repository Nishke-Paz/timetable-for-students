import {
    ChangeDetectionStrategy,
    Component,
} from "@angular/core";

@Component({
    selector: "stt-app-root",
    templateUrl: "./stt-app.component.html",
    styleUrls: ["./stt-app.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SttAppComponent {
    title = 123;
}
