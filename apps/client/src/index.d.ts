import "@reduxjs/toolkit";
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AsyncThunkConfig } from "./redux/store";

declare module "@reduxjs/toolkit" {
    export type CustomThunkApi = GetThunkAPI<AsyncThunkConfig>;
    export type GetThunkAPI = any;
}
