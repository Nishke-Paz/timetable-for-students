import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SttGroupState } from "../state/stt-group.state";

export const selectFeature = createFeatureSelector<SttGroupState>("currentGroup");
export const selectCurrentGroup = createSelector(
    selectFeature,
    (state) => state.currentTimetable,
);
