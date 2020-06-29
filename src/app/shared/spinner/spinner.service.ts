import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as globalAction from './store/spinner.action';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    constructor(
        public store: Store<fromApp.AppState>
    ) {
    }

    show() {
        this.store.dispatch(new globalAction.ShowSpinner());
    }

    hide() {
        this.store.dispatch(new globalAction.HideSpinner());
    }
}
