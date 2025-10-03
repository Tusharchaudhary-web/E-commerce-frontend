import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.quantity += 1;
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item && item.quantity > 1) item.quantity -= 1;

        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


