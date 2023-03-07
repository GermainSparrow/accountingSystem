// index.ts 文件

import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./counterSearch/counterSearch";
import counterEdit from "./counterEdit/counterEdit";
// configureStore创建一个redux数据
const store = configureStore({
    // 合并多个Slice
    reducer: {
        search: searchSlice,
        edit: counterEdit,
    },
});

export default store;

