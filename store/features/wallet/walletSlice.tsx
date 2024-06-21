"use client"; //this is a client side component
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Asset, BrowserWallet } from "@meshsdk/core";

interface WalletState {
    selectedWallet: string | null;
    assets: Asset[];
    balances: Asset[];
    error: any;
    quote: any;
}

const initialState: WalletState = {
    selectedWallet: null,
    assets: [],
    balances: [],
    error: null,
    quote: null,
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        selectWallet: (state, action) => {
            state.selectedWallet = action.payload;
        },
        refreshAssets: (state, action) => {
            state.assets = action.payload;
        },
        refreshBalances: (state, action) => {
            state.balances = action.payload;
        },
        disconnect: (state) => {
            state.selectedWallet = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setQuote: (state, action) => {
            state.quote = action.payload;
        },
    },
});

// actions
export const { selectWallet, disconnect, refreshAssets, refreshBalances, setError, setQuote } = walletSlice.actions;
// selectors
export const selectedWallet = (state: RootState) => state.wallet.selectedWallet;
export const walletAssets = (state: RootState) => state.wallet.assets;
export const walletBalances = (state: RootState) => state.wallet.balances;
export const walletError = (state: RootState) => state.wallet.error;

export default walletSlice.reducer;
