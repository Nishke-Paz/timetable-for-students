import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SttGroupListState } from "../state/stt-group-list.state";

export const selectFeature = createFeatureSelector<SttGroupListState>("groupList");
export const selectListGroup = createSelector(
    selectFeature,
    (state) => state.groups,
);
