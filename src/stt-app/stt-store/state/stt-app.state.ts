import { SttGroupState } from "./stt-group.state";
import { SttGroupListState } from "./stt-group-list.state";
import { ActionReducerMap } from "@ngrx/store";
import { sttCurrentGroupReducer } from "../reducers/stt-current-group.reducer";
import { sttGroupListReducer } from "../reducers/stt-group-list.reducer";

export interface SttAppState {
    currentGroup: SttGroupState;
    groupList: SttGroupListState;
}

export const reducers: ActionReducerMap<SttAppState> = {
    currentGroup: sttCurrentGroupReducer,
    groupList: sttGroupListReducer
};
