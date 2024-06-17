"use client"; //this is a client side component
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Asset } from "@meshsdk/core";

export interface MutatedState {
    fluffAssetId: string;
    portalPolicyId: string;
    tedsPolicyId: string;
}

export enum MutatedSection {
    GENERAL = "general",
    HANGAR = "hangar",
    PILOTS_MESS = "pilots_mess",
    FUEL_DEPOT = "fuel_depot",
    WORKSHOP = "workshop",
    BATTLEMAP = "battlemap",
    LEADERBOARD = "leaderboard",
}

const initialState: MutatedState = {
    fluffAssetId: "",
    portalPolicyId: "",
    tedsPolicyId: "",
};

export const mutatedSlice = createSlice({
    name: "mutated",
    initialState,
    reducers: {
        initMutated: (state, action) => {
            state.fluffAssetId = action.payload.fluffAssetId;
            state.portalPolicyId = action.payload.portalPolicyId;
            state.tedsPolicyId = action.payload.tedsPolicyId;
        },
    },
});

// actions
export const { initMutated } = mutatedSlice.actions;
// selectors
export const mutatedConfig = (state: RootState) => (state.mutated as MutatedState) ?? initialState;

export default mutatedSlice.reducer;
