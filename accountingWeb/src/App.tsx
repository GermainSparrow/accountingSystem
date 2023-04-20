import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  routesArr
} from './routes'
import {
  Dashboard, Login
} from './pages'
import { Provider as HttpProvider } from "use-http";
function App() {
  return (
    <HttpProvider>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <React.Suspense fallback={<div>正在加载中</div>}>
          <BrowserRouter>
            <Routes>
              <Route id={'dashboard'} element={<Dashboard />} path="dashboard" key={'dashboard'} children={
                routesArr.map((items) => {
                  return (<Route path={items.path} element={items.element} id={items.id} key={items.id}/>)
                })
              } />
              <Route element={<Login />} id="login" path="/login"key={'login'} />
            </Routes>
          </BrowserRouter>
        </React.Suspense>
      </div>
    </HttpProvider>
  );
}

export default App;
