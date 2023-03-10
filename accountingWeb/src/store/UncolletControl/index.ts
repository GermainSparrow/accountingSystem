import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface item {
    name: string,
    data: {}[],
    isShow: boolean
}
export type initial = item[]
const initialState: initial = [{ name: 'oil', data: [], isShow: false }, { name: 'waveBox', data: [], isShow: false }]
//定义传入值类型
interface arg {
    name: string,
    data: {}[],
}
const Uncollected = createSlice(
    {
        name: "uncollected",
        initialState,
        reducers: {
            setUncollected: (state, action: PayloadAction<arg>) => {
                state = state.map((item) => {
                    if (item.name == action.payload.name) {
                        item.isShow = !item.isShow
                        item.isShow ? item.data = action.payload.data : item.data = []
                    }
                    return item
                })
            },
            setUncollectedArray: (state, action: PayloadAction<arg>) => {
                console.log('setUncollected被调用');

                state = state.map((item) => {
                    if (item.name == action.payload.name) {
                        item.data = action.payload.data
                    }
                    return item
                })
            },
            // endUncollected: (state, action: PayloadAction<arg>) => {
            //     state = state.map((item) => {
            //         if (item.name == action.payload.name) {
                        
            //         }
            //         return item
            //     })
            // }
        }
    }
)
export const { setUncollected, setUncollectedArray } = Uncollected.actions
export default Uncollected.reducer