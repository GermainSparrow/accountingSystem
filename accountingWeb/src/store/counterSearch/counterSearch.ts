import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//定义单个元素
type searchData = {
    name: string,
    data: {}[],
    isSearch: boolean,
    rule:any
}
type searchDataState = searchData[];
//初始化变量
const initialState: searchDataState = [{ name: 'financeList', data: [], isSearch: false,rule:'' }, { name: 'oil', data: [], isSearch: false,rule:'' }, { name: 'waveBox', data: [], isSearch: false,rule:'' }];
//设置传入数据的接口
interface SetSearchData {
    name: string;
    data?: {}[];
    rule:any
}
//当添加时 传入的数据 
interface x {
    name:string,
    data:{},
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
                    items.rule = action.payload.rule
                }
                console.log('the rule is ',action.payload.rule);
                
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
        },
        addSearch:(state,action:PayloadAction<x>)=>{
            state = state.map((items, index) => {
                if (items.name === action.payload.name &&items.isSearch) {
                    //对新增的数据进行校验是否符合搜索规则 符合则加入数组 不符合就无视
                    let temp = true
                    for (const key in items.rule){
                        if(items.rule[key]!=action.payload.data[key]){
                            temp = false
                        }
                    }
                    temp?items.data.push(action.payload.data):null
                }
                return items;
            })
        }
    }

})
//导出修改方法
export const { setSearchState, searchEnd,addSearch } = searchSlice.actions;

export default searchSlice.reducer;