import { createAction, props } from "@ngrx/store";
import { SttGroup } from "../state/stt-group-list.state";

export const loadGroups = createAction(
    "[Group-list] loadGroups",
);

export const loadGroupsSuccess = createAction(
    "[Group-list] loadGroupsSuccess",
    props<{ groups: SttGroup[] }>(),
);
