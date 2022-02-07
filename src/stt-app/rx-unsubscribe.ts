/**
 * Provides destroy$ observable for subclasses to use .takeUntil(this.destroy$)
 * Avoids having to keep up with so many subscriptions
 */
import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "stt-unsubscribe",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class RxUnsubscribeComponent implements OnDestroy {
  private _destroy$: Subject<void> = new Subject();
  destroy$ = this._destroy$.asObservable();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
