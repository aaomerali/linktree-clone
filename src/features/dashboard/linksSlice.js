import { createSlice } from "@reduxjs/toolkit";


const linksSlice = createSlice ({
    name: 'links' ,
    initialState : [],
    reducers: {
        addLink: (state , action) => {
            state.push = action.payload;
        },
        removeLink: (state, action) => {
            return state.filter(link => link.id !== action.payload);
        },
        updateLink: (state, action) => {
            const index = state.findIndex(link => link.id === action.payload.id);
            state[index] = action.payload;
        },
        reorderLinks: (state, action) => {
            return action.payload;
        }
    }
});


export const { addLink, removeLink, updateLink, reorderLinks } = linksSlice.actions;
export default linksSlice.reducer;
