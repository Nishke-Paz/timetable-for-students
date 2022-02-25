import { SttGroupState } from "./stt-group.state";
import { SttGroupListState } from "./stt-group-list.state";
import { ActionReducerMap } from "@ngrx/store";
import { sttCurrentGroupReducer } from "../reducers/stt-current-group.reducer";
import { sttGroupListReducer } from "../reducers/stt-group-list.reducer";
import { SttGroupForAdminState } from "./stt-group-for-admin.state";
import { sttGroupForAdminReducer } from "../reducers/stt-group-for-admin.reducer";

export interface SttAppState {
    currentGroup: SttGroupState;
    groupForAdmin: SttGroupForAdminState;
    groupList: SttGroupListState;
}

export const reducers: ActionReducerMap<SttAppState> = {
    currentGroup: sttCurrentGroupReducer,
    groupForAdmin: sttGroupForAdminReducer,
    groupList: sttGroupListReducer
};
