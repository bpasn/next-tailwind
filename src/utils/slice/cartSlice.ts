'use client';
import { ActionReducerMapBuilder, PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AppState } from '../Store';
import useStorage from '@/hook/useStorage';
import { toast } from 'react-toastify';

export interface ICartItem extends IProduct {
    quantity: number
}

export interface ShippingForm {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string
}

export interface InitialCartItem {
    cart: {
        cartItems: ICartItem[],
        shippingAddress: ShippingForm,
        paymentMethod: string
    }
}
const getCart = (): {
    cartItems: [],
    shippingAddress: ShippingForm,
    paymentMethod: ""
} => {
    return useStorage().getItem("cart", "session") ? JSON.parse(useStorage().getItem("cart", "session")) : {
        cartItems: [],
        shippingAddress: {} as ShippingForm,
        paymentMethod: ""
    }


}
const init: InitialCartItem = {
    cart: getCart()
}
enum TYPE {
    CART_ADD_ITEM = "CART_ADD_ITEM",
    CART_REMOVE_ITEM = "CART_REMOVE_ITEM"
}
export const actionAddCart = createAction<ICartItem>(TYPE.CART_ADD_ITEM)
export const actionRemoveCart = createAction<ICartItem>(TYPE.CART_REMOVE_ITEM)
export const cartSlice = createSlice({
    name: "cart",
    initialState: init,
    reducers: {
        setCartItem(state, action: PayloadAction<ICartItem>) {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
                item => item.slug === newItem.slug
            );
            const cartItems = existItem ?
                state.cart.cartItems.map(item => item.name === existItem.name ? newItem : item)
                : [...state.cart.cartItems, newItem]

            useStorage().setItem("cart", JSON.stringify({ ...state.cart, cartItems }), "session")
            return { ...state, cart: { ...state.cart, cartItems } }
        },
        removeCartItem(state, action: PayloadAction<ICartItem>) {
            const cartItems = state.cart.cartItems.filter(item => item.slug !== action.payload.slug)
            useStorage().setItem("cart", JSON.stringify({ ...state.cart, cartItems }), "session")
            return { ...state, cart: { ...state.cart, cartItems } }
        },
        cartItemReset() {
            useStorage().removeItem("cart", "session")
            return init
        },
        saveShippingAddress(state, action: PayloadAction<ShippingForm>) {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    shippingAddress: {
                        ...state.cart.shippingAddress,
                        ...action.payload
                    }
                }
            }
        },
        savePaymentMethod(state, action:PayloadAction<string>) {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        }
    },
    // extraReducers(builder) {
    //     builder.addCase("SAVE_PAYMENT_METHOD", (state, action) => {
    //         return
    //     })
    // },
    // extraReducers(builder: ActionReducerMapBuilder<InitialCartItem>) {
    //     builder.addMatcher(
    //         isAnyOf(actionAddCart, actionRemoveCart),
    //         (state, action) => {
    //             switch (action.type) {
    //                 case TYPE.CART_ADD_ITEM:
    //                     const newItem = action.payload;
    //                     const existItem = state.cart.cartItems.find(
    //                         item => item.slug === newItem.slug
    //                     );
    //                     const cartItems = existItem ?
    //                         state.cart.cartItems.map(item => item.name === existItem.name ? newItem : item)
    //                         : [...state.cart.cartItems, newItem]
    //                     return { ...state, cart: { ...state.cart, cartItems } }
    //                 default:
    //                     return state;
    //             }
    //         }
    //     )
    // },
})

export const { setCartItem, cartItemReset, removeCartItem, saveShippingAddress ,savePaymentMethod} = cartSlice.actions;
export const selectCart = (state: AppState) => state.cartReduce
export default cartSlice.reducer
