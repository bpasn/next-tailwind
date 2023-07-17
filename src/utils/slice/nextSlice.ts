import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, RootState } from "../Store";

export interface IInitialState {
    productData: StoreProduct[];
    favoriteData: StoreProduct[];
    allProducts: StoreProduct[];
    userInfo: null | string
}
const initialState: IInitialState = {
    productData: [],
    favoriteData: [],
    allProducts: [],
    userInfo: null,
};

export const nextSlice = createSlice({
    name: "next",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<StoreProduct>) => {
            const newItem = action.payload;
            const existing = state.productData.find(item => item._id === action.payload._id);
            if (existing) {
                existing.quantity += 1
            } else {
                return { ...state, productData: [...state.productData, action.payload] }
            }
        },
        addToFavorite: (state, action: PayloadAction<StoreProduct>) => {
            const existing = state.favoriteData.find(item => item._id === action.payload._id);
            if (existing) {
                existing.quantity += 1
            } else {
                return { ...state, favoriteData: [...state.favoriteData, action.payload] }
            }
        },
        increaseQuantity: (state, action:PayloadAction<string>) => {
            const existing = state.productData.find(item => item._id === action.payload);
            existing && existing.quantity++
        },
        decreaseQuantity: (state, action:PayloadAction<string>) => {
            const existing = state.productData.find(item => item._id === action.payload);
            existing && existing.quantity > 1 && existing.quantity--
        },
        deleteProduct: (state, action:PayloadAction<string>) => {
            state.productData = state.productData.filter(item => item._id !== action.payload);
        },
        resetCart(state) {
            state.productData = [];
        },
        addUser(state, action) {
            state.userInfo = action.payload;
        },
        removeUser(state) {
            state.userInfo = null;
        },
        setAllProducts(state, action) {
            state.allProducts = action.payload;
        }
    },
});

export const {
    addToCart,
    addToFavorite,
    addUser,
    decreaseQuantity,
    removeUser,
    resetCart,
    setAllProducts,
    deleteProduct,
    increaseQuantity

} = nextSlice.actions;

export default nextSlice.reducer;
