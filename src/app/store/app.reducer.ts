import * as fromSpinner from '../shared/spinner/store/spinner.reducer';
import {ActionReducer, ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';

export interface AppState {
    global: fromSpinner.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    global: fromSpinner.reducer
};

