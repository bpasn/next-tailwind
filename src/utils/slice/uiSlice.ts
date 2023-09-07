import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../Store";

export enum ETemplate {
    TEMPLATE_ONE = "TEMPLATE_ONE",
    TEMPLATE_TWO = "TEMPLATE_TOW"
}
export interface IInitialStateUi {
    template: ETemplate
}

const initialState: IInitialStateUi = {
    template: ETemplate.TEMPLATE_ONE
}
const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeTemplate: (state, action: PayloadAction<{ template: ETemplate }>) => {
            return { ...state, template: action.payload.template };
        }
    }
})

export const getStateUi = (state: AppState) => state.ui;
export const { changeTemplate } = uiSlice.actions;
export default uiSlice.reducer;