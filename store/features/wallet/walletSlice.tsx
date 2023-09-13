"use client"; //this is a client side component

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: { wallet: string | null } = {
  wallet: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    selectWallet: (state, action) => {
      state.wallet = action.payload;
    },
    disconnect: (state) => {
      state.wallet = null;
    },
  },
});

// actions
export const { selectWallet, disconnect } = walletSlice.actions;
// selectors
export const selectedWallet = (state: RootState) => state.wallet.wallet;

export default walletSlice.reducer;
