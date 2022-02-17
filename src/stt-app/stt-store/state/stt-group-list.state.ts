import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { SttGroupModel } from "../model/stt-group.model";


export interface SttGroupListState extends EntityState<SttGroupModel>{
    selectedUserId: number | null;
}

export const sttGroupListAdapter: EntityAdapter<SttGroupModel> = createEntityAdapter<SttGroupModel>();

export const initialSttGroupListState: SttGroupListState = sttGroupListAdapter.getInitialState({
    selectedUserId: null
});
