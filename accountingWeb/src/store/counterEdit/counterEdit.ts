import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
    financeList: boolean;
    oil: boolean;
    waveBox: boolean;
}
const initialState: state = {
    financeList: false,
    oil: false,
    waveBox: false,
};
interface item {
    name: string
}
export const editSlicer = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<item>) => {
            console.log(action.payload.name, 'toggle传来的值是');
            console.log('改变前的值是', state[action.payload.name]);

            state[action.payload.name] = !state[action.payload.name];
            console.log('改变后的值是', state[action.payload.name]);


        }
    }
})
export const { toggle } = editSlicer.actions
export default editSlicer.reducer;