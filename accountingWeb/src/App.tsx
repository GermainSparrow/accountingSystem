import "./App.css";
import Container from "./pages/container";
import TestNode from "./pages/test";
import Main from "./pages/Main/MainPage";
import React from "react";
const Finance = React.lazy(()=>import('./pages/financial/financialList'))
const Visual = React.lazy(()=>import('./pages/financial/visual'));
const Manager =React.lazy(()=>import('./pages/Manager/Manage'))
const ManagerList =React.lazy(()=>import('./pages/Manager/ManagerList'))
//引入路由依赖

import { Routes, Route, HashRouter } from "react-router-dom";

const Login = React.lazy(() => import("./pages/login"));
function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <React.Suspense fallback={<div>正在加载中</div>}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Main" element={<Main />}>
              <Route path="financeList" element={<Finance />} />
              <Route path="visual" element={<Visual />} />
              <Route path="manager" element={<Manager />} />
              <Route path="managerList" element={<ManagerList />} />
            </Route>
          </Routes>
        </HashRouter>
      </React.Suspense>
    </div>
  );
}

export default App;
