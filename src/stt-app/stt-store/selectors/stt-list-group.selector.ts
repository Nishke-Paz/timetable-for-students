
import { sttGroupListAdapter, SttGroupListState } from "../state/stt-group-list.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";

const {
    selectAll
} = sttGroupListAdapter.getSelectors();

export const allGroups = selectAll;

export const selectGroupsState = createFeatureSelector<SttGroupListState>("groupList");

export const selectAllGroups = createSelector(
    selectGroupsState,
    allGroups,
);
