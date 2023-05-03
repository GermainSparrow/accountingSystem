import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  routesArr
} from './routes'
import {
  Dashboard, Login
} from './pages'
import { Provider as HttpProvider, IncomingOptions } from "use-http";


function App() {
  // const navigate = useNavigate()
  const url = 'http://1.14.74.199:7001'
  const options: IncomingOptions = {
    interceptors: {
      request: async ({
        options,
      }: any) => {
        options.headers.Authorization = `Bearer ${window.localStorage.getItem('ac-jwt-token')}`
        return options
      },
      response: async ({
        response,
      }: any) => {
        // if (response.status === 401) {
        //   return window.location.href = '/login'
        // }
        return response
      },
    }
  }

  return (
    <HttpProvider url={url} options={options}>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <React.Suspense fallback={<div>正在加载中</div>}>
          <BrowserRouter>
            <Routes>
              <Route id={'dashboard'} element={<Dashboard />} path="dashboard" key={'dashboard'} children={
                routesArr.map((items) => {
                  return (<Route path={items.path} element={items.element} id={items.id} key={items.id} />)
                })
              } />
              <Route element={<Login />} id="login" path="/" key={'login'} />
            </Routes>
          </BrowserRouter>
        </React.Suspense>
      </div>
    </HttpProvider>
  );
}

export default App;
