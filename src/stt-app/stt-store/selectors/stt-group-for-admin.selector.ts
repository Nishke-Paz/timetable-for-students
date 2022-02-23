import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SttGroupForAdminState } from "../state/stt-group-for-admin.state";

export const selectFeature = createFeatureSelector<SttGroupForAdminState>("groupForAdmin");
export const selectGroupForAdmin = createSelector(
    selectFeature,
    (state) => state.currentTimetable,
);
