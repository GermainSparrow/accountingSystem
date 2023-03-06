import { createSlice } from "@reduxjs/toolkit";
//定义单个元素
type searchData = {
    name: string,
    data: [],
    isSearch: boolean
}
type searchDataState = searchData[];
//初始化变量
const initialState: searchDataState = [{ name: 'financial', data: [], isSearch: false }];

export const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {
        setSearchState:(state)=>{
         state[0].isSearch = !state[0].isSearch;
        }
    }
    
})
//导出修改方法
export const { setSearchState } = searchSlice.actions;

export default searchSlice.reducer;