import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'


export interface TokenState {
    error: any;
    refreshTokenPayload: any

}

const initialState: TokenState = {
    error: null,
    refreshTokenPayload: null
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        getToken: (state) => ({
            ...state
        }),
        getTokenSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            refreshTokenPayload: action.payload
        }),
        getTokenError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        }),
      clearTokenError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: null
        })

    },
})

export const {getToken, getTokenSuccess, getTokenError, clearTokenError} = tokenSlice.actions
export default tokenSlice.reducer
