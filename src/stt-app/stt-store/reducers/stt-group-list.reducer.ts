import { createReducer, on } from "@ngrx/store";
import { sttGroupListAdapter, initialSttGroupListState } from "../state/stt-group-list.state";
import { loadGroupsSuccess } from "../actions/stt-group-list.actions";


export const sttGroupListReducer = createReducer(
    initialSttGroupListState,
    on(loadGroupsSuccess, (state, { groups }) => {
        return sttGroupListAdapter.setAll(groups, state);
    }),
);
