import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loader: false,
    user: {},
    isAuth: false,
    showSignup: false,
    showLogin: false,
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            const originalProfilePayload = action.payload?.profile
            const payload = {
                ...action.payload,
                fullName: (originalProfilePayload?.firstName ? originalProfilePayload.firstName : '') + ' ' + (originalProfilePayload?.lastName ? originalProfilePayload.lastName : ''),
                email: action.payload?.profile?.email
            }
            state.user = payload;
        },
        setAuthStatus(state, action) {
            state.isAuth = action.payload;
        },
        setLoader(state, action) {
            state.loader = action.payload;
        },
        setLogin(state, action) {
            state.showSignup = false;
            state.showLogin = true;
        },
        setSignup(state, action) {
            state.showLogin = false;
            state.showSignup = true;
        },
        resetPopup(state, action) {
            state.showLogin = false;
            state.showSignup = false;
        },
    }
});




export const { setUser, setLoader, setAuthStatus, setLogin, setSignup, resetPopup } = AuthSlice.actions;

export const selectUserEmail = (state) => state.auth.user?.email;
export const selectUserName = (state) => state.auth.user?.fullName;

export default AuthSlice;
