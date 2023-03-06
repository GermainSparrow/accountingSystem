// index.ts 文件

import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./counterSearch/counterSearch";

// configureStore创建一个redux数据
const store = configureStore({
    // 合并多个Slice
    reducer: {
        search: searchSlice
    },
});

export default store;

