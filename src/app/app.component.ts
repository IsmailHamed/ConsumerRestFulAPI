import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
    title = 'ConsumerRestFulAPI';
    protected subscription = new Subscription();
    public isShowSpinner = false;

    constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>,
                private cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.authService.autoLogin();
    }

    ngAfterViewInit(): void {
        this.store.select('global').subscribe(spinnerCounter => {
            this.isShowSpinner = (spinnerCounter.spinnerCounter > 0 ? true : false);
            this.cdRef.detectChanges();
        });
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
