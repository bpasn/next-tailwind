'use client';
import { ActionReducerMapBuilder, PayloadAction, createAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { AppState } from '../Store';
import useStorage from '@/hook/useStorage';

export interface ICartItem extends IProduct {
    quantity: number
}

export interface InitialCartItem {
    cart: {
        cartItems: ICartItem[]
    }
}
const getCart = (): { cartItems: ICartItem[] } | {
    cartItems: []
} => {
    return useStorage().getItem("cart", "session") ? JSON.parse(useStorage().getItem("cart", "session")) : { cartItems: [] }
   

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
        cartItemReset() { return init }
    },
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

export const { setCartItem, cartItemReset, removeCartItem } = cartSlice.actions;
export const selectCart = (state: AppState) => state.cartReduce
export default cartSlice.reducer
