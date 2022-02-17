import { createAction, props } from "@ngrx/store";
import { SttGroupModel } from "../model/stt-group.model";

export const loadGroups = createAction(
    "[Group-list] loadGroups",
);

export const loadGroupsSuccess = createAction(
    "[Group-list] loadGroupsSuccess",
    props<{ groups: SttGroupModel[] }>(),
);
