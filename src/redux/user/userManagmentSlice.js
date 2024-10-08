import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    totalUser: 0,
    loading: false,
    error: null,
    currentUser: null,
};

const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState,
    reducers: {
        fetchUsersStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.userCount = action.payload.length; 
            state.loading = false;
            state.error = null;
        },
        fetchUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null; 
        },
        updateUserSuccess: (state, action) => {
            const index = state.users.findIndex(user => user._id === action.payload._id);
            if (index !== -1) {
                state.users[index] = action.payload; 
            }
            state.loading = false; 
        },
        updateUserFailure: (state, action) => {
            state.loading = false; 
            state.error = action.payload; 
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null; 
        },
        deleteUserSuccess: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload); 
            state.loading = false; 
        },
        deleteUserFailure: (state, action) => {
            state.loading = false; 
            state.error = action.payload; 
        },
        signOut: (state) => {
            state.currentUser = null; 
            state.loading = false; 
            state.error = null; 
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload; 
            state.loading = false; 
            state.error = null; 
        },
    },
});

export const {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
    setCurrentUser
} = userManagementSlice.actions;

export default userManagementSlice.reducer;