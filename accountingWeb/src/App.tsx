import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  routesArr
} from './routes'
import {
  Dashboard, Login
} from './pages'
import {
  ChatRoom
} from './pages/components'
import { Provider as HttpProvider, IncomingOptions } from "use-http";

function App() {
  const url = 'http://1.14.74.199:7001'
  // const url = 'http://127.0.0.1:7001'
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
        return response
      },
    }
  }

  return (
    <HttpProvider url={url} options={options}>
      <div className="App" style={{ height: "100vh", width: "100vw" }}>
        <ChatRoom />
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
