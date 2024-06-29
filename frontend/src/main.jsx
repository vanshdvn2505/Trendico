import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import store from './app/store'
import { Provider } from 'react-redux'
import Layout from '../Layout'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Login from './pages/Signup'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='' element = {<Home />} />
      <Route path='/signin' element = {<Signin />} />
      <Route path='/signup' element = {<Login />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
      <RouterProvider router = {router} />
    </Provider>
)
