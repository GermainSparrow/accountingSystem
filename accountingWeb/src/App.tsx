import "./App.css";
import TestNode from "./pages/test";
import Main from "./pages/Main/MainPage";
import React from "react";
const Finance = React.lazy(() => import("./pages/financial/financialList"));
const Visual = React.lazy(() => import("./pages/financial/visual"));
const Manager = React.lazy(() => import("./pages/Manager/Manage"));
const ManagerList = React.lazy(() => import("./pages/Manager/ManagerList"));
const Oil = React.lazy(() => import("./pages/financial/oliSale"));
const WaveBox = React.lazy(() => import("./pages/financial/WaveBox"));
const Test = React.lazy(() => import("./pages/test"));
const AntG2 = React.lazy(() => import("./pages/visual/AntG2"));
const Cash = React.lazy(() => import("./pages/cash/Cash"));
//引入路由依赖

import { Routes, Route, HashRouter } from "react-router-dom";
const Login = React.lazy(() => import("./pages/login"));
function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <React.Suspense fallback={<div>正在加载中</div>}>
        <HashRouter>
          <Routes>
            <Route path="test" element={<Test />} />
            <Route path="/" element={<Login />} />
            <Route path="/Main" element={<Main />}>
              <Route path="financeList" element={<Finance />} />
              <Route path="visual" element={<AntG2 />} />
              <Route path="manager" element={<Manager />} />
              <Route path="managerList" element={<ManagerList />} />
              <Route path="oil" element={<Oil />} />
              <Route path="waveBox" element={<WaveBox />} />
              <Route path="cash" element={<Cash />} />
            </Route>
          </Routes>
        </HashRouter>
      </React.Suspense>
    </div>
  );
}

export default App;
