import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//定义单个元素
type searchData = {
    name: string,
    data: {}[],
    isSearch: boolean
}
type searchDataState = searchData[];
//初始化变量
const initialState: searchDataState = [{ name: 'financeList', data: [], isSearch: false }, { name: 'oil', data: [], isSearch: false }, { name: 'waveBox', data: [], isSearch: false }];
//设置传入数据的接口
interface SetSearchData {
    name: string;
    data?: {}[];
}
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        //搜索完毕把搜索结束的数据保存到状态机中
        setSearchState: (state, action: PayloadAction<SetSearchData>) => {
            state = state.map((items, index) => {
                if (items.name === action.payload.name) {
                    items.data = action.payload.data;
                    items.isSearch = true
                }
                return items;
            })
        },
        //只有触发按钮才会清空数组并改变对应数据的状态
        searchEnd: (state, action: PayloadAction<SetSearchData>) => {
            state = state.map((items, index) => {
                if (items.name === action.payload.name) {
                    items.isSearch = false;
                }
                return items;
            })
        }
    }

})
//导出修改方法
export const { setSearchState, searchEnd } = searchSlice.actions;

export default searchSlice.reducer;