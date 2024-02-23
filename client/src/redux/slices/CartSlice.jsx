import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // hum check karr rhe hai ki agr jo item pehle se add hai uski id or jo hum item baad me add karr rhe hai uski id same to nahi hai , agar hai to wo item to rkho or uski quantity  badhao
      const existingitem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingitem) {
        state.cart = state.cart.map((item) => {
          return item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item;
        });
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    incrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    },
    decrementQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
      );
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  setCart,
} = CartSlice.actions;
export default CartSlice.reducer;
