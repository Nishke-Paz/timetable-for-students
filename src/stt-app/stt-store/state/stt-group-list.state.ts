
export interface SttGroup{
    id: number;
    group: string;
}

export interface SttGroupListState {
    groups: SttGroup[];
}

export const initialSttGroupListState: SttGroupListState = {
    groups: []
};
