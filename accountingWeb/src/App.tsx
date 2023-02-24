import "./App.css";
import Container from "./pages/container";
import TestNode from "./pages/test";
import Main from "./pages/Main/MainPage";
//引入路由依赖
import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

const Login = React.lazy(() => import("./pages/login"));
function App() {
  return (
    <div className="App" style={{height:'100vh',width:'100vw'}}>
      <React.Suspense fallback={<div>正在加载中</div>}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Main" element={<Main />} />
          </Routes>
        </HashRouter>
      </React.Suspense>
    </div>
  );
}

export default App;
