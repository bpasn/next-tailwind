import { createAsyncThunk } from "@reduxjs/toolkit";
import { getError } from "../error";
import axios from "axios";
import { NextRouter } from "next/router";
import { IOrders } from "@/models/orders";
import { toast } from "react-toastify";
import { AppState } from "../Store";
import useStorage from "@/hook/useStorage";

export const actionPlaceOrder = createAsyncThunk('place.order', async ({ request, router }: { request: IRequestOrder, router: NextRouter }, thunkAPI) => {
    const { cartReduce: { cart } } = thunkAPI.getState() as AppState
    try {
        const { data } = await axios.post<IOrders, any, IRequestOrder>('/api/orders', {
            ...request
        })
        useStorage().setItem("cart",JSON.stringify({
            ...cart,
            cartItems: [],
          }))
        router.push(`/order/${data._id}`);
        toast.success("CREATE ORDER SUCCESS")
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(getError(error))
    }
})