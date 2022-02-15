import { createReducer, on } from "@ngrx/store";
import { initialSttGroupListState } from "../state/stt-group-list.state";
import { loadGroupsSuccess } from "../actions/stt-group-list.actions";


export const sttGroupListReducer = createReducer(
    initialSttGroupListState,
    on(loadGroupsSuccess, (state, action) => ({
        ...state,
        groups: action.groups
    })),
);
