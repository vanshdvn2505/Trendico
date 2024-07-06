import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import { Provider } from 'react-redux'
import  {store} from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'
import Layout from '../Layout'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Login from './pages/Signup'
import Account_Options from './pages/Account_Options'
import Layout1 from '../Layout1'
import Login_Security from './pages/Login_Security'
const persistor = persistStore(store)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      <Route path='/' element = {<Layout1 />}>
        <Route path='' element = {<Home />} />
        <Route path='/' element = {<Home />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/account_options' element = {<Account_Options />} />
        <Route path='/login_security' element = {<Login_Security />} />
      </Route>  
      <Route path='/signup' element = {<Login />} />
      <Route path='/signin' element = {<Signin />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router = {router} />
      </PersistGate>
    </Provider>
)
