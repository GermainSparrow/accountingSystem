import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  routesArr
} from './routes'
function App() {
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <React.Suspense fallback={<div>正在加载中</div>}>
          <BrowserRouter>
            <Routes>
              {routesArr.map((items) => {
                return (<Route path={items.path} element={items.element} id={items.id} />)
              })}
            </Routes>
          </BrowserRouter>
        </React.Suspense>
    </div>
  );
}

export default App;
