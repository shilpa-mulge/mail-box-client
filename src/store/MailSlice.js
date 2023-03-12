import { createSlice } from "@reduxjs/toolkit";

const mailSlice=createSlice({
    name:'mail',
    initialState:{mail:{}},
    reducers:{
        AddMail(state,action){
            state.mail=action.payload
        }
    }
})
export const MailAction=mailSlice.actions;
export default mailSlice.reducer;