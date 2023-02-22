
import './App.css'
import Container from './pages/container'
import TestNode from './pages/test'
//引入路由依赖
import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'

import Login from './pages/login'
function App() {


  return (
    <div className="App">
      <React.Suspense fallback={<div>正在加载中</div>}>
        <HashRouter>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </HashRouter>
      </React.Suspense>
    </div>
  )
}

export default App
