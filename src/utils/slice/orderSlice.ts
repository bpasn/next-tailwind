import { IOrders } from "@/models/orders";
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getError } from "../error";
import { RootState } from "../Store";
import axios from "axios";
import thunk from "redux-thunk";


export const actionFetchOrderById = createAsyncThunk("order/byId", async (orderId: string, thunkApi) => {
    try {
        const result = await axios.get<IOrderInit>(`/api/orders/${orderId}`)
        return result.data;
    } catch (error) {
        return thunkApi.rejectWithValue({ error: getError(error) })
    }
})
export const actionFetchOrder = createAsyncThunk("order", async () => {
    try {
        const result = await axios.get<IOrderInit>(`/api/orders`)
        return result.data;
    } catch (error) {
        return { error: getError(error) }
    }
})
export interface IOrderInit extends IOrders {
    _id: string;
    createdAt:Date;
    updatedAt:Date;
}
export interface IInitOrder {
    loading: boolean;
    order: IOrderInit;
    error?: string | null
}
const init: IInitOrder = {
    loading: false,
    order: {} as IOrderInit,
    error: null
}
export const orderReduct = createSlice({
    name: "order",
    initialState: init,
    reducers: {
        setOrder(state, action) {
            return { ...state, loading: true }
        }
    },
    extraReducers(builder) {
        builder.addCase(actionFetchOrderById.pending, (state) => {
            return { ...state, loading: true };
        }),
            builder.addCase(actionFetchOrderById.fulfilled, (state, action) => {
                return { ...state, loading: false, order: action.payload };
            }),
            builder.addCase(actionFetchOrderById.rejected, (state, action) => {
                return { ...state, loading: false, error: action.error.message };
            })
    }
})
export const { setOrder } = orderReduct.actions;
export const selectOrder = ((state: RootState) => state.orderReducer)
export default orderReduct.reducer