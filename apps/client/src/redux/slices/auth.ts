import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "../store";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { SignInData, SignUpData } from "../../services/authService";
import { redirect } from "react-router-dom";

interface AuthState {
    is_logged_in: boolean;
}

const initialState: AuthState = { is_logged_in: false };

const {
    name,
    actions: sliceActions,
    reducer,
} = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoggedIn(state, action: PayloadAction<boolean>) {
            state.is_logged_in = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signOut.pending, (state) => {
                state.is_logged_in = false;
            })
            .addCase(signIn.pending, (state) => {
                state.is_logged_in = false;
            })
            .addCase(signIn.fulfilled, (state, res) => {
                state.is_logged_in = res.payload.success;
            })
            .addCase(signUp.pending, (state) => {
                state.is_logged_in = false;
            })
            .addCase(signUp.fulfilled, (state, res) => {
                state.is_logged_in = res.payload.success;
            })
            .addCase(refreshTokens.rejected, (state) => {
                state.is_logged_in = false;
            })
            .addCase(refreshTokens.fulfilled, (state) => {
                state.is_logged_in = true;
            });
    },
});

const signOut = createAsyncThunk(
    `${name}/sign-out`,
    async (_, { extra: { authService } }: GetThunkAPI<AsyncThunkConfig>) => {
        authService.signOut();
        return Promise.resolve();
    },
);

const refreshTokens = createAsyncThunk(
    `${name}/refresh-tokens`,
    async (_, { extra: { authService } }: GetThunkAPI<AsyncThunkConfig>) => {
        console.log(12);
        //if (authService.isAuthenticated) await authService.renewTokens();
        return Promise.resolve();
    },
);

const signIn = createAsyncThunk(
    `${name}/sign-in`,
    async (
        payload: SignInData,
        { extra: { authService } }: GetThunkAPI<AsyncThunkConfig>,
    ) => {
        return await authService.signIn(payload);
    },
);

const signUp = createAsyncThunk(
    `${name}/sign-up`,
    async (
        payload: SignUpData,
        { extra: { authService } }: GetThunkAPI<AsyncThunkConfig>,
    ) => {
        return await authService.signUp(payload);
    },
);

const actions = { ...sliceActions, refreshTokens, signOut, signIn, signUp };
export { reducer, actions };
