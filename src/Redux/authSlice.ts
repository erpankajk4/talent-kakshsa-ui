"use client";
import { ID } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
	authState: boolean;
	userID: ID;
	avatar?: string;
	userName: string;
	email: string;
	number: string;
	token: string;
}

const initialState: IAuthState = {
	authState: false,
	userID: null,
	avatar: "",
	userName: "",
	email: "",
	number: "",
	token: "",
};

let clearSessionTimer: NodeJS.Timeout | null = null;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthState: (state, action: PayloadAction<IAuthState>) => {
			state.authState = action.payload.authState;
			state.userID = action.payload.userID;
			state.avatar = action.payload.avatar;
			state.userName = action.payload.userName;
			state.email = action.payload.email;
			state.number = action.payload.number;
			state.token = action.payload.token;

			if (clearSessionTimer) {
				clearTimeout(clearSessionTimer);
			}
			clearSessionTimer = setTimeout(() => {
				clearSession();
			}, 60 * 60 * 1000);
		},
		clearAuthState: (state) => {
			state.authState = false;
			state.userID = null;
			state.avatar = "";
			state.userName = "";
			state.email = "";
			state.number = "";
			state.token = "";
			clearSession();
		},
	},
});

export const { setAuthState, clearAuthState } = authSlice.actions;

const clearSession = () => {
	localStorage.removeItem("persist:auth");
	localStorage.clear();
	clearSessionTimer = null;
};

export const authReducer = authSlice.reducer;
